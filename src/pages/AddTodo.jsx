
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../services/todo';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AddTodo = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
      toast.success('Todo added successfully!');
    },
    onError: (error) => {
      if (!navigator.onLine) {
        toast.success('Your new todo will be saved automatically when you are back online.');
        setTitle('');
        // Optimistically update the UI until the page is reloaded
        // This is optional and depends on the desired UX
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
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
      <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New todo title"
          disabled={mutation.isPending}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
