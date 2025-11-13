# Quick Integration Guide: EventRecommender

The EventRecommender component is built and ready to use. Follow these steps to integrate it into your app.

## Step 1: Update `App.jsx`

Add the import at the top:
```jsx
import EventRecommender from './components/EventRecommender';
```

Add the route in the `return` statement (add after the about section):
```jsx
{currentView === 'recommender' && (
  <EventRecommender userId={localStorage.getItem('userId')} />
)}
```

**Location:** In `App.jsx`, around line 130-140, add:
```jsx
{currentView === 'about' && (
  <AboutUs />
)}

{currentView === 'recommender' && (
  <EventRecommender userId={localStorage.getItem('userId')} />
)}

{currentView === 'confirmation' && (
```

---

## Step 2: Update `Navigation.jsx`

Add a link to the recommender in your navigation menu.

Find the navigation links section and add:
```jsx
<button
  onClick={() => {
    setCurrentView('recommender');
    setShowMobileMenu(false);
  }}
  className="text-gray-600 hover:text-blue-600 transition"
>
  ✨ Event Recommender
</button>
```

Or if using a link structure, add:
```jsx
<li>
  <a 
    href="#recommender"
    onClick={(e) => {
      e.preventDefault();
      setCurrentView('recommender');
    }}
    className="text-gray-600 hover:text-blue-600 transition"
  >
    ✨ Event Recommender
  </a>
</li>
```

---

## Testing After Integration

### 1. Start both servers
**Terminal 1 - Backend:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\frontend
npm run dev
```

### 2. Generate event embeddings (one-time setup)
**Terminal 3:**
```powershell
cd c:\Users\asus\OneDrive\Desktop\EventTest\backend
node scripts/generateEventEmbeddings.js
```

Wait for completion: `✅ Embedding generation completed!`

### 3. Open browser and test
1. Navigate to `http://localhost:5173`
2. Log in or ensure you're logged in
3. Click **Event Recommender** link in navigation
4. Search for events like "music", "tech", "concert"
5. See personalized recommendations

---

## Testing Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Logged in with a user account
- [ ] Can access Event Recommender from navigation
- [ ] Can type in search box
- [ ] Recommendations appear after searching
- [ ] Similarity scores visible
- [ ] No console errors
- [ ] Multiple searches refine results

---

## What Next?

Once integrated and tested:
1. Customize styling to match your app theme
2. Add to main navigation permanently
3. Test with different users and search patterns
4. Monitor recommendation quality
5. Adjust similarity thresholds if needed

---

## Troubleshooting Integration

**"Cannot find module 'EventRecommender'"**
- Verify path: `./components/EventRecommender`
- Check file exists: `frontend/src/components/EventRecommender.jsx`

**Component shows but navigation link doesn't work**
- Ensure `setCurrentView('recommender')` is called
- Check that `currentView === 'recommender'` renders the component

**No recommendations appear**
- Run `node scripts/generateEventEmbeddings.js` in backend folder
- Wait for completion
- Restart backend server
- Try again

**"Failed to save search" error**
- Backend must be running on port 5000
- Check backend console for errors
- Verify userId is being passed correctly

