
import { Link } from 'react-router-dom';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useState, useEffect } from 'react';
import { getPendingActions } from '../utils/db';

const Navbar = () => {
  const isOnline = useOnlineStatus();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const checkPending = async () => {
      try {
        const pending = await getPendingActions();
        setPendingCount(pending.length);
      } catch (error) {
        console.error('Failed to check pending actions:', error);
      }
    };

    checkPending();
    const interval = setInterval(checkPending, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/todos" className="text-white hover:text-gray-300">Todo List</Link>
          </li>
          <li>
            <Link to="/add-todo" className="text-white hover:text-gray-300">Add Todo</Link>
          </li>
        </ul>
        
        <div className="flex items-center space-x-3">
          {pendingCount > 0 && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              {pendingCount} pending
            </span>
          )}
          <div className="flex items-center text-white text-sm">
            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
