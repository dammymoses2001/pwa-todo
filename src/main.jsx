import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import App from './App';
import HomePage from './pages/HomePage';
import TodoList from './pages/TodoList';
import AddTodo from './pages/AddTodo';
import './index.css';
import { initDB } from './utils/db';

// Initialize IndexedDB
initDB().catch(console.error);

// Create query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create persister for React Query cache
const persister = createSyncStoragePersister({
  storage: window.localStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'todos',
        element: <TodoList />,
      },
      {
        path: 'add-todo',
        element: <AddTodo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistQueryClientProvider 
      client={queryClient} 
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  </React.StrictMode>
);

// Service worker registration (handled by vite-plugin-pwa)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.ready.then(() => {
      console.log('Service Worker is ready');
    });
  });
}
