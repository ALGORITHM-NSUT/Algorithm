import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=technology&apiKey=9f5a8ba0c088414aa14c69daf44fe18d`
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className='flex flex-col items-center min-h-screen text-white py-10 w-full bg-polygon bg-cover bg-center  bg-no-repeat'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
        {news
          .filter(article => article.title !== '[Removed]')
          .map((article, index) => (
            <div
              key={index}
              className='bg-[#232a3b] rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105'
            >
              <a
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  className='w-full h-48 object-cover'
                  src={article.urlToImage || 'https://via.placeholder.com/300'}
                  alt='News'
                  loading='lazy'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold mb-2'>{article.title}</h3>
                  <p className='text-sm text-gray-300 mb-4'>{article.description}</p>
                </div>
              </a>

            </div>
          ))}
      </div>
    </div>
  );
};

export default Articles;
