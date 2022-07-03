import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import cacheConfig from '@config/cache';

export default async function rateLimit(req: Request, res: Response, next: NextFunction) {
  try {
    const redisClient = new Redis(cacheConfig.config.redis);

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 1,
      duration: 1,
    });

    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many request', 429);
  }
}
