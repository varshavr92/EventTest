# 🚀 Event Recommender - Setup & Integration Guide

Complete step-by-step instructions to get the embedding-based event recommender running.

## ✅ Pre-requisites

- Node.js 16+ installed
- MongoDB instance running (local or Atlas)
- Backend repo with `@xenova/transformers` already installed
- Frontend repo ready for integration

---

## 📋 Setup Steps

### 1. Verify Backend Dependencies

Check that `@xenova/transformers` is installed:

```bash
cd backend
npm list @xenova/transformers
```

**Expected output**:
```
event-management-backend@1.0.0 /path/to/backend
└── @xenova/transformers@2.17.2
```

If missing, install:
```bash
npm install @xenova/transformers --save
```

---

### 2. Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ Server running on port 5000
✅ MongoDB connected
```

---

### 3. Pre-Generate Event Embeddings

**This is CRUCIAL** — without embeddings on events, recommendations will be empty.

```bash
cd backend
node scripts/generateEventEmbeddings.js
```

**First run** (model download):
- Takes 1-2 minutes for first run (downloads MiniLM model ~27MB)
- Subsequent runs are much faster

**Expected output**:
```
🚀 Starting event embedding generation...
✅ Connected to MongoDB

📊 Found 5 events needing embeddings

📦 Processing batch 1/1
  ✓ Tech Conference 2025
  ✓ Jazz Night at Harbor
  ✓ Summer Music Festival
  ✓ AI Expo 2025
  ✓ Art Gallery Opening

✅ Event embedding generation complete!

📈 Summary:
   Total events: 5
   Embedded: 5
   Remaining: 0

✨ Disconnected from MongoDB
```

---

### 4. Verify Setup with Test Script

```bash
node scripts/testRecommender.js
```

This script:
- Creates/finds a test user
- Saves 3 test searches with embeddings
- Fetches recommendations
- Verifies the entire flow

**Expected output**:
```
🧪 Testing Event Recommender System

==================================================

📦 Step 1: Connecting to MongoDB...
✅ Connected to MongoDB

📦 Step 2: Setting up test user...
✅ Using existing test user: 507f1f77bcf86cd799439011

📦 Step 3: Clearing previous searches...
✅ Cleared previous searches

📦 Step 4: Testing /api/recommendations/search endpoint...
   🔍 Searching: "music concert in bangalore"
   ✅ Search saved
      Embedding dims: 384
   🔍 Searching: "tech conference and AI"
   ✅ Search saved
      Embedding dims: 384
   🔍 Searching: "outdoor sports festival"
   ✅ Search saved
      Embedding dims: 384

📦 Step 5: Verifying searches in database...
✅ Found 3 searches in database
   - "music concert in bangalore" (embedding dims: 384)
   - "tech conference and AI" (embedding dims: 384)
   - "outdoor sports festival" (embedding dims: 384)

📦 Step 6: Checking events with embeddings...
✅ 5/5 events have embeddings

📦 Step 8: Testing /api/recommendations/:userId endpoint...
✅ Got 5 recommendations

   Top Recommendations:
   1. "Summer Music Festival" (92% match)
      Category: Music
      Venue: Central Park, NYC
   2. "Jazz Night at Harbor" (88% match)
      Category: Music
      Venue: Harbor Amphitheater
   3. "Tech Conference 2025" (75% match)
      Category: Technology
      Venue: Convention Center

==================================================

✨ Test Complete!

Disconnected from MongoDB
```

If test fails, see **Troubleshooting** section below.

---

### 5. Integrate Frontend Component

The component is already created at:
```
frontend/src/components/EventRecommender.jsx
```

Add to your routing:

```jsx
// In your Router setup (e.g., App.jsx)
import EventRecommender from './components/EventRecommender';

function App() {
  const userId = localStorage.getItem('userId'); // Get from auth
  
  return (
    <Routes>
      {/* ... other routes ... */}
      <Route 
        path="/recommendations" 
        element={<EventRecommender userId={userId} />} 
      />
    </Routes>
  );
}
```

Add navigation link:

```jsx
// In your Navigation component
<NavLink to="/recommendations" className="hover:text-blue-400">
  🎯 Recommendations
</NavLink>
```

---

### 6. Start Frontend

```bash
cd frontend
npm run dev
```

Visit: `http://localhost:5173/recommendations`

---

## 🧪 Manual API Testing

### Test Search API

```bash
curl -X POST http://localhost:5000/api/recommendations/search \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "query": "jazz music concert"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Search saved successfully",
  "embedding": [0.123, -0.456, 0.789, ...]
}
```

### Test Recommendations API

```bash
curl http://localhost:5000/api/recommendations/507f1f77bcf86cd799439011?limit=10
```

**Expected Response**:
```json
{
  "success": true,
  "count": 5,
  "recommendations": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Summer Music Festival",
      "similarityScore": 0.92,
      ...
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Problem: No Recommendations Returned

**Symptom**: API returns `"recommendations": []`

**Causes & Solutions**:

#### 1. Events Not Embedded
```bash
# Check if events have embeddings
node -e "require('dotenv').config(); 
const mongoose = require('mongoose'); 
const Event = require('./models/Event'); 
mongoose.connect(process.env.MONGO_URI).then(() => {
  Event.countDocuments({embedding: {\$exists: true, \$ne: []}})
    .then(c => console.log('Events with embeddings:', c));
});"
```

**Fix**: Run embedding script
```bash
node scripts/generateEventEmbeddings.js
```

#### 2. No Search History
**Cause**: User hasn't searched yet

**Fix**: Make sure to call `/search` endpoint before `/recommendations`

#### 3. Database Connection Issue
**Check logs** in backend console for connection errors

**Fix**: Verify `MONGO_URI` in `.env`
```bash
echo $MONGO_URI  # Linux/Mac
echo %MONGO_URI%  # Windows
```

---

### Problem: Model Download Fails

**Symptom**: 
```
Error: Failed to initialize embedding pipeline
Error downloading model: HTTPError 404
```

**Causes**:
- Internet connection issue
- Hugging Face API down
- Bad model name

**Solutions**:

1. **Check internet**:
   ```bash
   ping google.com
   ```

2. **Clear cache** (if model partially downloaded):
   ```bash
   # Linux/Mac
   rm -rf ~/.cache/huggingface/
   
   # Windows
   rmdir /s "%LOCALAPPDATA%\huggingface"
   ```

3. **Verify model name** in `utils/embeddingEngine.js`:
   ```javascript
   embeddingPipeline = await pipeline(
     'feature-extraction',
     'Xenova/all-MiniLM-L6-v2' // ← Check this
   );
   ```

4. **Retry** with increased timeout:
   ```bash
   HF_HUB_DOWNLOAD_TIMEOUT=60 node scripts/generateEventEmbeddings.js
   ```

---

### Problem: High Memory Usage

**Symptom**: Node process crashes with out-of-memory error

**Solutions**:

1. **Increase Node memory**:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run dev
   ```

2. **Reduce batch size** in `scripts/generateEventEmbeddings.js`:
   ```javascript
   const BATCH_SIZE = 3; // ← Reduce from 5
   ```

3. **Process events gradually**:
   ```bash
   # Embed in chunks
   node scripts/generateEventEmbeddings.js
   # Then after it completes, run again if more events exist
   ```

---

### Problem: CORS Error in Browser

**Symptom**:
```
Access to XMLHttpRequest at 'http://localhost:5000/api/recommendations/...'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: Verify CORS config in `backend/server.js`:

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',  // Your Vite frontend
  credentials: true
}));
```

If not present, add it:
```bash
npm install cors --save
```

Then add to `server.js` (before routes):
```javascript
const cors = require('cors');
app.use(cors());
```

---

### Problem: Empty Search History / Wrong User

**Symptom**: Recommendations don't match expected searches

**Debug**:
```bash
# Check searches in MongoDB
node -e "require('dotenv').config(); 
const mongoose = require('mongoose'); 
const UserSearch = require('./models/UserSearch'); 
mongoose.connect(process.env.MONGO_URI).then(() => {
  UserSearch.find({}).then(searches => {
    console.log('All searches:', searches);
  });
});"
```

**Fix**: 
- Verify you're using correct `userId`
- Check localStorage for userId: `localStorage.getItem('userId')`
- Make searches first, then request recommendations

---

## 📊 Performance Tuning

### Embedding Generation Speed

**Current**: ~50-100ms per query (first: ~500ms with model load)

**To optimize**:

1. **Cache embeddings** on frontend:
   ```javascript
   const embeddingCache = new Map();
   if (!embeddingCache.has(query)) {
     const embedding = await generateEmbedding(query);
     embeddingCache.set(query, embedding);
   }
   ```

2. **Batch multiple searches** in one request (add to backend):
   ```javascript
   router.post("/search-batch", async (req, res) => {
     const { userId, queries } = req.body;
     const embeddings = await generateBatchEmbeddings(queries);
     // ... save all at once
   });
   ```

3. **Use faster model** (less accurate but quicker):
   - Change to `Xenova/all-distilroberta-v1` (94-dim, faster)

### Recommendation Response Speed

**Current**: 50-200ms for 1000 events

**To optimize**:

1. **Pre-compute averages** (cache user profile):
   ```javascript
   router.get("/:userId/profile", async (req, res) => {
     // Return average embedding for user
     // Cache this result
   });
   ```

2. **Index embeddings** in MongoDB:
   ```javascript
   eventSchema.index({ 'embedding': '2dsphere' }); // Requires special setup
   ```

3. **Limit events checked**:
   ```javascript
   const events = await Event.find({...}).limit(1000);
   // Instead of fetching all
   ```

---

## 📈 Monitoring

### Enable Debug Logs

Add to `backend/server.js`:

```javascript
process.env.DEBUG = 'app:*,recommendation:*';
const debug = require('debug')('app:recommendation');

// In routes
debug('User searches:', userSearchHistory.length);
debug('User embedding:', userEmbedding);
```

### Monitor Model Loads

In `utils/embeddingEngine.js`:

```javascript
const startTime = Date.now();
embeddingPipeline = await pipeline(...);
const loadTime = Date.now() - startTime;
console.log(`Model loaded in ${loadTime}ms`);
```

---

## 🎯 Next Steps

1. ✅ Setup backend & embeddings (you are here)
2. ✅ Integrate frontend component
3. Test with real user searches
4. Monitor performance & optimize
5. Add A/B testing (compare embedding models)
6. Implement feedback loop (user thumbs up/down)
7. Add caching for frequently recommended events

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `utils/embeddingEngine.js` | MiniLM model & embedding generation |
| `utils/recommendations.js` | Cosine similarity & averaging logic |
| `models/UserSearch.js` | MongoDB schema for search + embedding |
| `models/Event.js` | Event model with embedding field |
| `routes/recommendation.js` | API endpoints (/search, /:userId) |
| `scripts/generateEventEmbeddings.js` | Pre-embed existing events |
| `scripts/testRecommender.js` | End-to-end test script |
| `components/EventRecommender.jsx` | React component for UI |

---

## ❓ FAQs

**Q: How often should I regenerate event embeddings?**
A: Only when new events are added or event descriptions change.

**Q: Will old searches affect recommendations?**
A: Yes, all searches in history are used. Older searches have equal weight (can be changed).

**Q: Can I use a different embedding model?**
A: Yes, see "Configuration" section in `README_RECOMMENDER.md`

**Q: Is it possible to get zero recommendations?**
A: Yes, if cosine similarity is below 0 (very rare). Check if events are properly embedded.

**Q: How many searches does a user need for good recommendations?**
A: Typically 2-3 searches. More searches = better user profile.

---

## 🆘 Need Help?

Check:
1. Backend console logs
2. Browser DevTools Console (frontend errors)
3. MongoDB compass (inspect documents)
4. Run `node scripts/testRecommender.js`

---

**Happy Recommending! 🎯**
