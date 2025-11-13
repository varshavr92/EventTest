# 🎬 Live Testing Walkthrough (Step-by-Step)

## Scenario: You're Testing the Recommender for the First Time

Let me walk you through exactly what happens, step by step.

---

## 🚀 Start: Setting Up (5 minutes)

### Action 1.1: Open Terminal 1
```
Click: Terminal or PowerShell
Type: cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
Type: npm run dev
Press: Enter
```

### What You'll See (Terminal 1):
```
> event-management-backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.10
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
EMAIL_USER: arjunsk017@gmail.com
EMAIL_PASS set? true
Razorpay initialized successfully
OpenAI initialized successfully
Server running on port 5000
✅ MiniLM model loaded for events
MongoDB Connected: ac-eukofwx-shard-00-02.nemlkys.mongodb.net
✅ Email transporter ready
```

✅ **Success Indicator:** "Server running on port 5000" message

---

### Action 1.2: Open Terminal 2
```
Click: New Terminal
Type: cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
Type: node scripts/generateEventEmbeddings.js
Press: Enter
```

### What You'll See (Terminal 2):
```
🔄 Starting embedding generation...
Downloading model...
Model loaded successfully
Processing event 1/45: "Annual Music Festival"
Processing event 2/45: "Tech Conference 2025"
Processing event 3/45: "Summer Sports Festival"
... (continues for all events)
Processing event 45/45: "Innovation Summit"
✅ Embedding generation completed!
✅ Processed 45 events in 12 seconds
```

⏱️ **First run:** ~2 minutes (downloads MiniLM model)
⏱️ **Subsequent runs:** ~10-15 seconds

✅ **Success Indicator:** "Embedding generation completed!"

---

### Action 1.3: Open Terminal 3
```
Click: New Terminal
Type: cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend
Type: npm run dev
Press: Enter
```

### What You'll See (Terminal 3):
```
> @vite/app@0.0.1 dev
> vite

  VITE v5.0.0  ready in 324 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ **Success Indicator:** "ready in XXX ms" message

---

## 🌐 Phase 2: Open Browser (2 minutes)

### Action 2.1: Open Browser
```
1. Open your browser (Chrome, Firefox, Edge, etc.)
2. Type: http://localhost:5173
3. Press: Enter
```

### What You'll See:
```
[Event booking app homepage loads]
- Hero section with "Find Your Next Event"
- Search bar
- Featured events
- Navigation menu at top
```

### Action 2.2: Log In (if needed)
```
1. Click: "Login" button
2. Enter: Your test email
3. Enter: Your test password
4. Click: "Login"
5. Wait: Page loads dashboard
```

✅ **Success Indicator:** You're logged in and see user dashboard

---

## 🎯 Phase 3: Navigate to Recommender (1 minute)

### Option A: If Navigation Link Exists
```
1. Look for: "Event Recommender" or "✨" icon in navigation
2. Click: It
3. Wait: Page loads
```

### Option B: Manual URL (If Not Integrated Yet)
```
1. In address bar, type: http://localhost:5173/recommender
2. Press: Enter
3. Wait: Page loads
```

### Option C: DevTools Console (If All Else Fails)
```
1. Press: F12 (opens DevTools)
2. Click: "Console" tab
3. Paste: window.location.href = '/recommender'
4. Press: Enter
```

### What You'll See:
```
┌──────────────────────────────────────────────┐
│  ✨ Event Recommender                        │
│                                              │
│  Search for events and get personalized      │
│  recommendations based on your interests     │
├──────────────────────────────────────────────┤
│  ┌────────────────────────────────────┐     │
│  │ Search for events (e.g., 'music'...) │[Search] │
│  └────────────────────────────────────┘     │
│                                              │
├──────────────────────────────────────────────┤
│                                              │
│  No Recommendations Yet                      │
│                                              │
│  Start searching for events to get           │
│  personalized recommendations!               │
│                                              │
└──────────────────────────────────────────────┘
```

✅ **Success Indicator:** See recommender page with search box

---

## 🔍 Phase 4: First Search (3 minutes)

### Action 4.1: Focus on Search Box
```
1. Click: In the search input
2. You'll see: Cursor blinking in box
```

### Action 4.2: Type Your First Search
```
1. Type: "music"
2. You'll see: Text appears in search box
```

### Action 4.3: Click Search Button
```
1. Click: "Search" button
2. You'll see: Button shows "Searching..."
3. Wait: 2-5 seconds
```

### What Happens Behind the Scenes (Check Backend Terminal 1):
```
[Terminal 1 shows:]
🔍 Processing search: "music" for user 673a1234567890abcdef1234
✓ Saved search with embedding
📊 Getting recommendations for user 673a1234567890abcdef1234
```

### What You'll See in Browser After Wait:
```
┌──────────────────────────────────────────────┐
│  ✨ Event Recommender                        │
├──────────────────────────────────────────────┤
│  Recommended Events (10)                     │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────────────┐  ┌──────────────────┐ │
│  │ [Event Image]    │  │ [Event Image]    │ │
│  │                  │  │                  │ │
│  │ 87% Match ↗      │  │ 92% Match ↗     │ │
│  │ Annual Jazz      │  │ Summer Music    │ │
│  │ Festival         │  │ Festival        │ │
│  │                  │  │                  │ │
│  │ Annual world...  │  │ The biggest...   │ │
│  │                  │  │                  │ │
│  │ [Music]          │  │ [Music]          │ │
│  │ 📅 Jun 15,2025   │  │ 📅 Jul 20,2025   │ │
│  │ 📍 New Orleans   │  │ 📍 Austin, TX    │ │
│  │ 💰 ₹1,500       │  │ 💰 ₹2,000       │ │
│  │                  │  │                  │ │
│  │[View Details]    │  │[View Details]    │ │
│  └──────────────────┘  └──────────────────┘ │
│                                              │
│  [More cards below]                          │
│                                              │
└──────────────────────────────────────────────┘
```

✅ **Success Indicators:**
- Recommendations appear
- Match % badges visible (87%, 92%, etc.)
- Event cards display properly
- No JavaScript errors

---

## 📊 Phase 5: Check Browser Console (2 minutes)

### Action 5.1: Open DevTools
```
1. Press: F12
2. Click: "Console" tab at top
3. You'll see: Console logs
```

### What You Should See in Console:
```
🔍 Searching for: music
✅ Search saved with embedding
📊 Got 10 recommendations
[Array(10)] recommendations:
  0: {_id: "...", title: "Annual Jazz Festival", embedding: [...], similarityScore: 0.87}
  1: {_id: "...", title: "Summer Music Festival", embedding: [...], similarityScore: 0.92}
  ... (8 more events)
```

✅ **Success Indicator:** Green logs, no red errors

---

## 🔄 Phase 6: Second Search (Refinement) (3 minutes)

### Action 6.1: Modify Search
```
1. Click: In search box (clear it)
2. Type: "jazz"
3. Click: Search button
4. Wait: 2-5 seconds
```

### What Happens in Terminal 1:
```
🔍 Processing search: "jazz" for user 673a1234567890abcdef1234
✓ Saved search with embedding
📊 Getting recommendations for user 673a1234567890abcdef1234
```

### What You'll See in Browser:
```
Previous recommendations are REPLACED with:

┌──────────────────┐  ┌──────────────────┐
│ [Event Image]    │  │ [Event Image]    │
│ 94% Match ↗      │  │ 91% Match ↗     │
│ Jazz Night 2025  │  │ Blues & Jazz Fest
│ [Music]          │  │ [Music]          │
│ 💰 ₹800         │  │ 💰 ₹600         │
└──────────────────┘  └──────────────────┘

Different Match % from before!
More Jazz-specific events!
```

✅ **Success Indicators:**
- Previous recommendations removed
- New recommendations appear
- Match percentages are different
- More jazz-focused events shown

---

## 🎨 Phase 7: Third Search (Refine Further) (3 minutes)

### Action 7.1: Another Search
```
1. Clear search box
2. Type: "live jazz concert"
3. Click: Search
4. Wait: 2-5 seconds
```

### What You'll See:
```
Even more specific jazz events!

┌──────────────────┐  ┌──────────────────┐
│ [Event Image]    │  │ [Event Image]    │
│ 96% Match ↗      │  │ 95% Match ↗     │
│ Live Jazz Concert│  │ Jazz Lounge Night
│ [Music]          │  │ [Music]          │
│ 💰 ₹500         │  │ 💰 ₹450         │
└──────────────────┘  └──────────────────┘

Match % even higher than before!
System learned your jazz preference!
```

✅ **Success Indicator:** Results progressively refine based on search history

---

## 📋 Phase 8: Verify Data in MongoDB (Optional, 5 minutes)

### Action 8.1: Open MongoDB Connection
```
1. Open Terminal 4
2. Type: mongosh
3. Press: Enter
```

### Action 8.2: Check Searches
```
mongosh> use eventmanagement
mongosh> db.usersearches.find({}).pretty()
```

### What You'll See:
```
[
  {
    _id: ObjectId("..."),
    userId: "673a1234567890abcdef1234",
    query: "music",
    embedding: [ 0.123, 0.456, 0.789, ... ], // 384 numbers!
    createdAt: ISODate("2025-11-12T15:30:00Z"),
    __v: 0
  },
  {
    _id: ObjectId("..."),
    userId: "673a1234567890abcdef1234",
    query: "jazz",
    embedding: [ 0.234, 0.567, 0.890, ... ], // Different 384 numbers!
    createdAt: ISODate("2025-11-12T15:35:00Z"),
    __v: 0
  },
  {
    _id: ObjectId("..."),
    userId: "673a1234567890abcdef1234",
    query: "live jazz concert",
    embedding: [ 0.345, 0.678, 0.901, ... ], // Yet different!
    createdAt: ISODate("2025-11-12T15:40:00Z"),
    __v: 0
  }
]
```

✅ **Success Indicator:** All 3 searches stored with embeddings

### Action 8.3: Check Event Embeddings
```
mongosh> db.events.find({embedding: {$exists: true}}, {title: 1, embedding: 1}).limit(2).pretty()
```

### What You'll See:
```
[
  {
    _id: ObjectId("..."),
    title: "Annual Jazz Festival",
    embedding: [ 0.567, 0.890, 0.123, ... ] // 384 numbers
  },
  {
    _id: ObjectId("..."),
    title: "Summer Music Festival",
    embedding: [ 0.678, 0.901, 0.234, ... ] // 384 numbers
  }
]
```

✅ **Success Indicator:** Events have embeddings

---

## 🎉 Phase 9: Final Checks (2 minutes)

### Check List:
```
[ ] Backend terminal shows no errors
[ ] Frontend loads without errors
[ ] Can search for events
[ ] Recommendations appear
[ ] Match % badges visible
[ ] Multiple searches refine results
[ ] Browser console has no red errors
[ ] MongoDB has saved searches
[ ] Events have embeddings
```

---

## 📈 Summary: What Happened

```
You Searched           System Did                Result
─────────────────     ────────────────────     ──────────────
"music"          →    Generated embedding →   General music
                      for "music"               events shown
                      Saved to DB              (87%, 92%, etc.)
                      Compared to all events
                      Ranked by similarity

"jazz"           →    Generated embedding →   More jazz-
                      for "jazz"               focused events
                      Combined with prev.      (94%, 91%, etc.)
                      search history           Different
                      Created user profile     results!
                      Compared to all events
                      Ranked by similarity

"live jazz       →    Generated embedding →   Very specific
concert"              for query                jazz events
                      Combined with prev.      (96%, 95%, etc.)
                      2 searches               System learned
                      Created updated          your preference!
                      user profile
                      Compared to all events
                      Ranked by similarity
```

---

## ✅ Validation Checklist (Your Testing is Complete!)

- [ ] Backend started successfully
- [ ] Event embeddings generated
- [ ] Frontend started successfully
- [ ] Recommender page loads
- [ ] First search works (2-5s)
- [ ] Recommendations display
- [ ] Match % badges visible
- [ ] Second search refines results
- [ ] Third search further refines
- [ ] Different queries show different events
- [ ] Browser console has no errors
- [ ] Backend logs show all searches
- [ ] MongoDB stores all searches
- [ ] Events have embeddings
- [ ] System ready for production!

---

## 🎯 What You've Validated

✅ **Functionality**
- Search endpoint working
- Embedding generation working
- Recommendation algorithm working
- Database storage working

✅ **Integration**
- Frontend communicates with backend
- Backend queries database correctly
- Data flows properly end-to-end

✅ **Performance**
- Response times acceptable (< 5s)
- No timeouts or hangs
- Proper error handling

✅ **User Experience**
- Interface is intuitive
- Results are relevant
- System learns from searches
- Recommendations improve over time

---

## 🚀 You're Done!

Congratulations! You've successfully:
1. ✅ Set up the backend
2. ✅ Generated event embeddings
3. ✅ Started the frontend
4. ✅ Tested the recommendation system
5. ✅ Verified data persistence
6. ✅ Confirmed end-to-end functionality

**The Event Recommender is working perfectly!**

---

## 📊 Next Steps

- [ ] Integrate component into main navigation (if not done)
- [ ] Deploy to production
- [ ] Monitor recommendation quality
- [ ] Collect user feedback
- [ ] Iterate and improve

---

**Test Duration:** 30-45 minutes total
**Difficulty:** Beginner-friendly (just copy-paste commands!)
**Success Rate:** Should be 100% (all setup done for you)

**Questions?** Check the other documentation files in the project root.

Good luck! 🎉

