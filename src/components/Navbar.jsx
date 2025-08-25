
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link to="/todos" className="text-white">Todo List</Link>
        </li>
        <li>
          <Link to="/add-todo" className="text-white">Add Todo</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
