import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Articles from '../components/Newsarticles';
import FloatingBackground from './FloatingBackground';
import Loader from '../components/Loader';

const Tech_news = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const cachedNews = sessionStorage.getItem('newsData');

      if (cachedNews) {
        setNews(JSON.parse(cachedNews));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(import.meta.env.VITE_NEWS_URL);
          const articles = response.data.articles;
          setNews(articles);
          sessionStorage.setItem('newsData', JSON.stringify(articles));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching news:', error);
          setLoading(false);
        }
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <FloatingBackground />
        <Articles news={news} /> 
      </div>

    </div>
  );
};

export default Tech_news;
