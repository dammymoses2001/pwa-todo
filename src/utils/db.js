// IndexedDB wrapper for offline data persistence
const DB_NAME = 'TodoPWA';
const DB_VERSION = 1;
const STORE_NAME = 'todos';
const PENDING_STORE = 'pendingActions';

let db = null;

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Create todos store
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // Create pending actions store for offline operations
      if (!database.objectStoreNames.contains(PENDING_STORE)) {
        const pendingStore = database.createObjectStore(PENDING_STORE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        pendingStore.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };
  });
};

// Save todos to IndexedDB
export const saveTodosToCache = async (todos) => {
  if (!db) await initDB();
  
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  // Clear existing todos
  await store.clear();
  
  // Add all todos with timestamp
  todos.forEach(todo => {
    store.put({ ...todo, timestamp: Date.now() });
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// Get todos from IndexedDB
export const getTodosFromCache = async () => {
  if (!db) await initDB();
  
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Add pending action (for offline operations)
export const addPendingAction = async (action) => {
  if (!db) await initDB();
  
  const transaction = db.transaction([PENDING_STORE], 'readwrite');
  const store = transaction.objectStore(PENDING_STORE);
  
  const actionWithTimestamp = {
    ...action,
    timestamp: Date.now()
  };
  
  const request = store.add(actionWithTimestamp);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get all pending actions
export const getPendingActions = async () => {
  if (!db) await initDB();
  
  const transaction = db.transaction([PENDING_STORE], 'readonly');
  const store = transaction.objectStore(PENDING_STORE);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Clear pending action after successful sync
export const clearPendingAction = async (id) => {
  if (!db) await initDB();
  
  const transaction = db.transaction([PENDING_STORE], 'readwrite');
  const store = transaction.objectStore(PENDING_STORE);
  const request = store.delete(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Clear all pending actions
export const clearAllPendingActions = async () => {
  if (!db) await initDB();
  
  const transaction = db.transaction([PENDING_STORE], 'readwrite');
  const store = transaction.objectStore(PENDING_STORE);
  const request = store.clear();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
