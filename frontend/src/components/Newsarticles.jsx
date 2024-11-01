import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const cachedNews = sessionStorage.getItem('newsData');

      if (cachedNews) {
        setNews(JSON.parse(cachedNews));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=technology&apiKey=9f5a8ba0c088414aa14c69daf44fe18d`
          );
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

  return (
    <div className='flex flex-col items-center min-h-screen py-10 w-full text-white'>
      <h1 className='text-3xl font-bold mb-8'>Latest Technology News</h1>

      {loading ? (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-75'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4 w-full max-w-7xl'>
          {news
            .filter(article => article.title !== '[Removed]')
            .map((article, index) => (
              <div
                key={index}
                className='bg-[#1e293b] rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105'
              >
                <a
                  href={article.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex flex-col h-full'
                >
                  <img
                    className='w-full h-48 object-cover rounded-t-xl'
                    src={article.urlToImage || 'https://via.placeholder.com/300'}
                    alt='News'
                    loading='lazy'
                  />
                  <div className='p-6 flex flex-col justify-between flex-grow'>
                    <h3 className='text-xl font-semibold mb-2'>{article.title}</h3>
                    <p className='text-sm text-gray-400 mb-4'>{article.description}</p>
                    <span className='text-sm text-blue-400 font-semibold'>Read More</span>
                  </div>
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
