import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user || user.email !== 'socialmediametaplatform@gmail.com') {
        navigate('/login');
      } else {
        setUser(user);
      }
    };

    checkUser();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-300 mb-2">Welcome, {user?.email}</p>

      <div className="grid grid-cols-1 gap-4 mt-6">
        <button
          onClick={() => navigate('/upload')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
        >
          Upload Portfolio
        </button>
        <button
          onClick={() => navigate('/portfolio')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          View Portfolio
        </button>
        <button
          onClick={() => navigate('/news')}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
        >
          View News Feed
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
