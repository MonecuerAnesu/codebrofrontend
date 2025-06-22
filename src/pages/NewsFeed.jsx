import { useEffect, useState } from 'react';
import axios from 'axios';

function NewsFeed(  ) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_NEWS_API_KEY; // ✅ Use .env variable

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&apiKey=${apiKey}`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey])}
