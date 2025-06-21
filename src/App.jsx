import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import NewsFeed from './pages/NewsFeed';
import UploadPortfolio from './pages/UploadPortfolio';
import About from './pages/About'; // ✅ NEW
import supabase from './supabaseClient';

import logo from './assets/ChatGPT-LOGO.png';

// ✅ Landing Page With Real Portfolio + About Button
function LandingPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setItems(data);
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 relative">
      {/* About Me (LEFT) */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/about')}
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded text-sm text-white hover:scale-105 transition"
        >
          About Me
        </button>
      </div>

      {/* Admin Login (RIGHT) */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded text-sm text-white hover:scale-105 transition"
        >
          Admin Login
        </button>
      </div>

      {/* Logo & Title */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={logo}
          alt="CodeBro Logo"
          className="w-28 sm:w-32 md:w-40 mb-4 blur-sm hover:blur-0 transition duration-1000"
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center animate-pulse">
          Welcome to <span className="text-green-400">CodeBro</span>
        </h1>
      </div>

      {/* News Feed Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/news')}
          className="bg-white text-black px-5 py-2 rounded hover:bg-gray-200 transition"
        >
          View News Feed
        </button>
      </div>

      {/* Portfolio Display */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Showcase</h2>
        {items.length === 0 ? (
          <p className="text-gray-400">No projects uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => window.open(item.link_url, '_blank')}
                className="cursor-pointer bg-gray-800 rounded shadow p-4 hover:scale-105 transition"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ App Wrapper with All Routes
function App() {
  const [loading, setLoading] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setLogoVisible(true), 700);
    const timer2 = setTimeout(() => setLoading(false), 1800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white transition-all p-4">
        <img
          src={logo}
          alt="Loading Logo"
          className={`w-32 md:w-40 lg:w-48 mb-6 transition-all duration-1000 ${
            logoVisible ? 'blur-0 opacity-100' : 'blur-md opacity-40'
          }`}
        />
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-sm text-gray-400">Launching CodeBro...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/upload" element={<UploadPortfolio />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/about" element={<About />} /> {/* ✅ New About Route */}
      </Routes>
    </Router>
  );
}

export default App;
