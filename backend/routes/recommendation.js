const express = require("express");
const Event = require("../models/Event");
const OpenAI = require("openai");

const router = express.Router();

// Initialize OpenAI client only if API key is available
let openai;
try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('OpenAI initialized successfully');
  } else {
    console.log('OpenAI API key not found, recommendations will be disabled');
  }
} catch (error) {
  console.error('Failed to initialize OpenAI:', error);
}

router.post("/", async (req, res) => {
  try {
    const { interests, userId } = req.body;
    console.log("User interests:", interests);

    // Step 1️⃣: Get all existing events from database
    const allEvents = await Event.find();
    const eventText = allEvents.map(e => `${e.title}: ${e.description}`).join("\n");

    // Step 2️⃣: Prepare AI prompt
    const prompt = `
    The user is interested in "${interests}".
    From this list of existing events:
    ${eventText}

    Recommend 3 new or existing events that match the interest.
    For new ones, generate realistic details (venue, date, time, price, category, imageUrl).
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
        "imageUrl": "https://example.com/sample.jpg"
      }
    ]
    `;

    // Step 3️⃣: Request OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });

    // Step 4️⃣: Clean the AI output
    let aiText = response.choices[0].message.content || "";
    aiText = aiText.replace(/```json|```/g, "").trim();

    let recommendations;
    try {
      recommendations = JSON.parse(aiText);
    } catch (err) {
      console.error("Invalid AI JSON:", aiText);
      return res.status(500).json({ message: "Invalid AI response" });
    }

    // Step 5️⃣: Save new AI-generated events safely
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
  rec.imageUrl && rec.imageUrl.startsWith("http")
    ? rec.imageUrl
    : `https://source.unsplash.com/600x400/?${encodeURIComponent(rec.category || rec.title || "event")}`,
          createdBy: userId || null, // ✅ Avoid validation error
          createdByAI: true,         // ✅ Mark as AI event
        });
        const saved = await newEvent.save();
        savedEvents.push(saved);
      } else {
        savedEvents.push(exists);
      }
    }

    // Step 6️⃣: Send back recommendations
    res.json({ recommendations: savedEvents });

  } catch (error) {
    console.error("AI Recommendation Error:", error.message);
    res.status(500).json({ message: "Failed to generate AI recommendations" });
  }
});

module.exports = router;
