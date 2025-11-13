
import axios from 'axios';
import { getTodosFromCache, saveTodosToCache } from '../utils/db';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    const todos = response.data.slice(0, 20); // Limit to 20 for demo
    
    // Cache the response for offline use
    await saveTodosToCache(todos);
    
    return todos;
  } catch (error) {
    // If offline or network error, return cached data
    if (!navigator.onLine || error.code === 'ERR_NETWORK') {
      console.log('Offline: Loading from cache');
      const cachedTodos = await getTodosFromCache();
      if (cachedTodos.length > 0) {
        return cachedTodos;
      }
    }
    throw error;
  }
};

export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};
