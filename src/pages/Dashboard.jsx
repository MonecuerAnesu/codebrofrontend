import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== 'socialmediametaplatform@gmail.com') {
        navigate('/login');
      } else {
        setUser(user);
        fetchPortfolio();
      }
    };
    checkUser();
  }, []);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
    } else {
      setPortfolio(data);
    }
  };

  const handleFetchNews = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await axios.get('https://codebro-backend.onrender.com/api/auto-news/fetch');
      setMessage(`Fetched and inserted ${res.data.inserted} news articles.`);
    } catch (error) {
      setMessage('Failed to fetch news.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, imageUrl) => {
    const confirm = window.confirm('Are you sure you want to delete this portfolio item?');
    if (!confirm) return;

    const fileName = imageUrl.split('/').pop();
    const { error: storageError } = await supabase
      .storage
      .from('portfolio-images')
      .remove([`portfolio/${fileName}`]);

    if (storageError) {
      console.error('Storage error:', storageError);
      setMessage('Failed to delete image.');
      return;
    }

    const { error: dbError } = await supabase
      .from('portfolio')
      .delete()
      .eq('id', id);

    if (dbError) {
      console.error('DB error:', dbError);
      setMessage('Failed to delete portfolio item.');
    } else {
      setMessage('Portfolio item deleted.');
      fetchPortfolio();
    }
  };

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="mb-2 text-gray-300">Welcome, {user?.email}</p>
        <p className="mb-4 text-red-400 font-semibold">
          Only Elshaddai has access to this place. Please do not try.
        </p>

        <button
          onClick={() => navigate('/upload')}
          className="mb-6 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm text-white transition"
        >
          Upload Portfolio
        </button>

        <button
          onClick={handleFetchNews}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Fetching News...' : 'Fetch Latest News'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-yellow-400">{message}</p>
        )}

        <h2 className="mt-10 text-2xl font-semibold">Uploaded Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {portfolio.length === 0 ? (
            <p className="text-gray-400">No portfolio items found.</p>
          ) : (
            portfolio.map((item) => (
              <div key={item.id} className="bg-gray-800 p-4 rounded shadow">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm underline block mt-1"
                  >
                    Visit
                  </a>
                )}
                <button
                  onClick={() => handleDelete(item.id, item.image_url)}
                  className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 text-sm rounded"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
