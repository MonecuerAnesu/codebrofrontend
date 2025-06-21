import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news_feed')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        setNews(data);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Updates</h1>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : news.length === 0 ? (
        <p className="text-gray-400 text-center">No news yet.</p>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-300">{item.content}</p>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsFeed;
