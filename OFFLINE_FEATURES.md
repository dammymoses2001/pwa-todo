# Offline-First Features

## What's Been Implemented

### 1. **Persistent Cache with IndexedDB**
- All API responses are automatically cached in IndexedDB
- When offline, the app loads data from the cache
- No more blank screens when offline!

### 2. **React Query Persistence**
- Query cache is persisted to localStorage
- Instant data availability on app startup
- Works even on first offline load (if you've visited before)

### 3. **Offline Action Queue**
- Add todos while offline - they're queued automatically
- When you come back online, all pending actions sync automatically
- Visual feedback shows sync status

### 4. **Network Status Indicator**
- Real-time online/offline status display
- Color-coded indicators (green = online, red = offline)
- Helpful messages about cached data

### 5. **Service Worker Caching**
- Static assets cached via Workbox
- API responses cached with NetworkFirst strategy
- App shell loads instantly, even offline

## How It Works

### First Visit (Online)
1. App loads normally
2. Data fetched from API
3. Responses cached in IndexedDB + localStorage
4. Service worker caches static assets

### Subsequent Visits (Offline)
1. App loads from service worker cache (instant!)
2. Data loads from IndexedDB/localStorage
3. Yellow banner shows you're viewing cached data
4. You can still add todos - they're queued

### Coming Back Online
1. Automatic sync of queued actions
2. Fresh data fetched from API
3. Cache updated with latest data
4. Toast notification confirms sync

## Testing Offline Mode

### Chrome DevTools
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" in the throttling dropdown
4. Reload the app - it still works!

### Real Network Disconnect
1. Turn off WiFi/disconnect ethernet
2. App continues to function
3. Add todos - they'll sync when reconnected

## Technical Details

- **IndexedDB**: Stores todo data with timestamps
- **localStorage**: Persists React Query cache
- **Service Worker**: Caches static assets and API responses
- **Background Sync**: Queues offline mutations for later sync

## Files Modified/Created

- `src/utils/db.js` - IndexedDB wrapper
- `src/hooks/useOnlineStatus.js` - Network status hook
- `src/hooks/useSyncPendingActions.js` - Auto-sync hook
- `src/services/todo.js` - Enhanced with offline fallback
- `src/pages/TodoList.jsx` - Shows cached data when offline
- `src/pages/AddTodo.jsx` - Queues actions when offline
- `src/main.jsx` - React Query persistence setup
- `src/App.jsx` - Auto-sync integration
