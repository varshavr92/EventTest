# 📚 Event Recommender - Complete Documentation Index

Navigate all documentation for the embedding-based event recommendation system.

---

## 🚀 Getting Started (Start Here!)

### For Impatient Developers (5 min)
**Read**: `QUICKSTART_RECOMMENDER.md`
- TL;DR commands
- Key features summary
- Common issues & fixes

### For Complete Setup (30 min)
**Read**: `SETUP_RECOMMENDER.md`
- Step-by-step instructions
- Pre-requisites
- Pre-embedding events
- Manual testing with curl/Postman
- Troubleshooting guide

### For Understanding the System (20 min)
**Read**: `ARCHITECTURE_DIAGRAMS.md`
- System architecture diagram
- Data flow visualization
- Algorithm pseudocode
- API examples
- Performance timeline

---

## 📖 Comprehensive Guides

### Technical Reference
**Read**: `README_RECOMMENDER.md`
- Complete architecture overview
- API endpoint documentation
- Database schema details
- Configuration options
- Performance metrics
- Future enhancements

### Implementation Details
**Read**: `IMPLEMENTATION_SUMMARY.md`
- Files created/modified summary
- Architectural decisions & rationale
- Key features included
- Customization points
- Known limitations
- Verification checklist

### Detailed Diagrams & Workflows
**Read**: `ARCHITECTURE_DIAGRAMS.md`
- System block diagram
- Search → Recommendation data flow
- Cosine similarity calculation
- User profile evolution
- Algorithm pseudocode
- API request/response examples
- Performance timeline

---

## 🗂️ File Organization

### Backend Source Code

#### Utilities
```
backend/utils/
├── embeddingEngine.js          ← MiniLM model & text→vector conversion
└── recommendations.js           ← Cosine similarity & recommendation logic
```

#### Models
```
backend/models/
├── Event.js                    ← Event schema with embedding field
└── UserSearch.js               ← User search history with embeddings
```

#### Routes
```
backend/routes/
└── recommendation.js            ← API endpoints (/search, /:userId)
```

#### Scripts
```
backend/scripts/
├── generateEventEmbeddings.js  ← Pre-embed all existing events
└── testRecommender.js           ← End-to-end test suite
```

### Frontend Source Code

#### Components
```
frontend/src/components/
└── EventRecommender.jsx        ← React component for search & recommendations
```

### Documentation
```
root/
├── QUICKSTART_RECOMMENDER.md       ← 5-minute quick start
├── SETUP_RECOMMENDER.md            ← Detailed setup & troubleshooting
├── README_RECOMMENDER.md           ← Full technical reference
├── ARCHITECTURE_DIAGRAMS.md        ← Visual diagrams & workflows
├── IMPLEMENTATION_SUMMARY.md       ← What was built & why
└── DOCUMENTATION_INDEX.md          ← You are here
```

---

## 🎯 Feature Documentation

### Core Features

**Feature**: Local Embeddings
- **File**: `backend/utils/embeddingEngine.js`
- **Doc**: README_RECOMMENDER.md → Configuration
- **Why**: No API calls, no privacy concerns, fast

**Feature**: Semantic Search
- **File**: MiniLM model via embeddingEngine
- **Doc**: ARCHITECTURE_DIAGRAMS.md → Why This Works
- **Why**: Understands intent, not just keywords

**Feature**: Personalization
- **File**: `backend/utils/recommendations.js`
- **Doc**: README_RECOMMENDER.md → Data Flow
- **Why**: Adapts to user preferences over time

**Feature**: Real-time Response
- **File**: All backend components
- **Doc**: README_RECOMMENDER.md → Performance Notes
- **Why**: <200ms for 1000 events

---

## 🔧 Configuration Guide

### Where to Configure What

| What | File | Line | Change |
|------|------|------|--------|
| Embedding Model | `utils/embeddingEngine.js` | ~15 | Model name |
| Batch Size | `scripts/generateEventEmbeddings.js` | ~12 | BATCH_SIZE |
| Default Limit | `routes/recommendation.js` | ~75 | limit = 10 |
| Similarity Threshold | `utils/recommendations.js` | ~110 | > 0 |
| API Port | `backend/server.js` | ~55 | listen(5000) |
| Frontend URL | `components/EventRecommender.jsx` | ~40 | localhost:5173 |

See: `README_RECOMMENDER.md → Configuration` for details.

---

## 🧪 Testing Documentation

### Test Scripts Available

**1. End-to-End Test**
```bash
node scripts/testRecommender.js
```
**Coverage**: Full workflow from search to recommendations
**Docs**: `SETUP_RECOMMENDER.md → Testing`

**2. Unit Tests (in code)**
- Embedding generation
- Cosine similarity
- Vector averaging

**3. Integration Tests (manual)**
- API testing with curl/Postman
- Database verification
- Frontend interaction

**Docs**: `SETUP_RECOMMENDER.md → API Testing`

---

## 🚨 Troubleshooting Index

### Common Issues

| Issue | Symptom | Solution File | Section |
|-------|---------|---------------|---------|
| No recommendations | Empty array returned | SETUP_RECOMMENDER.md | No Recommendations |
| Model fails | HTTPError 404 | SETUP_RECOMMENDER.md | Model Download Fails |
| Out of memory | Crash | SETUP_RECOMMENDER.md | High Memory Usage |
| CORS error | Browser error | SETUP_RECOMMENDER.md | CORS Error |
| Wrong user | Wrong recs | SETUP_RECOMMENDER.md | Empty Search History |

### Quick Fixes

**If nothing works**: Run the test script
```bash
node scripts/testRecommender.js
```
This validates the entire system step-by-step.

---

## 📊 API Documentation

### Endpoints

**Save Search** (generates embedding)
```
POST /api/recommendations/search
```
- **Docs**: README_RECOMMENDER.md → API Endpoints → Save User Search
- **Example**: ARCHITECTURE_DIAGRAMS.md → API Examples

**Get Recommendations** (returns top-K)
```
GET /api/recommendations/:userId?limit=10
```
- **Docs**: README_RECOMMENDER.md → API Endpoints → Get Recommendations
- **Example**: ARCHITECTURE_DIAGRAMS.md → API Examples

### Request/Response Format
**Docs**: ARCHITECTURE_DIAGRAMS.md → Request/Response Examples

---

## 🏗️ Architecture Overview

### High-Level
**Docs**: ARCHITECTURE_DIAGRAMS.md → System Architecture

### Data Flow
**Docs**: ARCHITECTURE_DIAGRAMS.md → Data Flow: Search → Recommendation

### Algorithms
**Docs**: 
- ARCHITECTURE_DIAGRAMS.md → Algorithm Pseudocode
- README_RECOMMENDER.md → Technical Details

---

## 💡 Concepts & Theory

### Embeddings Explained
**Doc**: README_RECOMMENDER.md → Technical Details → MiniLM Model

### Cosine Similarity
**Doc**: 
- ARCHITECTURE_DIAGRAMS.md → Cosine Similarity Calculation
- README_RECOMMENDER.md → Technical Details → Cosine Similarity Formula

### User Profile Averaging
**Doc**: ARCHITECTURE_DIAGRAMS.md → User Profile Evolution

### Why This Approach Works
**Doc**: ARCHITECTURE_DIAGRAMS.md → Why This Architecture Works

---

## 🚀 Deployment Checklist

- [ ] Read: `QUICKSTART_RECOMMENDER.md`
- [ ] Setup: `SETUP_RECOMMENDER.md` (all 6 steps)
- [ ] Test: `node scripts/testRecommender.js`
- [ ] Verify: All tests pass
- [ ] Integrate: `components/EventRecommender.jsx` in your app
- [ ] Test: `/recommendations` page works
- [ ] Monitor: Check browser console & backend logs

---

## 🎓 Learning Path

### Beginner (Want to use it)
1. QUICKSTART_RECOMMENDER.md
2. SETUP_RECOMMENDER.md (first 3 steps)
3. Test the component
4. Done! ✨

### Intermediate (Want to understand it)
1. QUICKSTART_RECOMMENDER.md
2. ARCHITECTURE_DIAGRAMS.md
3. README_RECOMMENDER.md (API & Database sections)
4. Run test script: `node scripts/testRecommender.js`

### Advanced (Want to modify/extend it)
1. All above + IMPLEMENTATION_SUMMARY.md
2. Read source code:
   - `embeddingEngine.js`
   - `recommendations.js`
   - `EventRecommender.jsx`
3. Modify as needed
4. Test with custom data

---

## 🔗 Cross-References

### By File

**embeddingEngine.js**
- Created by: IMPLEMENTATION_SUMMARY.md
- Explained in: README_RECOMMENDER.md → Configuration
- Tested by: testRecommender.js

**recommendations.js**
- Created by: IMPLEMENTATION_SUMMARY.md
- Explained in: ARCHITECTURE_DIAGRAMS.md → Algorithm
- Tested by: testRecommender.js

**EventRecommender.jsx**
- Created by: IMPLEMENTATION_SUMMARY.md
- Integrated in: SETUP_RECOMMENDER.md → Step 2
- Styled with: Tailwind CSS + Lucide Icons

---

## 📈 Performance Reference

### Timeline
**Doc**: ARCHITECTURE_DIAGRAMS.md → Performance Timeline

### Metrics
**Doc**: README_RECOMMENDER.md → Performance Notes

### Optimization
**Doc**: SETUP_RECOMMENDER.md → Performance Tuning

---

## 🎯 Use Cases & Examples

### Example 1: Music Lover
**Doc**: QUICKSTART_RECOMMENDER.md → Use Cases

### Example 2: Tech Enthusiast
**Doc**: QUICKSTART_RECOMMENDER.md → Use Cases

### Example 3: Fitness Focused
**Doc**: QUICKSTART_RECOMMENDER.md → Use Cases

---

## 🆘 Getting Help

### If You Get an Error
1. Check: `SETUP_RECOMMENDER.md → Troubleshooting`
2. Search: Error message in docs
3. Run: `node scripts/testRecommender.js`
4. Check: Browser console & backend logs

### If You Want to Modify It
1. Read: `IMPLEMENTATION_SUMMARY.md → Customization Points`
2. Find: Relevant source file
3. Read: Code comments
4. Test: `node scripts/testRecommender.js`

### If You Need More Info
1. Check: All relevant docs above
2. Read: Code comments in source files
3. Search: Documentation for keywords

---

## 📋 Document Quick Links

| Document | Purpose | Read Time | For Who |
|----------|---------|-----------|---------|
| QUICKSTART | Fast start | 5 min | Everyone |
| SETUP | Complete setup | 30 min | Developers |
| README | Technical ref | 45 min | Technical leads |
| ARCHITECTURE | Diagrams & flow | 20 min | Visual learners |
| IMPLEMENTATION | What was built | 15 min | Integration |
| **THIS DOC** | Navigation | 10 min | Finding things |

---

## 🎉 Ready to Get Started?

1. **Impatient?** → Start with `QUICKSTART_RECOMMENDER.md`
2. **Thorough?** → Start with `SETUP_RECOMMENDER.md`
3. **Visual?** → Start with `ARCHITECTURE_DIAGRAMS.md`
4. **Technical?** → Start with `README_RECOMMENDER.md`

**Or just run**:
```bash
cd backend
node scripts/generateEventEmbeddings.js
npm run dev

# Terminal 2
cd frontend
npm run dev
```

---

## 📞 Quick Reference Commands

```bash
# Pre-embed events
node scripts/generateEventEmbeddings.js

# Test everything
node scripts/testRecommender.js

# Start backend
npm run dev  # from backend/

# Start frontend
npm run dev  # from frontend/

# Test API with curl
curl http://localhost:5000/api/recommendations/USERID

# Visit in browser
http://localhost:5173/recommendations
```

---

## ✨ What You Have

- ✅ Embedding generation (local, MiniLM)
- ✅ Semantic search (understands meaning)
- ✅ User profiles (learns from history)
- ✅ Real-time recommendations (<200ms)
- ✅ Fully tested (end-to-end test suite)
- ✅ Well documented (5 guide docs)
- ✅ Production ready (error handling, logging)
- ✅ Easy to customize (clear code, config points)

---

**Happy Exploring! 🚀**

**Start Here**: Pick a document based on your needs above.
**Questions?**: Check the relevant document section.
**Errors?**: See SETUP_RECOMMENDER.md → Troubleshooting.
**Need Help?**: Run testRecommender.js to validate system.

---

*Last Updated: November 12, 2025*
*Status: Complete & Ready for Use*
