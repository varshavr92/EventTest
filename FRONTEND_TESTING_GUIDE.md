# 🧪 Frontend Testing - Visual Step-by-Step Guide

## Phase 1: Setup (5 minutes)

### Step 1.1: Open 3 Terminals

**Terminal Window 1:**
```
Title: Backend Server
Location: backend folder
Command: npm run dev
```

**Terminal Window 2:**
```
Title: Embeddings Generator
Location: backend folder
Command: node scripts/generateEventEmbeddings.js
```

**Terminal Window 3:**
```
Title: Frontend Server
Location: frontend folder
Command: npm run dev
```

---

## Phase 2: Verify Setup (3 minutes)

### Check Terminal 1 Output:
```
✅ GOOD OUTPUT:
[nodemon] starting `node server.js`
Razorpay initialized successfully
OpenAI initialized successfully
Server running on port 5000
✅ MiniLM model loaded for events
MongoDB Connected: ...
✅ Email transporter ready

❌ BAD OUTPUT:
Error: listen EADDRINUSE
SyntaxError
Cannot find module
```

### Check Terminal 2 Output:
```
✅ GOOD OUTPUT:
🔄 Starting embedding generation...
Processing event 1/45: "Event Title"
Processing event 2/45: "Event Title"
...
✅ Embedding generation completed!
✅ Processed 45 events with embeddings

❌ BAD OUTPUT:
Cannot connect to database
Model failed to load
No events found
```

### Check Terminal 3 Output:
```
✅ GOOD OUTPUT:
VITE vX.X.X  ready in 1234 ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help

❌ BAD OUTPUT:
Error compiling
Cannot find module
Port already in use
```

---

## Phase 3: Manual Frontend Testing

### Step 3.1: Open Browser and Log In

```
1. Open: http://localhost:5173
2. See: Event booking app homepage
3. Click: Login
4. Enter: Your test email/password
5. Expected: Logged in, see dashboard
```

### Step 3.2: Navigate to Recommender

**Option A: If integrated in navigation**
```
Look for: "Event Recommender" or "✨ Recommender" link
Click: The link
Expected: Page loads, see search interface
```

**Option B: Manual URL**
```
Type: http://localhost:5173/recommender
Expected: Page loads, see search interface
```

**Option C: If not yet integrated**
```
1. Open DevTools (F12)
2. Console tab
3. Paste: window.location.href = 'http://localhost:5173/recommender'
4. Press: Enter
Expected: Page loads, see search interface
```

---

## Phase 4: First Interaction Test

### What You'll See:

```
┌────────────────────────────────────────────────────┐
│  ✨ Event Recommender                              │
│                                                    │
│  Search for events and get personalized           │
│  recommendations based on your interests          │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │ Search for events (e.g., 'music'...) │ [Search]│
│  └──────────────────────────────────────┘         │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│  No Recommendations Yet                            │
│                                                    │
│  Start searching for events to get                │
│  personalized recommendations!                    │
│                                                    │
│  Each search helps us understand your             │
│  interests better                                 │
│                                                    │
└────────────────────────────────────────────────────┘
```

### First Search Action:

```
1. Click: In search box
2. Type: "music"
3. Click: "Search" button
4. Wait: 2-5 seconds
5. Watch: "Searching..." button shows
6. Expected After: Cards appear below
```

---

## Phase 5: Viewing Recommendations

### What You Should See After First Search:

```
┌────────────────────────────────────────────────────┐
│  ✨ Event Recommender                              │
├────────────────────────────────────────────────────┤
│  Recommended Events (10)                           │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌────────────────┐ ┌────────────────┐            │
│  │ [Event Image]  │ │ [Event Image]  │            │
│  │ 85% Match ← ← ← │ 92% Match      │            │
│  │ Annual Jazz    │ │ Summer Music   │            │
│  │ Festival       │ │ Festival       │            │
│  │                │ │                │            │
│  │ Annual world   │ │ The biggest    │            │
│  │ famous jazz    │ │ music event    │            │
│  │ festival       │ │ of the year    │            │
│  │                │ │                │            │
│  │ [Music]        │ │ [Music]        │            │
│  │                │ │                │            │
│  │ 📅 Jun 15,2025│ │ 📅 Jul 20,2025│            │
│  │ 📍 New Orleans│ │ 📍 Austin, TX  │            │
│  │ 💰 ₹1,500    │ │ 💰 ₹2,000     │            │
│  │                │ │                │            │
│  │[View Details]  │ │[View Details]  │            │
│  └────────────────┘ └────────────────┘            │
│                                                    │
│  ┌────────────────┐ ┌────────────────┐            │
│  ... (more events below) ...                      │
│  └────────────────┘ └────────────────┘            │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Event Card Breakdown:

```
┌──────────────────────────────────────────┐
│  [Image]                         85%Match│← MATCH %
├──────────────────────────────────────────┤
│  Event Title (bold)                      │← TITLE
│  Short description of event...           │← DESCRIPTION
│  [Category Badge]                        │← CATEGORY
├──────────────────────────────────────────┤
│  📅 Nov 15, 2025                         │← DATE
│  📍 New York, USA                        │← VENUE
│  💰 ₹500                                 │← PRICE
├──────────────────────────────────────────┤
│  [View Details Button]                   │← ACTION
└──────────────────────────────────────────┘
```

---

## Phase 6: Multiple Searches Test

### Action Sequence:

```
Search 1: "music"
├─ Cards appear
├─ 10 events shown
└─ Match % visible

Search 2: "jazz"
├─ [Clear previous]
├─ New cards appear
├─ More jazz-focused
└─ Different match %

Search 3: "live jazz concert"
├─ [Clear previous again]
├─ New cards appear
├─ Very specific jazz
└─ Match % adjusted
```

### Expected Behavior:

Each search should show **different** events, with **increasingly specific** recommendations.

---

## Phase 7: Browser Console Inspection

### Open DevTools:
```
1. Press: F12 (or right-click → Inspect)
2. Click: "Console" tab
3. You should see: ✅ Green logs (no red errors)
```

### What to Look For:

```
🔍 Searching for: music
├─ Search initiated
├─ Sent to backend
└─ Waiting for response...

✅ Search saved with embedding
├─ Backend processed
├─ Embedding generated
└─ Data saved to database

📊 Got 10 recommendations
├─ Retrieved from database
├─ Ranked by similarity
└─ Ready to display

✅ All good!
```

### If You See Red Errors:

```
❌ Failed to save search
├─ Check: Is backend running?
├─ Check: Is port 5000 accessible?
└─ Action: Restart backend server

❌ Failed to fetch recommendations
├─ Check: MongoDB connected?
├─ Check: Events have embeddings?
└─ Action: Run generateEventEmbeddings.js again

❌ TypeError: Cannot read property
├─ Check: userId being passed?
├─ Check: Component mounted correctly?
└─ Action: Check App.jsx integration
```

---

## Phase 8: Backend Monitoring

### Keep Backend Terminal Open:

```
While you're searching, watch for these logs:

🔍 Processing search: "music" for user 673a1234567890abcdef1234
├─ Backend received search
├─ Processing query
└─ Found in logs

✓ Saved search with embedding
├─ Embedding generated
├─ UserSearch document created
└─ Ready to process

📊 Getting recommendations for user 673a1234567890abcdef1234
├─ Fetching user searches
├─ Calculating similarities
└─ Ranking events

Response sent successfully
└─ Frontend receives data
```

### Red Flags to Watch:

```
❌ Error: connect ECONNREFUSED
├─ MongoDB connection failed
└─ Action: Check MongoDB is running

❌ SyntaxError
├─ Code has syntax issues
└─ Action: Check recommendation.js is valid

❌ Cannot find module
├─ Missing dependency
└─ Action: Run npm install
```

---

## Phase 9: Detailed Testing Matrix

### Test Case 1: Basic Search

| Step | Action | Expected | Screenshot |
|------|--------|----------|-----------|
| 1 | Type "music" | Input visible | [✓] |
| 2 | Click Search | Loading shows | [✓] |
| 3 | Wait 2-5s | Cards appear | [✓] |
| 4 | Check cards | 10 events shown | [✓] |
| 5 | Check % | Badge visible | [✓] |
| 6 | Check details | Title, date, price | [✓] |

### Test Case 2: Refined Search

| Step | Action | Expected | Result |
|------|--------|----------|--------|
| 1 | Previous: "music" | 10 cards shown | Pass |
| 2 | New search: "jazz" | Previous cards gone | Pass |
| 3 | New cards appear | Different events | Pass |
| 4 | Check match % | New percentages | Pass |
| 5 | Compare to before | Jazz events higher % | Pass |

### Test Case 3: Error Handling

| Step | Action | Expected | Result |
|------|--------|----------|--------|
| 1 | Empty search | Error message | Pass |
| 2 | Stop backend | Fetch fails | Pass |
| 3 | Restart backend | Search works again | Pass |

---

## Phase 10: Success Checklist

### Visual Elements
- [ ] Recommender page loads
- [ ] Header visible: "✨ Event Recommender"
- [ ] Search input box visible
- [ ] Search button visible
- [ ] Event cards display properly
- [ ] Images load (if available)
- [ ] Match % badges visible
- [ ] Category badges visible
- [ ] All details visible (date, venue, price)

### Functionality
- [ ] Can type in search box
- [ ] Can click search button
- [ ] Recommendations appear (not empty)
- [ ] Multiple searches work
- [ ] Results change between searches
- [ ] Match % changes between searches
- [ ] No JavaScript errors in console
- [ ] Loading indicator works

### Backend Integration
- [ ] Backend logs show search processing
- [ ] Embeddings are generated
- [ ] Recommendations are ranked
- [ ] API responds within 2-5 seconds
- [ ] No database connection errors
- [ ] User searches saved correctly

### Edge Cases
- [ ] Empty search shows error
- [ ] Very specific search works
- [ ] Generic search works
- [ ] Multiple searches refine results

---

## 🎯 You're Testing Successfully If:

✅ **Page loads without errors**
✅ **Can search for events**
✅ **Recommendations appear**
✅ **% Match badges visible**
✅ **Different searches show different events**
✅ **No red errors in console**
✅ **Backend logs show activity**

---

## 🐛 Troubleshooting Quick Reference

| Problem | Check | Fix |
|---------|-------|-----|
| Page won't load | Frontend server | `npm run dev` in frontend |
| Search doesn't work | Backend server | `npm run dev` in backend |
| No recommendations | Events embedded | Run generateEventEmbeddings.js |
| Console errors | Browser console (F12) | Check error message |
| Slow searches | Backend logs | MiniLM model loading |
| Wrong user | localStorage | Check userId is correct |

---

## 📸 Screenshots to Take

1. **Homepage with search box** - Before first search
2. **First search results** - After searching "music"
3. **Refined search results** - After searching "jazz"
4. **Event card details** - Close-up of one event
5. **Browser console logs** - Shows successful processing
6. **Backend terminal logs** - Shows backend activity

---

## ✨ Final Validation

Once you've followed all steps above, you'll have confirmed:

1. ✅ Backend API is working
2. ✅ Frontend UI is rendering
3. ✅ Embeddings are generated
4. ✅ Recommendations are personalized
5. ✅ Integration is complete
6. ✅ System is production-ready

**You're done testing!** 🎉

