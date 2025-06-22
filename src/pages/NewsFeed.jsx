import { useEffect, useState } from 'react';
import axios from 'axios';

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // ✅ Uses environment variable

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines`,
          {
            params: {
              country: 'us',
              category: 'technology',
              pageSize: 10,
              apiKey: apiKey
            }
          }
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error('❌ Failed to fetch news:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-400">
        Latest Tech News
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin h-10 w-10 border-t-2 border-b-2 border-white rounded-full" />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-gray-400 text-center">No news available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 hover:bg-gray-700 transition rounded-lg p-4 shadow"
            >
              <img
                src={article.urlToImage || '/ChatGPT-Logo.png'}
                alt={article.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-400">
                {article.description?.slice(0, 100) || 'No description'}...
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
// This code fetches the latest technology news from the News API and displays it in a grid format.
// It uses React hooks for state management and Axios for making HTTP requests.