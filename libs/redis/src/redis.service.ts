import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('redis') private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expire: number): Promise<string | null> {
    return this.redis.set(key, value, 'EX', expire);
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async getJSON(key: string): Promise<any> {
    const valueStr = await this.redis.get(key);

    if (valueStr === null) return valueStr;

    return JSON.parse(valueStr);
  }

  async setJSON(key: string, value: any): Promise<string | null> {
    const valueStr = JSON.stringify(value);

    return this.redis.set(key, valueStr);
  }

  async keys(pattern: string) {
    return this.redis.keys(pattern);
  }

  async expire(key: string, seconds: number): Promise<boolean> {
    const res = await this.redis.expire(key, seconds);

    return !!res;
  }

  async hgetall(key: string) {
    return this.redis.hgetall(key);
  }

  async hget(key: string, field: string): Promise<string | null> {
    return this.redis.hget(key, field);
  }

  async hset(key: string, field: string, value: string): Promise<number> {
    return this.redis.hset(key, field, value);
  }

  async hdel(key: string) {
    return this.redis.hdel(key);
  }

  async hexists(key: string, field: string): Promise<boolean> {
    const res = await this.redis.hexists(key, field);

    return !!res;
  }
}
