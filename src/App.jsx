
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
