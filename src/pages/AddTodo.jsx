
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../services/todo';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { addPendingAction } from '../utils/db';

const AddTodo = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const isOnline = useOnlineStatus();

  const mutation = useMutation({
    mutationFn: async (todo) => {
      if (!isOnline) {
        // Queue the action for later sync
        await addPendingAction({
          type: 'addTodo',
          data: todo,
        });
        return { ...todo, id: Date.now(), queued: true };
      }
      return addTodo(todo);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
      
      if (data.queued) {
        toast.success('Todo queued! Will sync when online.', { icon: '📥' });
      } else {
        toast.success('Todo added successfully!');
      }
    },
    onError: (error) => {
      toast.error(`Failed to add todo: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate({ title, completed: false });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Add Todo</h1>
        <div className="text-sm">
          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </div>
      
      {!isOnline && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded mb-4 text-sm">
          You're offline. New todos will be synced when you're back online.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter todo title"
            disabled={mutation.isPending}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
