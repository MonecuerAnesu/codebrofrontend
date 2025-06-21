import { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching portfolio:', error.message);
      } else {
        setItems(data);
      }

      setLoading(false);
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 animate-fade-in-down">CodeBro Portfolio</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-400"></div>
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">My Work</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transform transition"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Portfolio;
