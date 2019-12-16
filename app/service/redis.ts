import { Service } from 'egg';
import ApiException from '../exception/ApiException';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';

const SUCCESS_REDIS = 'OK';

export default class Redis extends Service {

  public async set (key: string, value: string): Promise<boolean> {
    const docs = await this.app.redis.set(key, value);

    if (docs === SUCCESS_REDIS) {

      return true;
    }

    this.app.logger.info('redis 储存错误 ------> error', docs);

    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async setex (key: string, value: string, expire: number): Promise<boolean> {
    const docs = await this.app.redis.setex(key, expire, value);

    if (docs === SUCCESS_REDIS) {

      return true;
    }

    this.app.logger.info('redis 储存错误 ------> error', docs);

    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async get (key: string) {
    return await this.app.redis.get(key);
  }

  public async setMap (key: string, value: any) {
    const docs = await this.app.redis.hmset(key, value);

    // 这里 redis 返回的是 ok
    // 但是 ioredis 申明的类型是 Number
    // @ts-ignore
    if (docs === SUCCESS_REDIS) {

      return true;
    }

    this.app.logger.info('redis 储存错误 ------> error', docs);

    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async getMap<T> (key: string): Promise<T | null> {
    const data = await this.app.redis.hgetall(key);

    return data;
  }
}
