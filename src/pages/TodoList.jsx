
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../services/todo';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const TodoList = () => {
  const isOnline = useOnlineStatus();
  
  const { data, error, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 24 * 60 * 60 * 1000, // 24 hours (formerly cacheTime)
    retry: 1,
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  
  if (error && !data) {
    return (
      <div className="text-center p-4">
        <div className="text-red-600 mb-2">Unable to load todos</div>
        <div className="text-sm text-gray-600">
          {!isOnline ? 'You are offline and no cached data is available.' : error.message}
        </div>
      </div>
    );
  }

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleString() : 'Unknown';

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="text-sm">
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      
      {!isOnline && data && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded mb-4 text-sm">
          Showing cached data from {lastUpdated}
        </div>
      )}

      <ul className="space-y-2">
        {data?.map((todo) => (
          <li key={todo.id} className="p-3 bg-gray-50 rounded flex items-center">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              readOnly 
              className="mr-3"
            />
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
      
      {data?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No todos found.</p>
      )}
    </div>
  );
};

export default TodoList;
