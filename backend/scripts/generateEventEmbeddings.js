/**
 * Script to pre-generate embeddings for all existing events
 * Run: node scripts/generateEventEmbeddings.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');
const { generateEmbedding } = require('../utils/embeddingEngine');

const BATCH_SIZE = 5;

async function generateEventEmbeddings() {
  try {
    console.log('🚀 Starting event embedding generation...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Fetch all events without embeddings (or with empty embeddings)
    const eventsToEmbed = await Event.find({
      $or: [
        { embedding: { $exists: false } },
        { embedding: [] }
      ]
    });

    console.log(`📊 Found ${eventsToEmbed.length} events needing embeddings\n`);

    if (eventsToEmbed.length === 0) {
      console.log('✨ All events already have embeddings!');
      await mongoose.disconnect();
      return;
    }

    // Process in batches
    for (let i = 0; i < eventsToEmbed.length; i += BATCH_SIZE) {
      const batch = eventsToEmbed.slice(i, i + BATCH_SIZE);
      
      console.log(`\n📦 Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(eventsToEmbed.length / BATCH_SIZE)}`);

      for (const event of batch) {
        try {
          // Create embedding text from event fields
          const embeddingText = `${event.title} ${event.description} ${event.category} ${event.venue}`;
          
          // Generate embedding
          const embedding = await generateEmbedding(embeddingText);
          
          // Update event with embedding
          event.embedding = embedding;
          await event.save();
          
          console.log(`  ✓ ${event.title}`);
        } catch (error) {
          console.error(`  ❌ Error embedding "${event.title}":`, error.message);
        }
      }

      // Small delay between batches to avoid overwhelming the system
      if (i + BATCH_SIZE < eventsToEmbed.length) {
        console.log('  ⏳ Waiting before next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n✅ Event embedding generation complete!');

    // Print summary
    const totalEvents = await Event.countDocuments();
    const embeddedEvents = await Event.countDocuments({ embedding: { $exists: true, $ne: [] } });
    
    console.log(`\n📈 Summary:`);
    console.log(`   Total events: ${totalEvents}`);
    console.log(`   Embedded: ${embeddedEvents}`);
    console.log(`   Remaining: ${totalEvents - embeddedEvents}`);

    await mongoose.disconnect();
    console.log('\n✨ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
generateEventEmbeddings();
