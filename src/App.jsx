import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import NewsFeed from './pages/NewsFeed';
import UploadPortfolio from './pages/UploadPortfolio';

import logo from './assets/ChatGPT-LOGO.png'; // replace with your CodeBro logo

// ✅ New Landing Page Component
function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      {/* Admin Login Button in top right */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-2 rounded text-sm text-white hover:scale-105 transition"
        >
          Admin Login
        </button>
      </div>

      {/* Logo + Welcome Title */}
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

      {/* Portfolio Preview */}
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Showcase</h2>
        {/* Embed Portfolio content here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* Fake items for now — replace with real fetched data */}
          <div className="bg-gray-800 rounded shadow p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Portfolio Item"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">Project One</h3>
            <p className="text-sm text-gray-400">Cool description of your project here.</p>
          </div>
          <div className="bg-gray-800 rounded shadow p-4">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Portfolio Item"
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">Project Two</h3>
            <p className="text-sm text-gray-400">Showcasing features and links.</p>
          </div>
          {/* You can add more items here */}
        </div>
      </div>
    </div>
  );
}

// ✅ Main App Component
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
      </Routes>
    </Router>
  );
}

export default App;
