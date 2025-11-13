/**
 * Test Script for Event Recommender System
 * Tests: embedding generation → search saving → recommendation fetching
 * Run: node scripts/testRecommender.js
 */

require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');
const UserSearch = require('../models/UserSearch');

const API_BASE = 'http://localhost:5000/api';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testRecommenderFlow() {
  console.log('\n🧪 Testing Event Recommender System\n');
  console.log('=' . repeat(50));

  try {
    // Step 1: Connect to MongoDB
    console.log('\n📦 Step 1: Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Step 2: Get or create a test user
    console.log('📦 Step 2: Setting up test user...');
    let testUser = await User.findOne({ email: 'test-recommender@example.com' });
    if (!testUser) {
      testUser = new User({
        name: 'Test Recommender User',
        email: 'test-recommender@example.com',
        password: 'hashed-password'
      });
      await testUser.save();
      console.log(`✅ Created test user: ${testUser._id}\n`);
    } else {
      console.log(`✅ Using existing test user: ${testUser._id}\n`);
    }

    const userId = testUser._id.toString();

    // Step 3: Clear previous searches
    console.log('📦 Step 3: Clearing previous searches...');
    await UserSearch.deleteMany({ userId });
    console.log('✅ Cleared previous searches\n');

    // Step 4: Test Search API - Send multiple queries
    console.log('📦 Step 4: Testing /api/recommendations/search endpoint...');
    const testQueries = [
      'music concert in bangalore',
      'tech conference and AI',
      'outdoor sports festival'
    ];

    for (const query of testQueries) {
      console.log(`   🔍 Searching: "${query}"`);
      try {
        const response = await axios.post(`${API_BASE}/recommendations/search`, {
          userId,
          query
        });

        if (response.data.success) {
          console.log(`   ✅ Search saved`);
          console.log(`      Embedding dims: ${response.data.embedding.length}`);
        } else {
          console.log(`   ❌ Search failed: ${response.data.error}`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
        if (error.response?.data) {
          console.log(`      Details: ${JSON.stringify(error.response.data)}`);
        }
      }
      await sleep(1000); // Wait between requests
    }
    console.log('');

    // Step 5: Verify searches were saved
    console.log('📦 Step 5: Verifying searches in database...');
    const savedSearches = await UserSearch.find({ userId });
    console.log(`✅ Found ${savedSearches.length} searches in database`);
    for (const search of savedSearches) {
      console.log(`   - "${search.query}" (embedding dims: ${search.embedding.length})`);
    }
    console.log('');

    // Step 6: Check if events have embeddings
    console.log('📦 Step 6: Checking events with embeddings...');
    const embeddedEvents = await Event.countDocuments({
      embedding: { $exists: true, $ne: [] }
    });
    const totalEvents = await Event.countDocuments();
    console.log(`✅ ${embeddedEvents}/${totalEvents} events have embeddings`);
    if (embeddedEvents === 0) {
      console.log('   ⚠️  No events with embeddings found!');
      console.log('   Run: node scripts/generateEventEmbeddings.js\n');
    } else {
      console.log('');
    }

    // Step 7: Test Recommendations API
    console.log('📦 Step 8: Testing /api/recommendations/:userId endpoint...');
    try {
      const response = await axios.get(`${API_BASE}/recommendations/${userId}?limit=5`);

      if (response.data.success) {
        console.log(`✅ Got ${response.data.count} recommendations`);
        if (response.data.recommendations.length > 0) {
          console.log('\n   Top Recommendations:');
          for (let i = 0; i < Math.min(3, response.data.recommendations.length); i++) {
            const event = response.data.recommendations[i];
            const matchPercent = Math.round((event.similarityScore || 0) * 100);
            console.log(`   ${i + 1}. "${event.title}" (${matchPercent}% match)`);
            console.log(`      Category: ${event.category}`);
            console.log(`      Venue: ${event.venue}`);
          }
        } else {
          console.log('   ⚠️  No recommendations returned.');
          if (embeddedEvents === 0) {
            console.log('   This is expected - no events with embeddings.');
          }
        }
      } else {
        console.log(`❌ Failed: ${response.data.error}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      if (error.response?.data) {
        console.log(`   Details: ${JSON.stringify(error.response.data)}`);
      }
    }

    console.log('\n' + '=' . repeat(50));
    console.log('\n✨ Test Complete!\n');

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB\n');
  }
}

// Run test
testRecommenderFlow().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
