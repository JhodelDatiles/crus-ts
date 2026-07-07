import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Upstash Redis client
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Create a new rate limiter that allows 10 requests per 10 seconds
export const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "30 s"),
  analytics: true, // Optional: tracking via Upstash dashboard
  prefix: "@upstash/ratelimit",
});