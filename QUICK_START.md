# Quick Start - Offline Todo PWA

## Run the App

```bash
npm run dev
```

## Test Offline Features

### Method 1: Chrome DevTools
1. Open app in browser
2. Press F12 (DevTools)
3. Go to "Network" tab
4. Select "Offline" from throttling dropdown
5. Refresh page - app still works!
6. Try adding a todo - it gets queued
7. Go back "Online" - watch it sync automatically

### Method 2: Application Tab
1. Open DevTools → Application tab
2. Check "Service Worker" - should show active worker
3. Check "IndexedDB" → TodoPWA - see cached data
4. Check "Local Storage" - see React Query cache

## What You'll See

### When Online
- 🟢 Green indicator
- Fresh data from API
- Instant todo creation

### When Offline
- 🔴 Red indicator  
- Yellow banner: "Showing cached data from [timestamp]"
- Blue banner on Add Todo: "You're offline. New todos will be synced..."
- Todos still get added (queued for sync)

### When Back Online
- 🟢 Green indicator returns
- Toast: "Syncing X pending action(s)..."
- Toast: "All changes synced!"
- Fresh data loaded

## Key Features

✅ Works offline on first load (after initial visit)
✅ Caches all API responses automatically
✅ Queues offline actions for later sync
✅ Auto-syncs when connection restored
✅ Visual feedback for all states
✅ No data loss

## Architecture

```
User Action
    ↓
React Query (with persistence)
    ↓
Service (with offline detection)
    ↓
├─ Online → API → Cache to IndexedDB
└─ Offline → Queue to IndexedDB → Sync later
```
