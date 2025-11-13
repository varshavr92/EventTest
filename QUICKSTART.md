# Event Recommender - Quick Start (5 Minutes)

## ⚡ TL;DR - Get Started Now

### Terminal 1: Start Backend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
npm run dev
# Wait for: "Server running on port 5000"
```

### Terminal 2: Generate Event Embeddings (RUN ONCE)
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
node scripts/generateEventEmbeddings.js
# Wait for: "✅ Embedding generation completed!"
```

### Terminal 3: Start Frontend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend
npm run dev
# Wait for: "VITE ... ready in ... ms"
```

### Browser
1. Open: `http://localhost:5173`
2. Log in with your test account
3. Visit: `http://localhost:5173/recommender` (or click nav link if integrated)
4. Search: Type "music", "tech", "concert", etc.
5. View: Recommendations with similarity scores appear!

---

## 🧪 What to Test Manually

| Test | Steps | Expected Result |
|------|-------|-----------------|
| **Search for Music** | Type "live music" → Click Search | Recommendations appear with music events |
| **Search for Tech** | Type "tech conference" → Click Search | Tech-related events shown, music events deprioritized |
| **Check Similarity** | Look at % badges | Events related to your searches have higher % |
| **Search Again** | Search for "jazz concert" | Recommendations refine based on all 3 searches |
| **Check Console** | Open DevTools (F12) → Console | See debug logs of searches and recommendations |
| **Check Backend** | Watch backend terminal | See logs for each search processed |

---

## 📊 How It Works (User View)

1. **User searches**: "music festival"
   - Search + embedding sent to backend
   - Saved to database

2. **System processes**: 
   - Generates 384-dimensional embedding for search
   - Finds all similar embeddings from past searches
   - Creates user preference profile by averaging embeddings
   - Compares profile to all event embeddings

3. **Results shown**:
   - Top 10 most similar events
   - Similarity percentage (how well it matches interests)
   - Event cards with all details

---

## 📁 Key Files

```
frontend/src/components/EventRecommender.jsx
├── Search input box
├── Recommendation display
└── EventCard subcomponent

backend/routes/recommendation.js
├── POST /api/recommendations/search
└── GET /api/recommendations/:userId

backend/utils/embeddingEngine.js
├── MiniLM model (384-dim vectors)

backend/utils/recommendations.js
├── Cosine similarity logic
└── Event ranking algorithm

backend/scripts/generateEventEmbeddings.js
└── Pre-embeds all events in database
```

---

## 🔧 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| "No Recommendations Yet" | Run `generateEventEmbeddings.js` |
| "Failed to save search" | Backend not running? Check port 5000 |
| Component not visible | Add to App.jsx and Navigation.jsx |
| Console errors | Check browser DevTools F12 |
| "Cannot find module" | Verify import path in App.jsx |

---

## 📈 Expected Behavior

### First Time Using
- Search 1: "music"
  - Result: Random/general events shown
- Search 2: "jazz"
  - Result: More music-focused events
- Search 3: "live jazz"
  - Result: Very specific jazz events rank higher

### Multiple Sessions
- User 1 searches: Music events → gets music recommendations
- User 2 searches: Tech events → gets tech recommendations
- Each user has personalized recommendations based on their search history

---

## ✅ Validation Checklist

- [ ] Backend terminal shows: "Server running on port 5000"
- [ ] Backend shows: "✅ MiniLM model loaded for events"
- [ ] Backend shows: "MongoDB Connected"
- [ ] Frontend loads without errors
- [ ] Can navigate to recommender component
- [ ] Search input is visible
- [ ] First search works (check console for logs)
- [ ] Recommendations appear after 2-5 seconds
- [ ] Similarity % badges visible on cards
- [ ] Second search refines results
- [ ] No JavaScript errors in DevTools

---

## 🎯 Test Scenarios to Try

### Scenario A: Music Lover
1. Search: "concert"
2. Search: "live music"
3. Search: "music festival"
→ Verify: Recommendations become increasingly music-focused

### Scenario B: Tech Enthusiast
1. Search: "tech conference"
2. Search: "startup summit"
3. Search: "innovation workshop"
→ Verify: Recommendations become increasingly tech-focused

### Scenario C: Genre Mixer
1. Search: "music"
2. Search: "sports"
3. Search: "technology"
→ Verify: Mix of recommendations from all categories

---

## 📞 Need Help?

**If component doesn't show:**
→ Check `INTEGRATION_GUIDE.md`

**For detailed testing steps:**
→ Check `MANUAL_TESTING_GUIDE.md`

**For system architecture:**
→ Check `ARCHITECTURE_DIAGRAMS.md`

**For setup issues:**
→ Check `SETUP_RECOMMENDER.md`

---

## 🚀 Performance Tips

- Backend: Runs MiniLM model in memory (fast after first load)
- Frontend: Caches recommendations in component state
- Database: Pre-computed embeddings (384 floats per event)
- First search: ~2-3 seconds (model initialization)
- Subsequent searches: ~1-2 seconds

---

## 🎉 You're Ready!

Everything is set up and ready to test. Follow the "⚡ TL;DR" section above and you'll have recommendations working in 5 minutes!

Questions? Check the detailed guides in the project root:
- `MANUAL_TESTING_GUIDE.md` - Step-by-step testing
- `INTEGRATION_GUIDE.md` - How to integrate into app
- `ARCHITECTURE_DIAGRAMS.md` - Technical deep dive
- `IMPLEMENTATION_SUMMARY.md` - What was built

