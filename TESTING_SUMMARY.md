# Event Recommender - Manual Testing Summary

## 🎯 What Is This System?

An **AI-powered event recommendation engine** that learns from your searches and suggests events you'll like.

### How It Works:
```
Your Search ("tech conference")
        ↓
Convert to 384-dimensional embedding (MiniLM AI model)
        ↓
Compare with all past searches → Create user profile
        ↓
Compare profile to all events → Rank by similarity
        ↓
Show Top 10 Events with Match %
```

---

## 🚀 Getting Started (Copy-Paste Commands)

### Step 1: Terminal 1 - Backend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; npm run dev
```
✅ Wait for: `Server running on port 5000`

### Step 2: Terminal 2 - Generate Embeddings (IMPORTANT!)
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; node scripts/generateEventEmbeddings.js
```
✅ Wait for: `✅ Embedding generation completed!`

### Step 3: Terminal 3 - Frontend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend; npm run dev
```
✅ Wait for: `VITE ... ready in ... ms`

### Step 4: Browser
```
Open: http://localhost:5173
Navigate to: /recommender (or click nav link if integrated)
```

---

## 🧪 Test These 5 Things

### Test 1: Load Recommender Page
```
✅ Page loads without errors
✅ See "Event Recommender" header
✅ See search input box
✅ See "No Recommendations Yet" or recommendations
```

### Test 2: Search Once
```
Search: "music"
Button: Click "Search"
Expected:
  ✅ Loading spinner appears
  ✅ Recommendations appear below
  ✅ 10 event cards visible
  ✅ Each shows title, image, category, date, venue, price
  ✅ Blue "% Match" badge visible
```

### Test 3: Search Again
```
Search: "jazz concert"
Button: Click "Search"
Expected:
  ✅ Previous recommendations are replaced
  ✅ NEW recommendations appear
  ✅ More music-focused events now
  ✅ Match % different from before
```

### Test 4: Check Browser Console
```
Open: DevTools (F12) → Console tab
Expected:
  ✅ See: "🔍 Searching for: ..."
  ✅ See: "✅ Search saved with embedding"
  ✅ See: "📊 Got 10 recommendations"
  ✅ No red error messages
```

### Test 5: Check Backend Terminal
```
Watch the backend terminal while searching
Expected:
  ✅ See: "🔍 Processing search: ..."
  ✅ See: "✓ Saved search with embedding"
  ✅ See: "📊 Getting recommendations for user ..."
```

---

## 🎨 What You Should See on Screen

### Recommender Page Layout:
```
┌─────────────────────────────────────┐
│     ✨ Event Recommender            │
│  Search for events and get          │
│  personalized recommendations       │
├─────────────────────────────────────┤
│                                     │
│  [Search Box        ] [Search BTN] │
│                                     │
├─────────────────────────────────────┤
│  Recommended Events (10)             │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │          │ │          │ │          │ │
│  │ Event 1  │ │ Event 2  │ │ Event 3  │ │
│  │85% Match │ │92% Match │ │78% Match │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │          │ │          │ │          │ │
│  │ Event 4  │ │ Event 5  │ │ Event 6  │ │
│  │89% Match │ │76% Match │ │84% Match │ │
│  └──────────┘ └──────────┘ └──────────┘ │
│                                     │
│  ... (more events below) ...       │
│                                     │
└─────────────────────────────────────┘
```

### Event Card Details:
```
┌─────────────────────────┐
│  [Event Image Here] ✨  │ ← Blue "85% Match" badge
│ Event Title             │
│ Short description       │
│ [Music] category        │
│ 📅 Nov 12, 2025        │
│ 📍 Venue Name          │
│ 💰 ₹300               │
│ [View Details Button]   │
└─────────────────────────┘
```

---

## 📊 Data Flow (What Happens Behind Scenes)

```
FRONTEND (Browser)
├─ User types "music"
├─ User clicks "Search"
├─ POST request sent to backend
└─ /api/recommendations/search
    ↓
BACKEND (Node.js)
├─ Receive: userId, query
├─ Generate embedding (MiniLM model)
├─ Save to MongoDB UserSearch collection
├─ Fetch all events from DB
├─ Fetch user's past searches
├─ Calculate similarity scores
├─ Return top 10 events
└─ POST response with recommendations
    ↓
FRONTEND (Browser)
├─ Receive recommendations
├─ Display event cards
├─ Show % Match badges
└─ User sees results
```

---

## ✅ Validation Steps

### Before Starting Tests
```
[ ] Backend running: npm run dev
[ ] Event embeddings generated: generateEventEmbeddings.js
[ ] Frontend running: npm run dev
[ ] Browser open to: http://localhost:5173
[ ] Logged in with a user account
```

### During First Search
```
[ ] Can type in search box
[ ] Search button is clickable
[ ] Loading spinner shows
[ ] Recommendations appear in 2-5 seconds
```

### For Each Recommendation
```
[ ] Event image visible
[ ] Event title visible
[ ] Category badge present
[ ] Date formatted correctly (e.g., "Nov 12, 2025")
[ ] Venue/location shown
[ ] Price shown in ₹
[ ] Match % badge visible (e.g., "85% Match")
[ ] View Details button present
```

### Console Validation
```
[ ] F12 → Console tab
[ ] No red error messages
[ ] See search processing logs
[ ] See recommendation count
```

---

## 🔍 Debugging - If Something Goes Wrong

### Problem: "No Recommendations Yet" after searching
```
Fix:
1. Run: node scripts/generateEventEmbeddings.js
2. Ensure script completes with "✅ Embedding generation completed!"
3. Restart backend: npm run dev
4. Try searching again
```

### Problem: Search appears to hang (no response)
```
Debug:
1. Check backend terminal - any error messages?
2. Check browser DevTools Network tab - request status?
3. Verify backend is running on port 5000
4. Restart both backend and frontend
```

### Problem: Component not found / 404 error
```
Fix:
1. Manually visit: http://localhost:5173/recommender
2. Check App.jsx has route for recommender
3. Check EventRecommender.jsx file exists
4. Check imports in App.jsx are correct
```

### Problem: Browser console shows red errors
```
Debug:
1. Screenshot the error message
2. Check backend terminal for related errors
3. Verify userId is being passed correctly
4. Check network requests in DevTools
```

---

## 📈 Performance Expectations

| Action | Time | Notes |
|--------|------|-------|
| Load component | < 1s | Fast page load |
| First search | 2-3s | Model initialization |
| Subsequent searches | 1-2s | Model cached |
| App startup | ~2 min (first time) | MiniLM model download |
| App startup | ~10s (subsequent) | Model loaded from cache |

---

## 🎯 Success Criteria

Your manual testing is successful if:

✅ **Functionality**
- Can search for events
- Recommendations appear
- Recommendations change with different searches
- Similarity scores are visible

✅ **UX**
- Component loads smoothly
- No loading freezes
- Error messages are clear
- Cards are visually appealing

✅ **Backend**
- Searches are saved to database
- Embeddings are generated correctly
- APIs respond within 2-5 seconds
- No server errors in console

✅ **Integration**
- Works with your user authentication
- userId is correctly passed
- Navigable from main app

---

## 📱 Test Scenarios

### Scenario 1: Fresh User
```
1. New user ID
2. Load recommender
3. Expected: "No Recommendations Yet"
4. Search: "tech"
5. Expected: Tech event recommendations appear
```

### Scenario 2: Existing User
```
1. User with 5 past searches
2. Load recommender
3. Expected: Recommendations appear immediately
4. Search: "music"
5. Expected: More music-focused recommendations
```

### Scenario 3: Refining Results
```
1. Search: "music"
2. Observe: General music events
3. Search: "jazz"
4. Observe: More specific jazz events
5. Search: "live jazz concert"
6. Observe: Very specific jazz events
```

---

## 🎓 Learning the System

### What MiniLM Does
- Takes text input: "music festival"
- Converts to 384 numbers representing semantic meaning
- Same meaning = similar numbers
- Different meaning = different numbers

### What Cosine Similarity Does
- Compares two sets of 384 numbers
- Returns score from 0 (very different) to 1 (very similar)
- 0.85 = 85% similar = "85% Match"

### What User Profile Does
- Averages all user's past search embeddings
- Creates a "fingerprint" of user preferences
- Compares to all events to find best matches

---

## 📚 Need More Details?

Check these files in the project root:
- `QUICKSTART.md` - 5-minute setup
- `MANUAL_TESTING_GUIDE.md` - Detailed testing steps
- `INTEGRATION_GUIDE.md` - How to add to your app
- `ARCHITECTURE_DIAGRAMS.md` - Technical deep dive
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `SETUP_RECOMMENDER.md` - Initial setup reference

---

## 🎉 Ready to Test!

You have everything you need. Follow the "Getting Started" section above and start testing now!

**Questions?** Check the detailed guides or the backend console logs.

**Stuck?** Look at the "Debugging" section above.

**Success!** You've implemented an AI-powered recommendation system! 🚀

