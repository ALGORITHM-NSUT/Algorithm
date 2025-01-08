import Bull from 'bull';
// import redisClient from './redisClient.js';  
import dotenv from 'dotenv';
console.log("inside queue.js")
dotenv.config();

const {REDIS_URL, REDIS_PORT, REDIS_TOKEN} = process.env;
const redisOptions = {
  redis: {
    host: process.env.REDIS_URL,
    post: process.env.REDIS_PORT,
    password: process.env.REDIS_TOKEN || undefined, 
  },
}
const fetchQueue = new Bull('fetch', redisOptions);

// Log when the queue is ready
fetchQueue.on('ready', () => {
  console.log('FetchQueue is ready');
});

// Log errors from the queue
fetchQueue.on('error', (error) => {
  console.error('Error in FetchQueue:', error);
});

console.log("outside queue.js")


export default fetchQueue;
