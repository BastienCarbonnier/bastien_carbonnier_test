import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import Redis from 'ioredis';

require('dotenv').config()

const app = express();

const redisClient = new Redis({ host: process.env.REDIS_CONTAINER });
const redisPublish = new Redis({ host: process.env.REDIS_CONTAINER });
const redisSubscribe = new Redis({ host: process.env.REDIS_CONTAINER });

const CACHE_EXPIRATION_TIME = 600; // 10 minutes
const REDIS_CHANNEL = 'geo_lru_channel';

app.use(bodyParser.json());


app.post('/write', async (req: Request, res: Response) => {
  try {
    const { key, value }: CacheData = req.body;

    // Set data in the cache with a specific expiration time
    await redisClient.setex(key, CACHE_EXPIRATION_TIME, JSON.stringify(value));

    // Replicate the data to other regions using Redis Pub/Sub
    await redisPublish.publish(REDIS_CHANNEL, JSON.stringify({ [key]: value }));

    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error });
  }
});

app.get('/read', async (req: Request, res: Response) => {
  try {
    const key = req.query.key as string;

    // Check if the data is available in the local cache
    const value = await redisClient.get(key);

    if (value !== null) {
      res.status(200).json({ "value": JSON.parse(value) });
    } else {
      res.status(404).json({ status: 'not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

// Redis Pub/Sub listener for real-time replication
redisSubscribe.subscribe(REDIS_CHANNEL);
redisSubscribe.on('message', async (channel, message) => {
  const data: any = JSON.parse(message);
  const key = Object.keys(data)[0];

  // Set the replicated data in the local cache
  await redisClient.setex(key, CACHE_EXPIRATION_TIME, JSON.stringify(data[key]));
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
