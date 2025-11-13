# 🎯 Personalized Event Recommender with Local Embeddings

A full-stack event recommendation system using **@xenova/transformers** (MiniLM model) for local embeddings, MongoDB for persistence, and React for the UI.

## 📋 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Quick Start](#-quick-start)
3. [API Endpoints](#-api-endpoints)
4. [Database Schema](#-database-schema)
5. [Data Flow](#-data-flow)
6. [Integration Guide](#-integration-guide)
7. [Troubleshooting](#-troubleshooting)

---

## ⚙️ Architecture Overview

### Tech Stack
- **Backend**: Node.js + Express
- **Frontend**: React 18
- **Database**: MongoDB
- **Embedding Model**: MiniLM (Xenova) — 384-dimensional vectors
- **Similarity Metric**: Cosine Similarity

### Components

#### Backend
```
backend/
├── utils/
│   ├── embeddingEngine.js       # MiniLM model & embedding generation
│   └── recommendations.js        # Cosine similarity & averaging logic
├── models/
│   ├── Event.js                 # Event with embedding field
│   └── UserSearch.js            # User searches with embeddings
├── routes/
│   └── recommendation.js         # /search & /recommendations endpoints
└── scripts/
    └── generateEventEmbeddings.js # Pre-embed existing events
```

#### Frontend
```
frontend/src/components/
└── EventRecommender.jsx         # Search input & recommendation display
```

---

## 🚀 Quick Start

### Step 1: Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

The package already includes `@xenova/transformers`. If you need to reinstall:
```bash
npm install @xenova/transformers --save
```

#### Pre-Embed All Existing Events
```bash
cd backend
node scripts/generateEventEmbeddings.js
```

This script:
- Connects to MongoDB
- Finds all events without embeddings
- Generates MiniLM embeddings (384-dim) for each event
- Saves embeddings to the database
- Logs progress

**Expected Output**:
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

### Step 2: Frontend Setup

The `EventRecommender.jsx` component is ready to use. To integrate it into your app:

```bash
cd frontend
npm run dev
```

---

## 📡 API Endpoints

### 1. Save User Search
**Endpoint**: `POST /api/recommendation/search`

**Request**:
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "query": "music concert in bangalore"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Search saved successfully",
  "embedding": [0.123, -0.456, 0.789, ...]  // 384-dim vector
}
```

**What Happens**:
1. Backend receives query
2. MiniLM model generates 384-dimensional embedding
3. Search + embedding saved to `UserSearch` collection
4. Returns embedding (for client-side caching, optional)

---

### 2. Get Personalized Recommendations
**Endpoint**: `GET /api/recommendation/:userId?limit=10`

**Request**:
```
GET /api/recommendation/507f1f77bcf86cd799439011?limit=10
```

**Response**:
```json
{
  "success": true,
  "count": 3,
  "recommendations": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Summer Music Festival",
      "description": "A vibrant music festival...",
      "category": "Music",
      "venue": "Central Park, NYC",
      "date": "2025-06-15T00:00:00.000Z",
      "ticketPrice": 5000,
      "embedding": [0.111, -0.222, 0.333, ...],
      "similarityScore": 0.92
    },
    {
      "_id": "507f191e810c19729de860eb",
      "title": "Jazz Night at Harbor",
      "description": "An intimate jazz performance...",
      "category": "Music",
      "venue": "Harbor Amphitheater",
      "date": "2025-05-20T00:00:00.000Z",
      "ticketPrice": 2000,
      "embedding": [0.105, -0.210, 0.315, ...],
      "similarityScore": 0.88
    }
  ]
}
```

**What Happens**:
1. Fetches all user searches from `UserSearch` collection
2. Extracts embeddings from searches
3. Averages embeddings → creates user profile vector
4. Computes cosine similarity between user profile & each event
5. Returns top N events sorted by similarity

---

## 🗄️ Database Schema

### UserSearch Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,                // Reference to User
  query: String,                   // "music concert"
  embedding: [Number],             // 384-dim vector from MiniLM
  createdAt: Date                  // ISO timestamp
}
```

**Indexes**:
- `userId` (for fast lookup by user)
- `userId + createdAt` (for fetching recent searches)

### Event Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  venue: String,
  date: Date,
  ticketPrice: Number,
  imageUrl: String (optional),
  embedding: [Number],             // 384-dim vector from MiniLM
  isActive: Boolean,
  createdAt: Date
}
```

**Indexes**:
- `category + isActive`
- `date`

---

## 🔄 Data Flow

### Scenario: User searches → Gets recommendations

```
1️⃣ User enters: "music concert in bangalore"
   ↓
2️⃣ Frontend POST /api/recommendation/search
   {userId, query}
   ↓
3️⃣ Backend: embeddingEngine.generateEmbedding(query)
   - Load MiniLM model (first time only)
   - Convert text → 384-dim vector
   - Return embedding
   ↓
4️⃣ Backend: Save to UserSearch collection
   {userId, query, embedding}
   ↓
5️⃣ Frontend: Call GET /api/recommendation/:userId
   ↓
6️⃣ Backend: recommendations.getRecommendedEventsByEmbedding()
   - Fetch all user searches
   - Extract embeddings from searches
   - Average embeddings → user profile
   - For each event:
     * Compute cosine_similarity(user_profile, event_embedding)
     * Add similarityScore to event
   - Sort by similarityScore DESC
   - Return top 10
   ↓
7️⃣ Frontend: Display recommendations with match percentages
```

---

## 🔌 Integration Guide

### Step 1: Add Component to Your App

In `App.jsx` or your main navigation:

```jsx
import EventRecommender from './components/EventRecommender';

function App() {
  const userId = localStorage.getItem('userId'); // Get from auth
  
  return (
    <Routes>
      {/* ... other routes */}
      <Route path="/recommendations" element={<EventRecommender userId={userId} />} />
    </Routes>
  );
}
```

### Step 2: Ensure Auth is in Place

The component expects `userId` as a prop (string or ObjectId). Make sure:
- User is logged in
- `userId` is available (from auth context or localStorage)

### Step 3: Update Navigation

Add a link to the recommender:

```jsx
<NavLink to="/recommendations" className="hover:text-blue-400">
  🎯 Recommendations
</NavLink>
```

### Step 4: Test the Flow

1. **Generate embeddings** (if not done):
   ```bash
   node scripts/generateEventEmbeddings.js
   ```

2. **Start backend**:
   ```bash
   npm run dev
   ```

3. **Start frontend**:
   ```bash
   npm run dev
   ```

4. **Test in UI**:
   - Navigate to `/recommendations`
   - Search for "music"
   - Click "Search"
   - View personalized recommendations

---

## 🧪 API Testing (Curl / Postman)

### Test 1: Save a Search
```bash
curl -X POST http://localhost:5000/api/recommendation/search \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "507f1f77bcf86cd799439011",
    "query": "tech conference"
  }'
```

### Test 2: Get Recommendations
```bash
curl http://localhost:5000/api/recommendation/507f1f77bcf86cd799439011?limit=10
```

---

## 🔧 Configuration

### Embedding Model
Currently using: **Xenova/all-MiniLM-L6-v2**
- Dimension: 384
- Speed: ~100ms per query (first run slower due to model load)
- Size: ~27MB

To change model, edit `utils/embeddingEngine.js`:
```javascript
embeddingPipeline = await pipeline(
  'feature-extraction',
  'Xenova/all-MiniLM-L6-v2' // ← Change this
);
```

Other options:
- `Xenova/all-mpnet-base-v2` (384-dim, slower)
- `Xenova/paraphrase-MiniLM-L12-v2` (384-dim)

### Batch Size for Pre-Embedding
Edit `scripts/generateEventEmbeddings.js`:
```javascript
const BATCH_SIZE = 5; // ← Adjust this
```

Smaller = slower but less memory; larger = faster but more memory.

---

## 📊 Performance Notes

### Embedding Generation
- **First call**: ~500ms (model load) + text embedding
- **Subsequent calls**: ~50-100ms per query
- **Batch of 100 events**: ~10-15 seconds

### Similarity Computation
- **10 events**: <1ms
- **1000 events**: ~10ms
- **10000 events**: ~100ms

### Recommendations Response
- Typical response time: **50-200ms** (includes DB queries + similarity calc)

---

## 🐛 Troubleshooting

### Issue: Model Download Fails
**Symptom**: `Error: Failed to download model`

**Solution**:
1. Check internet connection
2. Clear cache: `rm -rf ~/.cache/huggingface/` (Linux/Mac) or `%LOCALAPPDATA%\huggingface\` (Windows)
3. Restart Node process

### Issue: No Recommendations Returned
**Symptom**: `recommendations: []`

**Possible Causes**:
1. **No search history**: User hasn't searched yet. Do a search first.
2. **Events not embedded**: Run `node scripts/generateEventEmbeddings.js`
3. **Low similarity scores**: Try different search terms

**Debug**:
```javascript
// In recommendations.js, check logs
console.log('User searches:', userSearchHistory.length);
console.log('Events with embeddings:', events.length);
console.log('User profile vector:', userEmbedding);
```

### Issue: High Memory Usage
**Symptom**: Node process crashes with out-of-memory error

**Solution**:
1. Reduce batch size in embedding script
2. Process events in smaller chunks
3. Increase Node memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run dev`

### Issue: CORS Error
**Symptom**: `Access-Control-Allow-Origin` error in browser console

**Solution**: Ensure backend CORS is configured in `server.js`:
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // Vite frontend
  credentials: true
}));
```

---

## 📚 Example Workflows

### Workflow 1: Cold Start (New User)
1. User searches: "jazz music"
2. Backend generates embedding, saves to DB
3. No recommendations yet (need more searches for better profile)
4. User searches: "outdoor festivals"
5. Backend averages both embeddings
6. Returns recommendations matching both interests

### Workflow 2: Refined Preferences
1. User has 10+ searches
2. Backend has rich profile from searches
3. Returns highly relevant recommendations
4. User can refine by searching more specific terms

### Workflow 3: Event Pre-Loading
1. Admin creates 100 events
2. Run: `node scripts/generateEventEmbeddings.js`
3. All events now have embeddings
4. Users immediately get relevant recommendations

---

## 🎓 Technical Details

### Cosine Similarity Formula
```
similarity = (A · B) / (||A|| × ||B||)

Where:
- A · B = dot product of vectors
- ||A|| = magnitude of vector A
- ||B|| = magnitude of vector B
- Result: 0 (orthogonal) to 1 (identical)
```

### MiniLM Model
- Trained on semantic textual similarity tasks
- Captures meaning, not just keyword matching
- Input: any text (queries, descriptions)
- Output: 384-dimensional dense vector

### Why Embeddings?
- **Semantic matching**: "music festival" ≈ "concert" (not just keyword match)
- **Scalable**: O(n) similarity computation for n events
- **Local**: No API calls, all processing on device
- **Fast**: MiniLM is lightweight & optimized

---

## 🚀 Future Enhancements

1. **User Feedback Loop**: Thumbs up/down → refine recommendations
2. **Temporal Decay**: Older searches weighted less
3. **Collaborative Filtering**: Combine with user-user similarity
4. **Caching**: Cache user embeddings & similarity scores
5. **Batch Processing**: Pre-compute similarities for popular events
6. **A/B Testing**: Compare embedding model versions

---

## 📄 License

MIT — Feel free to use and modify!

---

## 💡 Questions?

Refer to:
- **Embedding Engine**: `backend/utils/embeddingEngine.js`
- **Recommendations Logic**: `backend/utils/recommendations.js`
- **Frontend Component**: `frontend/src/components/EventRecommender.jsx`
- **API Routes**: `backend/routes/recommendation.js`
