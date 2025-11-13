const express = require("express");
const Event = require("../models/Event");
const UserSearch = require("../models/UserSearch");
const OpenAI = require("openai");
const { generateEmbedding } = require("../utils/embeddingEngine");
const { getRecommendedEventsByEmbedding, getRecommendations } = require("../utils/recommendations");

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

// 🔹 POST /api/recommendation/search - Save user search with embedding
router.post("/search", async (req, res) => {
  try {
    const { userId, query } = req.body;

    if (!userId || !query) {
      return res.status(400).json({ 
        success: false, 
        error: "userId and query are required" 
      });
    }

    console.log(`\n🔍 Processing search: "${query}" for user ${userId}`);

    // Generate embedding for the search query
    const embedding = await generateEmbedding(query);

    // Save the search with embedding
    const userSearch = new UserSearch({
      userId,
      query,
      embedding
    });

    await userSearch.save();
    console.log(`✓ Saved search with embedding`);

    res.status(200).json({
      success: true,
      message: "Search saved successfully",
      embedding
    });
  } catch (error) {
    console.error("❌ Error in /search endpoint:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process search"
    });
  }
});

// 🔹 GET /api/recommendation/:userId - Get personalized recommendations
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    console.log(`\n📊 Getting recommendations for user: ${userId}`);

    // Get booking-aware recommendations (booking -> embedding -> AI)
    const result = await getRecommendations(userId, [], '', null);

    res.status(200).json({
      success: true,
      method: result.method,
      count: Array.isArray(result.recommendations) ? result.recommendations.length : 0,
      recommendations: result.recommendations || []
    });
  } catch (error) {
    console.error("❌ Error in /recommendations endpoint:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to get recommendations"
    });
  }
});



module.exports = router;
