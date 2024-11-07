import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = ({news}) => {
 

  

  // Render articles
  const renderArticles = () => (
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
                src={article.image || 'https://via.placeholder.com/300'}
                alt={article.title}
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
  );

  return (
    <div className='flex flex-col items-center min-h-screen py-10 w-full text-white'>
      <h1 className='text-[10vw] md:text-[100px] font-bold mb-10 font-mono mx-3'>Latest Technology News</h1>
      {renderArticles()}
    </div>
  );
};

export default Articles;
