# Testing Guide - Offline Features

## Step-by-Step Testing

### Test 1: First Load (Online)
1. Start app: `npm run dev`
2. Open browser to `http://localhost:5173`
3. Navigate to "Todo List"
4. ✅ Should see todos loaded from API
5. ✅ Navbar shows "🟢 Online"

### Test 2: Offline Load with Cache
1. Keep app open from Test 1
2. Open DevTools (F12)
3. Go to Network tab
4. Select "Offline" from throttling dropdown
5. Refresh the page (Ctrl+R / Cmd+R)
6. ✅ App loads instantly (from service worker)
7. ✅ Todos appear (from IndexedDB cache)
8. ✅ Yellow banner: "Showing cached data from [time]"
9. ✅ Navbar shows "🔴 Offline"

### Test 3: Add Todo While Offline
1. Stay offline from Test 2
2. Navigate to "Add Todo"
3. ✅ Blue banner: "You're offline. New todos will be synced..."
4. Type "Buy groceries" and click "Add Todo"
5. ✅ Toast: "Todo queued! Will sync when online. 📥"
6. ✅ Navbar shows "1 pending" badge
7. Add another todo: "Call dentist"
8. ✅ Navbar shows "2 pending"

### Test 4: Auto-Sync When Online
1. Stay on any page
2. In DevTools Network tab, change from "Offline" to "No throttling"
3. ✅ Navbar changes to "🟢 Online"
4. ✅ Toast: "Syncing 2 pending action(s)..."
5. ✅ Toast: "All changes synced!"
6. ✅ Pending badge disappears
7. Navigate to "Todo List"
8. ✅ Fresh data loaded from API

### Test 5: Fresh Offline Start
1. Close browser completely
2. Disconnect WiFi / Network
3. Open browser to `http://localhost:5173`
4. ✅ App loads (if you've visited before)
5. ✅ Shows cached data
6. ✅ Can navigate between pages
7. ✅ Can add todos (they queue)

## What to Check in DevTools

### Application Tab → Service Worker
- ✅ Status: "activated and is running"
- ✅ Source: `/sw.js`

### Application Tab → IndexedDB → TodoPWA
- ✅ Database: "TodoPWA"
- ✅ Object Stores: "todos", "pendingActions"
- ✅ Click "todos" → see cached todo items
- ✅ Click "pendingActions" → see queued actions (when offline)

### Application Tab → Local Storage
- ✅ Key: "REACT_QUERY_OFFLINE_CACHE"
- ✅ Value: JSON with cached queries

### Application Tab → Cache Storage
- ✅ "workbox-precache-v2-..." → static assets
- ✅ "api-cache" → API responses
- ✅ "images-cache" → images

## Expected Behaviors

### Online Mode
- Green indicator
- Fresh data from API
- Instant todo creation
- No pending badge

### Offline Mode
- Red indicator
- Cached data with timestamp
- Todos queue for sync
- Pending counter shows queued items

### Transition Online → Offline
- Indicator changes to red
- Yellow banner appears on Todo List
- Blue banner appears on Add Todo
- Can still use app fully

### Transition Offline → Online
- Indicator changes to green
- Auto-sync starts immediately
- Toast notifications show progress
- Pending badge disappears
- Fresh data loads

## Common Issues & Solutions

### Issue: "No cached data available"
**Solution**: Visit the app online first to populate cache

### Issue: Pending actions don't sync
**Solution**: Check browser console for errors, ensure API is accessible

### Issue: Service worker not activating
**Solution**: 
- Check DevTools → Application → Service Workers
- Click "Unregister" and refresh
- Clear site data and reload

### Issue: Old data showing
**Solution**: 
- React Query cache is 5 minutes stale time
- Force refresh or wait for auto-refresh

## Performance Checks

### Load Time (Offline)
- ✅ Should be < 1 second
- ✅ Instant if service worker cached

### Sync Time (Online)
- ✅ Should complete in < 3 seconds for 10 items
- ✅ Toast shows progress

### Cache Size
- Check DevTools → Application → Storage
- ✅ Should be reasonable (< 5MB for demo)

## Browser Compatibility

Tested on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS/macOS)

Note: Service Workers require HTTPS in production (localhost is OK for dev)
