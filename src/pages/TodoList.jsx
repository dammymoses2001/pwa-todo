
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../services/todo';

const TodoList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <ul className="list-disc pl-5">
        {data.map((todo) => (
          <li key={todo.id} className="mb-2">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
