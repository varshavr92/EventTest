/**
 * Recommendation Engine for Event Suggestions
 * Uses cosine similarity between user embedding and event embeddings
 */

const UserSearch = require('../models/UserSearch');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
// const OpenAI = require('openai');

// Initialize OpenAI client (commented out to avoid startup error)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

/**
 * Calculate cosine similarity between two vectors
 * @param {number[]} vecA - First vector
 * @param {number[]} vecB - Second vector
 * @returns {number} - Similarity score (0-1)
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) {
    return 0;
  }

  if (vecA.length !== vecB.length) {
    throw new Error(`Vector dimension mismatch: ${vecA.length} vs ${vecB.length}`);
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Average multiple embeddings into a single vector
 * @param {number[][]} embeddings - Array of embedding vectors
 * @returns {number[]} - Averaged embedding
 */
function averageEmbeddings(embeddings) {
  if (!embeddings || embeddings.length === 0) {
    return [];
  }

  const dimensions = embeddings[0].length;
  const averaged = new Array(dimensions).fill(0);

  for (const embedding of embeddings) {
    for (let i = 0; i < dimensions; i++) {
      averaged[i] += embedding[i];
    }
  }

  // Normalize by count
  for (let i = 0; i < dimensions; i++) {
    averaged[i] /= embeddings.length;
  }

  return averaged;
}

/**
 * Get recommended events based on user's search history using embeddings
 * @param {string} userId - User ID
 * @param {number} limit - Number of recommendations (default 10)
 * @returns {Promise<object[]>} - Array of recommended events with similarity scores
 */
async function getRecommendedEventsByEmbedding(userId, limit = 10) {
  try {
    console.log(`\n📊 Generating recommendations for user: ${userId}`);

    // Fetch user's search history
    const userSearchHistory = await UserSearch.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${userSearchHistory.length} searches in user history`);

    if (userSearchHistory.length === 0) {
      console.log('⚠️  No search history found for user');
      return [];
    }

    // Extract embeddings from search history
    const searchEmbeddings = userSearchHistory
      .map(search => search.embedding)
      .filter(emb => emb && emb.length > 0);

    if (searchEmbeddings.length === 0) {
      console.log('⚠️  No valid embeddings in search history');
      return [];
    }

    // Average the embeddings to create user profile
    const userEmbedding = averageEmbeddings(searchEmbeddings);
    console.log(`✓ Averaged ${searchEmbeddings.length} search embeddings`);

    // Fetch all active events with embeddings
    const events = await Event.find({
      embedding: { $exists: true, $ne: [] },
      isActive: true
    }).lean();

    console.log(`Found ${events.length} events with embeddings`);

    if (events.length === 0) {
      console.log('⚠️  No events with embeddings found');
      return [];
    }

    // Calculate similarity scores for each event
    const scoredEvents = events
      .map(event => {
        const similarity = cosineSimilarity(userEmbedding, event.embedding);
        return {
          ...event,
          similarityScore: similarity
        };
      })
      .filter(e => e.similarityScore > 0) // Only keep events with positive similarity
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit);

    console.log(`✓ Generated ${scoredEvents.length} recommendations`);
    return scoredEvents;
  } catch (error) {
    console.error('❌ Error in getRecommendedEventsByEmbedding:', error);
    throw error;
  }
}

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

    // Step 3: Request OpenAI (commented out to avoid error)
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [{ role: "user", content: prompt }],
    //   temperature: 0.8,
    // });

    // Step 4: Clean the AI output (mock response for now)
    // let aiText = response.choices[0].message.content || "";
    // aiText = aiText.replace(/```json|```/g, "").trim();

    // Mock recommendations to avoid OpenAI error
    const recommendations = [
      {
        title: "Mock Event 1",
        description: "A mock event for testing",
        venue: "Mock Venue",
        date: "2025-06-10",
        time: "6:00 PM",
        price: 300,
        category: "General",
        imageUrl: "https://source.unsplash.com/600x400/?event"
      }
    ];

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
    let method = 'none';

    if (userBookings.length > 0) {
      // Path 1: User has booking history - use collaborative filtering
      console.log(`User ${userId} has ${userBookings.length} bookings. Using booking-based recommendations.`);
      method = 'booking';

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
    } else {
      // Path 2: No bookings - try embedding-based (from user search history)
      console.log(`User ${userId} has no bookings. Trying embedding-based recommendations from search history.`);
      try {
        const fallback = await getRecommendedEventsByEmbedding(userId, 5);
        if (fallback && fallback.length > 0) {
          console.log(`✓ Embedding-based returned ${fallback.length} recommendations`);
          return { recommendations: fallback.slice(0, 5), method: 'embedding' };
        }
        console.log('⚠️  No search history or embeddings found');
      } catch (err) {
        console.error('Error during embedding-based recommendations:', err);
      }

      // Path 3: If embedding failed and interests provided - use AI
      if (interestsArray.length > 0) {
        console.log(`User ${userId} provided interests. Using AI recommendations for: ${interestsArray.join(', ')}`);
        method = 'ai';
        const interestsString = interestsArray.join(', ');
        recommendations = await getAIRecommendations(interestsString, userId);
      } else {
        // Path 4: No bookings, no search history, no interests - return empty
        console.log(`User ${userId} has no bookings, search history, or interests. Returning empty recommendations.`);
        return { recommendations: [], method: 'none' };
      }
    }

    // If booking-based approach returned no recommendations, try embedding fallback
    if (method === 'booking' && (!recommendations || recommendations.length === 0)) {
      try {
        console.log('⚠️  No booking-based recommendations found — trying embedding-based fallback');
        const fallback = await getRecommendedEventsByEmbedding(userId, 5);
        if (fallback && fallback.length > 0) {
          console.log(`✓ Embedding fallback returned ${fallback.length} recommendations`);
          return { recommendations: fallback.slice(0, 5), method: 'embedding' };
        }
        console.log('⚠️  Embedding fallback returned no recommendations');
      } catch (err) {
        console.error('Error during embedding fallback:', err);
      }
    }

    return { recommendations: (recommendations || []).slice(0, 5), method };
  } catch (error) {
    console.error('Error getting recommendations:', error);
      return { recommendations: [], method: 'error' };
  }
};

module.exports = { 
  getRecommendations, 
  getAIRecommendations,
  cosineSimilarity,
  averageEmbeddings,
  getRecommendedEventsByEmbedding
};
