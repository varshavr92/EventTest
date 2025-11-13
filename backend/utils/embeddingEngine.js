/**
 * Embedding Engine using @xenova/transformers MiniLM model
 * Converts text queries and event descriptions to 384-dimensional vectors
 */

const { pipeline, env } = require('@xenova/transformers');

// Use local models (no auto-download from HF)
env.allowLocalModels = true;
env.allowRemoteModels = true; // Allow downloading if first run

let embeddingPipeline = null;

/**
 * Initialize the embedding pipeline (lazy load on first use)
 */
async function initializeEmbeddingPipeline() {
  if (embeddingPipeline) return embeddingPipeline;

  console.log('🔄 Initializing MiniLM embedding model...');
  try {
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2' // 384-dimensional embeddings
    );
    console.log('✅ MiniLM embedding model loaded successfully');
    return embeddingPipeline;
  } catch (error) {
    console.error('❌ Failed to initialize embedding pipeline:', error);
    throw error;
  }
}

/**
 * Generate embedding for a given text
 * @param {string} text - Text to embed
 * @returns {Promise<number[]>} - 384-dimensional vector
 */
async function generateEmbedding(text) {
  try {
    const pipeline = await initializeEmbeddingPipeline();

    // Generate embeddings
    const result = await pipeline(text, {
      pooling: 'mean',
      normalize: true
    });

    // Convert to array and return
    const embedding = Array.from(result.data);
    console.log(`✓ Generated embedding for text: "${text.substring(0, 50)}..."`);
    return embedding;
  } catch (error) {
    console.error('❌ Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts (batch)
 * @param {string[]} texts - Array of texts
 * @returns {Promise<number[][]>} - Array of embeddings
 */
async function generateBatchEmbeddings(texts) {
  try {
    const embeddings = [];
    for (const text of texts) {
      const embedding = await generateEmbedding(text);
      embeddings.push(embedding);
    }
    console.log(`✓ Generated ${embeddings.length} embeddings`);
    return embeddings;
  } catch (error) {
    console.error('❌ Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
  generateBatchEmbeddings,
  initializeEmbeddingPipeline
};
