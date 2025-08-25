
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../services/todo';
import { useState } from 'react';

const AddTodo = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setTitle('');
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
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </form>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </div>
  );
};

export default AddTodo;
