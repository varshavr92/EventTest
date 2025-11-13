# 🚀 Copy-Paste Commands for Testing

## Setup: Copy & Run These Commands

### Terminal 1: Start Backend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; npm run dev
```

**Expected Output:**
```
Server running on port 5000
✅ MiniLM model loaded for events
MongoDB Connected
✅ Email transporter ready
```

---

### Terminal 2: Generate Event Embeddings (IMPORTANT!)
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; node scripts/generateEventEmbeddings.js
```

**Expected Output:**
```
🔄 Starting embedding generation...
Processing events...
✅ Embedding generation completed!
```

**⏱️ This takes ~2 minutes first time (downloads model), ~10-15 seconds after**

---

### Terminal 3: Start Frontend
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend; npm run dev
```

**Expected Output:**
```
VITE vX.X.X  ready in XXXX ms

➜  Local:   http://localhost:5173/
```

---

## Testing: Manual Commands

### In Browser Address Bar:
```
http://localhost:5173
```

### To Access Recommender:
```
http://localhost:5173/recommender
```

### Or in Console (F12 → Console):
```javascript
// Get your user ID
localStorage.getItem('userId')

// Navigate to recommender
window.location.href = '/recommender'
```

---

## Debug Commands: Run These If Something's Wrong

### Kill all Node processes (free port 5000):
```powershell
Stop-Process -Force -ErrorAction SilentlyContinue -Name node; Start-Sleep -Seconds 2; echo "Cleaned"
```

### Check if MongoDB is running:
```powershell
mongosh --version
```

### Verify backend is listening:
```powershell
netstat -ano | findstr :5000
```

### Reinstall backend dependencies:
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; npm install
```

### Reinstall frontend dependencies:
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend; npm install
```

### Clear Node cache:
```powershell
npm cache clean --force
```

---

## Browser Console Testing Commands

### Check current user ID:
```javascript
const userId = localStorage.getItem('userId');
console.log('User ID:', userId);
```

### Test search endpoint manually:
```javascript
fetch('http://localhost:5000/api/recommendations/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'YOUR_USER_ID_HERE',
    query: 'music concert'
  })
})
.then(r => r.json())
.then(data => console.log('Search response:', data))
.catch(e => console.error('Error:', e))
```

### Test recommendations endpoint manually:
```javascript
fetch('http://localhost:5000/api/recommendations/YOUR_USER_ID_HERE?limit=10')
  .then(r => r.json())
  .then(data => console.log('Recommendations:', data))
  .catch(e => console.error('Error:', e))
```

### Check if component is mounted:
```javascript
console.log('Current view:', document.title);
console.log('URL:', window.location.href);
```

---

## Database Commands: Check Data in MongoDB

### Connect to MongoDB:
```powershell
mongosh
```

### Switch to database:
```
use eventmanagement
```

### Check events with embeddings:
```javascript
db.events.find({embedding: {$exists: true}}).count()
```

### Check user searches:
```javascript
db.usersearches.find({}).pretty()
```

### Check a specific user's searches:
```javascript
db.usersearches.find({userId: "YOUR_USER_ID_HERE"}).pretty()
```

### Exit MongoDB:
```
exit
```

---

## Performance Checks

### Check response time (in browser console):
```javascript
console.time('search');
fetch('http://localhost:5000/api/recommendations/search', {...})
  .then(r => r.json())
  .then(data => console.timeEnd('search'))
```

### Check memory usage (backend):
```javascript
console.log(process.memoryUsage())
```

---

## Integration Commands: Add to App

### Navigate to frontend folder:
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend\src
```

### View App.jsx:
```powershell
cat App.jsx | head -20
```

### View Navigation.jsx:
```powershell
cat components\Navigation.jsx | head -20
```

---

## Testing Automation: Run Test Suite

### Run end-to-end test suite:
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; node scripts/testRecommender.js
```

### Expected output:
```
✅ MongoDB connection successful
✅ Test user created/retrieved
✅ Previous searches cleared
✅ Searches posted successfully
✅ Recommendations generated
✅ All tests passed!
```

---

## Logs: View What's Happening

### View backend logs in real-time:
```
Keep the backend terminal open and watch for:
🔍 Processing search:
✓ Saved search with embedding
📊 Getting recommendations
```

### View network requests (browser):
```
1. Open DevTools (F12)
2. Go to "Network" tab
3. Make a search
4. Look for requests:
   - POST /api/recommendations/search
   - GET /api/recommendations/:userId
```

### View console logs (browser):
```
1. Open DevTools (F12)
2. Go to "Console" tab
3. Search for:
   - 🔍 Searching for:
   - ✅ Search saved
   - 📊 Got X recommendations
```

---

## Cleanup Commands

### Stop all servers (Terminal only):
```
Ctrl+C in each terminal
```

### Then close terminals:
```powershell
exit
```

### If stuck:
```powershell
Stop-Process -Force -Name node, mongosh 2>$null; echo "Done"
```

---

## One-Line Setup (Run All at Once)

### Open 3 terminals and run these 3 commands:

**Terminal 1:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; npm run dev
```

**Terminal 2:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend; node scripts/generateEventEmbeddings.js
```

**Terminal 3:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend; npm run dev
```

Then open browser: `http://localhost:5173/recommender`

---

## Quick Restart (If Something Breaks)

### Everything broken? Try this order:

```powershell
# 1. Kill all Node processes
Stop-Process -Force -ErrorAction SilentlyContinue -Name node

# 2. Wait
Start-Sleep -Seconds 2

# 3. Start backend
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
npm run dev

# (in new terminal)
# 4. Generate embeddings
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
node scripts/generateEventEmbeddings.js

# (in new terminal)
# 5. Start frontend
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend
npm run dev

# 6. Open browser
# http://localhost:5173
```

---

## Useful Links

```
🏠 Homepage: http://localhost:5173
🎯 Recommender: http://localhost:5173/recommender
📊 Backend API: http://localhost:5000
💾 MongoDB: mongosh (local instance)
📝 Frontend Logs: Browser DevTools (F12)
📝 Backend Logs: Terminal window
```

---

## Environment Files Check

### Verify .env files exist:

**Backend:**
```powershell
Get-Content c:\Users\asus\OneDrive\Desktop\EventTest\backend\.env
```

**Frontend:**
```powershell
Get-Content c:\Users\asus\OneDrive\Desktop\EventTest\frontend\.env
```

Should show environment variables like:
- `MONGO_URI`
- `RAZORPAY_KEY_ID`
- `VITE_RAZORPAY_KEY_ID`
- `OPENAI_API_KEY`

---

## Success Indicators

✅ All commands complete without errors
✅ Terminals show expected outputs
✅ Browser loads without errors
✅ Can search and see recommendations
✅ No red errors in console
✅ Backend logs show activity

---

## Need Help?

If a command fails:
1. Copy the error message
2. Check the relevant guide:
   - `QUICKSTART.md` - Quick 5-min setup
   - `TESTING_SUMMARY.md` - What to expect
   - `FRONTEND_TESTING_GUIDE.md` - Detailed visual guide
   - `MANUAL_TESTING_GUIDE.md` - Step-by-step testing

---

**Happy Testing! 🎉**

