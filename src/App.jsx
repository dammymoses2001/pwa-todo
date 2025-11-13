
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useSyncPendingActions } from './hooks/useSyncPendingActions';

function App() {
  const isOnline = useOnlineStatus();
  
  // Automatically sync pending actions when coming back online
  useSyncPendingActions(isOnline);

  return (
    <div>
      <Toaster position="top-right" />
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
