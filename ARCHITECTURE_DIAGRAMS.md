# 🎯 Event Recommender - Architecture & Workflows

Visual guide to the system architecture and data flows.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         EventRecommender.jsx Component                   │  │
│  │                                                          │  │
│  │  ┌─────────────────┐      ┌──────────────────────┐     │  │
│  │  │  Search Input   │      │ Recommendations Grid │     │  │
│  │  │  "jazz music"   │      │  Event Cards with %  │     │  │
│  │  └────────┬────────┘      └──────────────────────┘     │  │
│  │           │                                             │  │
│  │           ▼                      ▲                      │  │
│  │    [Search Button] ──────────────┘                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│           │                          ▲                         │
└───────────┼──────────────────────────┼─────────────────────────┘
            │                          │
            │ HTTP POST/GET            │ JSON Response
            │                          │
            ▼                          │
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Node.js/Express)                  │
│                                                                 │
│  Routes: /api/recommendations                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  POST /search                GET /:userId              │  │
│  │  ├─ userId                   ├─ Fetch searches         │  │
│  │  ├─ query: "jazz"            ├─ Average embeddings     │  │
│  │  │                            ├─ Compute similarity     │  │
│  │  └─ Save to UserSearch        └─ Return top events      │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                      │                    ▲                    │
└──────────────────────┼────────────────────┼──────────────────────┘
                       │                    │
        ┌──────────────┴────────────────────┴──────────────┐
        │                                                   │
        ▼                                                   ▼
┌────────────────────────┐              ┌──────────────────────┐
│  Embedding Engine      │              │  Recommendation      │
│  (MiniLM Model)        │              │  Logic               │
│                        │              │                      │
│  • generateEmbedding() │              │ • cosineSimilarity() │
│  • 384-dim vectors     │              │ • averageEmbedding() │
│  • Semantic matching   │              │ • getRecommendations │
└────────────────────────┘              └──────────────────────┘
        ▲                                          ▲
        │                                          │
        └──────────┬───────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────────┐
        │   MongoDB Database       │
        │                          │
        │  UserSearch             │
        │  ├─ userId              │
        │  ├─ query               │
        │  └─ embedding (384-dim) │
        │                          │
        │  Event                  │
        │  ├─ title               │
        │  ├─ description          │
        │  ├─ category            │
        │  └─ embedding (384-dim) │
        └──────────────────────────┘
```

---

## 🔄 Data Flow: Search → Recommendation

```
┌─────────────────────────────────────────────────────────────────┐
│                    STEP 1: User Searches                         │
└─────────────────────────────────────────────────────────────────┘

Frontend:  [Search Box] ─> "jazz music" ─┐
                                         │
                                         ▼
                    POST /api/recommendations/search
                    {
                      userId: "507f1f77bcf86cd799439011",
                      query: "jazz music"
                    }


┌─────────────────────────────────────────────────────────────────┐
│               STEP 2: Generate Embedding (Backend)               │
└─────────────────────────────────────────────────────────────────┘

Backend:
  1. Receive query: "jazz music"
     │
     ▼
  2. Load MiniLM model (if not loaded)
     Xenova/all-MiniLM-L6-v2
     │
     ▼
  3. Convert text → 384-dim vector
     "jazz music" ─► [0.123, -0.456, 0.789, ...]
     │
     ▼
  4. Save to UserSearch
     {
       userId: "507f...",
       query: "jazz music",
       embedding: [0.123, -0.456, ...],
       createdAt: now
     }
     │
     ▼
  5. Return embedding to frontend


┌─────────────────────────────────────────────────────────────────┐
│              STEP 3: Get Recommendations (Backend)               │
└─────────────────────────────────────────────────────────────────┘

Frontend: GET /api/recommendations/507f1f77bcf86cd799439011


Backend:
  1. Fetch all user searches
     UserSearch.find({userId: "507f..."})
     Result:
     [
       {query: "jazz music", embedding: [0.123, ...]},
       {query: "concerts", embedding: [0.145, ...]},
       {query: "live music", embedding: [0.132, ...]}
     ]
     │
     ▼
  2. Extract embeddings
     [
       [0.123, -0.456, 0.789, ...],  // jazz music
       [0.145, -0.420, 0.800, ...],  // concerts
       [0.132, -0.470, 0.775, ...]   // live music
     ]
     │
     ▼
  3. Average them → User Profile Vector
     [0.133, -0.448, 0.788, ...]
     │
     ▼
  4. Fetch all events with embeddings
     Event.find({embedding: {$exists: true, $ne: []}})
     Result:
     [
       {title: "Summer Jazz Festival", embedding: [0.130, ...]},
       {title: "Tech Conference", embedding: [0.045, ...]},
       {title: "Classical Music Night", embedding: [0.128, ...]}
     ]
     │
     ▼
  5. Compute cosine similarity for each
     
     User Profile = [0.133, -0.448, 0.788, ...]
     
     Event 1 = [0.130, -0.445, 0.790, ...]
     Similarity = 0.95 ✅ High (similar!)
     
     Event 2 = [0.045, -0.200, 0.320, ...]
     Similarity = 0.15 ❌ Low (very different)
     
     Event 3 = [0.127, -0.450, 0.785, ...]
     Similarity = 0.92 ✅ High (similar!)
     │
     ▼
  6. Sort by similarity, return top 10
     [
       {
         title: "Summer Jazz Festival",
         similarity: 0.95,
         ...
       },
       {
         title: "Classical Music Night",
         similarity: 0.92,
         ...
       }
     ]


┌─────────────────────────────────────────────────────────────────┐
│                STEP 4: Display Results (Frontend)                │
└─────────────────────────────────────────────────────────────────┘

Frontend renders:

┌─────────────────────────────┐  ┌─────────────────────────────┐
│ Summer Jazz Festival        │  │ Classical Music Night       │
│ 95% Match ✓                 │  │ 92% Match ✓                 │
│                             │  │                             │
│ Category: Music             │  │ Category: Music             │
│ Venue: Park Amphitheater    │  │ Venue: Concert Hall         │
│ Date: June 15, 2025         │  │ Date: May 20, 2025          │
│ Price: ₹5000                │  │ Price: ₹2000                │
│                             │  │                             │
│ [View Details]              │  │ [View Details]              │
└─────────────────────────────┘  └─────────────────────────────┘
```

---

## 🧮 Cosine Similarity Calculation

```
Given two vectors A and B:

A = [0.123, -0.456, 0.789]
B = [0.130, -0.445, 0.790]

Step 1: Compute dot product (A · B)
  A · B = (0.123 × 0.130) + (-0.456 × -0.445) + (0.789 × 0.790)
        = 0.016 + 0.203 + 0.623
        = 0.842

Step 2: Compute magnitude of A (||A||)
  ||A|| = √(0.123² + (-0.456)² + 0.789²)
        = √(0.015 + 0.208 + 0.623)
        = √0.846
        = 0.920

Step 3: Compute magnitude of B (||B||)
  ||B|| = √(0.130² + (-0.445)² + 0.790²)
        = √(0.017 + 0.198 + 0.624)
        = √0.839
        = 0.916

Step 4: Cosine Similarity
  cos(θ) = (A · B) / (||A|| × ||B||)
         = 0.842 / (0.920 × 0.916)
         = 0.842 / 0.843
         = 0.998 ≈ 1.0 (Very Similar!)

Scale: 0 ────────────── 0.5 ────────────── 1.0
       Unrelated       Somewhat           Identical
                       Related
```

---

## 📊 User Profile Evolution

```
New User (No History)
└─ No profile yet
   └─ No recommendations


After 1 Search: "music concert"
└─ Profile = [0.123, -0.456, 0.789, ...]
   └─ Basic recommendations (may be generic)


After 3 Searches: "music", "concert", "live band"
└─ Profile = Avg([search1, search2, search3])
   └─ Better recommendations (more specific)


After 10+ Searches: Rich history
└─ Profile = Well-defined user preference vector
   └─ Highly personalized recommendations
      ├─ Understands nuances
      ├─ Catches subtle patterns
      └─ Minimizes irrelevant suggestions
```

---

## 🔀 Embedding Space Visualization (Simplified)

```
2D Projection of 384D Embedding Space:

          Music Events
              ▲
              │      ●Jazz Concert
              │     ◆Summer Festival
              │  ◆ ●
              │ ◆ 
        ◆◆◆◆◆┼◆◆◆  ← User's Average Profile
         ◆  ◆│  ●●
              │   ● Opera Show
              │
              └─────────────────────► Tech Events
                 ●Hackathon
               ●Code Conference


Legend:
◆ = User's past searches
● = Events in database
The closer events are to the user's average
profile (center), the better the match!
```

---

## 🎯 Algorithm Pseudocode

```javascript
// RECOMMENDATION ALGORITHM
function getRecommendations(userId, topK = 10) {
  
  // 1. Get user's search history
  searches = DB.find(UserSearch, {userId})
  
  // 2. Extract embeddings from searches
  searchEmbeddings = searches.map(s => s.embedding)
  
  // 3. Compute average (user profile)
  userProfile = average(searchEmbeddings)
  
  // 4. For each event, compute similarity
  scoredEvents = []
  for event in DB.find(Event) {
    similarity = cosineSimilarity(userProfile, event.embedding)
    scoredEvents.push({event, similarity})
  }
  
  // 5. Sort and return top K
  return scoredEvents
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
}


// COSINE SIMILARITY
function cosineSimilarity(A, B) {
  dotProduct = sum(A[i] * B[i] for all i)
  magnitudeA = sqrt(sum(A[i]² for all i))
  magnitudeB = sqrt(sum(B[i]² for all i))
  
  if (magnitudeA == 0 || magnitudeB == 0) {
    return 0
  }
  
  return dotProduct / (magnitudeA * magnitudeB)
}
```

---

## 🔌 API Request/Response Examples

### Request 1: Save Search
```
POST /api/recommendations/search
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439011",
  "query": "jazz music festival"
}
```

### Response 1: Search Saved
```json
{
  "success": true,
  "message": "Search saved successfully",
  "embedding": [
    0.123, -0.456, 0.789, 0.234, ... (384 values)
  ]
}
```

### Request 2: Get Recommendations
```
GET /api/recommendations/507f1f77bcf86cd799439011?limit=10
```

### Response 2: Recommendations
```json
{
  "success": true,
  "count": 5,
  "recommendations": [
    {
      "_id": "507f191e810c19729de860ea",
      "title": "Summer Jazz Festival 2025",
      "description": "A vibrant celebration of jazz music...",
      "category": "Music",
      "venue": "Central Park Amphitheater",
      "date": "2025-06-15T00:00:00.000Z",
      "ticketPrice": 5000,
      "imageUrl": "https://...",
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
      "imageUrl": "https://...",
      "similarityScore": 0.88
    }
    ...
  ]
}
```

---

## 📈 Performance Timeline

```
Operation Timeline (Milliseconds)

User Search Action
│
├─ API call overhead:              5ms ──────┐
├─ Load MiniLM model (first only): 500ms ──┐ │
├─ Generate embedding:              80ms ─┐ │ │
├─ Database save:                   50ms │ │ │ │
│                                        │ │ │ │
└─► TOTAL (first): 635ms                 ▼ ▼ ▼ ▼
└─► TOTAL (later): 135ms

Get Recommendations Action
│
├─ API call overhead:               5ms ───────┐
├─ Fetch searches (10):            20ms ──┐   │
├─ Average embeddings:              1ms   │   │
├─ Fetch all events (1000):        50ms ──┤   │
├─ Compute similarities:           100ms ──┤   │ 
├─ Sort & format results:           10ms  │   │
│                                         │   │
└─► TOTAL: ~186ms                         ▼   ▼
```

---

## 🎓 Why This Architecture Works

```
1. LOCAL PROCESSING
   ┌─────────────────────────────────────┐
   │ No API calls = No latency           │
   │ No privacy concerns = No data sent  │
   │ Works offline = No dependencies     │
   └─────────────────────────────────────┘

2. SEMANTIC UNDERSTANDING
   ┌─────────────────────────────────────┐
   │ "jazz" ≈ "music" ≈ "concert"      │
   │ Not just keyword matching          │
   │ Understands intent & meaning       │
   └─────────────────────────────────────┘

3. SCALABLE COMPUTATION
   ┌─────────────────────────────────────┐
   │ O(n) similarity (not O(n²))         │
   │ 1000 events in <10ms              │
   │ 10000 events in <100ms            │
   └─────────────────────────────────────┘

4. PERSONALIZED LEARNING
   ┌─────────────────────────────────────┐
   │ Learns from each search            │
   │ Adapts user preferences over time  │
   │ Better recommendations with history│
   └─────────────────────────────────────┘
```

---

**Architecture & Workflows Complete! 🎉**

For code implementation, see other documentation files.
