# Manual Testing Guide: Event Recommender System

## Overview
This guide walks you through testing the Event Recommender system manually from the frontend.

---

## Prerequisites

### 1. **Ensure Backend is Running**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
npm run dev
```
✅ You should see: `Server running on port 5000`

### 2. **Ensure Frontend is Running** (in a new terminal)
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend
npm run dev
```
✅ You should see: `VITE ... ready in ... ms`

### 3. **Pre-generate Event Embeddings** (Run ONCE before testing)
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
node scripts/generateEventEmbeddings.js
```
✅ This generates embeddings for all events in the database
⏱️ Takes ~2 minutes on first run (downloads MiniLM model), then ~10-15 seconds

---

## Testing Steps

### Step 1: Access the Recommender Component
1. Open your browser → `http://localhost:5173`
2. Log in with a test account (or create one if needed)
3. Navigate to the **Event Recommender** page
   - Look for a navigation link or URL like `/recommender`
   - If not integrated yet, manually visit: `http://localhost:5173/recommender`

### Step 2: Create a Test User ID
The component requires a `userId`. You can get this from:

**Option A: From Browser Console (if already logged in)**
```javascript
// Open DevTools (F12) → Console tab → paste this:
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
console.log('Your User ID:', userId);
```

**Option B: From MongoDB**
```powershell
# Connect to MongoDB and check user IDs:
mongosh
use eventmanagement
db.users.find({}, {_id: 1, email: 1}).pretty()
```

**Option C: Use a Test User ID**
- Use any MongoDB ObjectId format like: `673a1234567890abcdef1234`

### Step 3: Test Search Functionality

#### Search Query 1: General Technology
1. **In the search box**, type: `tech conference`
2. Click **Search** button
3. **Expected Results:**
   - Search is saved to database
   - Recommendations appear below with similarity scores
   - Browser console should show: `✅ Search saved with embedding`

#### Search Query 2: Music Events
1. Type: `live music concert`
2. Click **Search**
3. **Expected Results:**
   - New recommendations appear
   - Should see different events than the first search
   - Recommendations refine based on your combined search history

#### Search Query 3: Specific Category
1. Type: `jazz performance`
2. Click **Search**
3. **Expected Results:**
   - See jazz-related event recommendations
   - Similarity scores update based on your search pattern

### Step 4: Observe Recommendations

For each search, you should see:

✅ **Event Cards Display:**
- Event image
- Event title
- Event description (truncated)
- Category badge (e.g., "Music", "Technology")
- Date (formatted as "Nov 12, 2025")
- Venue location
- Ticket price in ₹ (Indian Rupees)
- "View Details" button

✅ **Similarity Score:**
- Blue badge in top-right corner
- Shows percentage match (e.g., "85% Match")
- Higher scores = more relevant to your searches

### Step 5: Verify Backend Logs

While searching, watch the **backend terminal** for logs like:

```
🔍 Processing search: "tech conference" for user 673a1234567890abcdef1234
✓ Saved search with embedding
📊 Getting recommendations for user 673a1234567890abcdef1234
```

---

## Browser Developer Tools Testing

Open DevTools (**F12**) → **Console** tab to see debug info:

### Check API Calls
```javascript
// You'll see logs like:
// "🔍 Searching for: tech conference"
// "✅ Search saved with embedding"
// "📊 Got 10 recommendations"
```

### Manual API Test
```javascript
// Test the POST search endpoint
fetch('http://localhost:5000/api/recommendations/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'YOUR_USER_ID_HERE',
    query: 'music festival'
  })
})
.then(r => r.json())
.then(data => console.log('Response:', data))

// Test the GET recommendations endpoint
fetch('http://localhost:5000/api/recommendations/YOUR_USER_ID_HERE?limit=10')
  .then(r => r.json())
  .then(data => console.log('Recommendations:', data))
```

---

## Testing Scenarios

### Scenario 1: Fresh User (No Search History)
1. Use a new user ID
2. Load the Recommender page
3. **Expected:** "No Recommendations Yet" message
4. Search for an event
5. **Expected:** Recommendations appear

### Scenario 2: User with Search History
1. Use a user ID that has previous searches
2. Load the Recommender page
3. **Expected:** Recommendations appear immediately
4. Make a new search
5. **Expected:** Recommendations refine

### Scenario 3: Multiple Searches
1. Search: `tech conference`
2. Search: `startup summit`
3. Search: `innovation workshop`
4. **Expected:** Recommendations progressively improve, showing more tech-related events

### Scenario 4: No Matching Events
1. Search: `extremely specific unlikely event name`
2. **Expected:** Either empty recommendations or generic fallback events

---

## Error Handling Tests

### Test 1: Empty Search
1. Leave search box blank
2. Click Search
3. **Expected:** Error message: "Please enter a search query"

### Test 2: Backend Offline
1. Stop the backend server
2. Try to search
3. **Expected:** Error message: "Failed to save search"

### Test 3: Missing User ID
1. Try to access component without userId prop
2. **Expected:** Component doesn't fetch recommendations (no API calls)

---

## Data Inspection in MongoDB

### Check User Searches
```powershell
mongosh
use eventmanagement
db.usersearches.find({}).pretty()
```

**Expected output:**
```json
{
  "_id": ObjectId("..."),
  "userId": "673a1234567890abcdef1234",
  "query": "tech conference",
  "embedding": [0.123, 0.456, ...], // 384 numbers
  "createdAt": ISODate("2025-11-12T...")
}
```

### Check Event Embeddings
```powershell
db.events.find({embedding: {$exists: true}}, {title: 1, embedding: 1}).limit(5).pretty()
```

**Expected output:**
```json
{
  "_id": ObjectId("..."),
  "title": "Annual Music Festival",
  "embedding": [0.234, 0.567, ...] // 384 numbers
}
```

---

## Performance Expectations

| Operation | Time | Notes |
|-----------|------|-------|
| Load Recommender page | < 1s | Fetches recommendations for logged-in user |
| Submit search | 2-5s | Generates embedding, saves to DB, fetches new recommendations |
| First app run | ~2 min | Downloads MiniLM model (1GB) |
| Subsequent searches | < 2s | Model cached in memory |

---

## Checklist: What Should Work

- [ ] Backend starts without errors
- [ ] Frontend loads without errors
- [ ] Recommender component displays
- [ ] Can type in search box
- [ ] Search button submits search
- [ ] Recommendations appear after search
- [ ] Similarity scores visible (e.g., "85% Match")
- [ ] Event cards show all details
- [ ] Multiple searches refine recommendations
- [ ] Browser console shows debug logs
- [ ] No JavaScript errors in console
- [ ] Backend logs show search processing

---

## Troubleshooting

### ❌ "No Recommendations" appears
**Solution:**
1. Run: `node scripts/generateEventEmbeddings.js`
2. Ensure events have `embedding` field populated in MongoDB
3. Check: `db.events.find({embedding: {$exists: true}}).count()`

### ❌ Search fails silently
**Solution:**
1. Check backend console for errors
2. Open DevTools → Network tab → check if POST request succeeds
3. Verify userId is being sent correctly

### ❌ Component not visible
**Solution:**
1. Check if it's imported in `App.jsx` or navigation
2. Verify route is configured: `/recommender` route should point to EventRecommender
3. Manually visit: `http://localhost:5173/recommender`

### ❌ "Failed to fetch recommendations"
**Solution:**
1. Backend must be running on port 5000
2. Check backend logs for database errors
3. Verify MongoDB connection is active

---

## Integration Checklist (if not yet integrated)

To fully integrate the Recommender into your app:

**In `App.jsx` or your routing file:**
```jsx
import EventRecommender from './components/EventRecommender';

// In your routes:
<Route path="/recommender" element={<EventRecommender userId={userId} />} />
```

**In `Navigation.jsx`:**
```jsx
<Link to="/recommender" className="...">
  Event Recommender
</Link>
```

---

## Next Steps After Testing

✅ **All working?**
1. Run automated test suite: `node scripts/testRecommender.js`
2. Deploy to production
3. Monitor recommendation quality over time

❌ **Issues found?**
1. Check backend logs
2. Verify MongoDB data
3. Check browser console errors
4. Review this guide again

---

## Sample Test Data

If you need events to test with, the database should have:
- Music events
- Tech conferences
- Sports events
- Workshop events
- Cultural events

Check count:
```powershell
mongosh
use eventmanagement
db.events.find({}).count()
```

Should show 10+ events.

