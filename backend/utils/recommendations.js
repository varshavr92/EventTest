const Booking = require('../models/Booking');
const Event = require('../models/Event');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getAIRecommendations = async (interests, userId) => {
  try {
    console.log("Generating AI recommendations for interests:", interests);

    // Step 1: Get all existing events from database
    const allEvents = await Event.find();
    const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

    // Step 2: Prepare AI prompt
    const prompt = `
    The user is interested in "${interests}".
    From this list of existing events:
    ${eventText}

    Recommend 3 events that best match the interest.
    Return ONLY a valid JSON array like:
    [
      {
        "title": "Event Title",
        "description": "Short event description",
        "venue": "Venue Name",
        "date": "2025-06-10",
        "time": "6:00 PM",
        "price": 300,
        "category": "Music",
        "imageUrl": "https://source.unsplash.com/600x400/?music,concert"
      }
    ]
    `;

    // Step 3: Request OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    // Step 4: Clean the AI output
    let aiText = response.choices[0].message.content || "";
    aiText = aiText.replace(/```json|```/g, "").trim();

    let recommendations;
    try {
      recommendations = JSON.parse(aiText);
    } catch (err) {
      console.error("Invalid AI JSON:", aiText);
      throw new Error("Invalid AI response");
    }

    // Step 5: Save AI-generated events if new
    const savedEvents = [];
    for (const rec of recommendations) {
      const exists = await Event.findOne({ title: rec.title });
      if (!exists) {
        const newEvent = new Event({
          title: rec.title,
          description: rec.description,
          venue: rec.venue,
          date: new Date(rec.date) || new Date(),
          time: rec.time || "10:00 AM",
          ticketPrice: rec.price || 100,
          category: rec.category || "General",
          imageUrl:
            rec.imageUrl ||
            `https://source.unsplash.com/600x400/?${rec.category || "event"}`,
          createdBy: userId || null,
          createdByAI: true,
        });
        const saved = await newEvent.save();
        savedEvents.push(saved);
      } else {
        savedEvents.push(exists);
      }
    }

    return savedEvents;
  } catch (error) {
    console.error("AI Recommendation Error:", error.message);
    throw error;
  }
};

const getRecommendations = async (userId, interestsArray = [], searchQuery = '', clickedEventId = null) => {
  try {
    // Get user's booking history
    const userBookings = await Booking.find({ userId }).populate('eventId', 'category title description');
    const bookedEventIds = userBookings.map(booking => booking.eventId._id.toString());

    let recommendations = [];

    if (userBookings.length > 0) {
      // User has booking history - use collaborative filtering
      console.log(`User ${userId} has ${userBookings.length} bookings. Using booking-based recommendations.`);

      // Get categories from booked events
      const categories = [...new Set(userBookings.map(booking => booking.eventId?.category).filter(Boolean))];

      // Find similar events in same categories, excluding already booked
      recommendations = await Event.find({
        category: { $in: categories },
        _id: { $nin: bookedEventIds },
        isActive: true,
        date: { $gte: new Date() } // Only future events
      }).sort({ date: 1 }); // Sort by date (upcoming first)

      // If searchQuery provided, boost events matching the query
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        recommendations = recommendations.filter(event =>
          searchRegex.test(event.title) || searchRegex.test(event.description) || searchRegex.test(event.category)
        );
      }

      // If clickedEventId provided, prioritize similar events
      if (clickedEventId) {
        const clickedEvent = await Event.findById(clickedEventId);
        if (clickedEvent) {
          recommendations = recommendations.sort((a, b) => {
            const aSimilar = a.category === clickedEvent.category ? 1 : 0;
            const bSimilar = b.category === clickedEvent.category ? 1 : 0;
            return bSimilar - aSimilar; // Similar events first
          });
        }
      }
    } else if (interestsArray.length > 0) {
      // No bookings, but interests provided - use AI recommendations
      console.log(`User ${userId} has no bookings. Using AI recommendations for interests: ${interestsArray.join(', ')}`);
      const interestsString = interestsArray.join(', ');
      recommendations = await getAIRecommendations(interestsString, userId);
    } else {
      // No bookings and no interests - return empty or default recommendations
      console.log(`User ${userId} has no bookings and no interests provided. Returning empty recommendations.`);
      return [];
    }

    return recommendations.slice(0, 5); // Top 5 recommendations
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
};

module.exports = { getRecommendations, getAIRecommendations };
