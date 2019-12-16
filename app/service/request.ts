import { Service } from 'egg';
import ApiException from '../exception/ApiException';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';

export default class Request extends Service {
  public async post<T> (url: string, data: any): Promise<T> {

    this.ctx.logger.info('发起POST请求：url ---->', url, ', data 参数 ---->', data);

    const response = await this.app.curl(url, {
      method: 'POST',
      contentType: 'json',
      data,
      dataType: 'json',
    });

    if (response.status === 200) {

      this.ctx.logger.info('POST请求结果: --> 成功 <--- 结果为 ---->', response.data);
      return response.data;
    } else {
      this.ctx.logger.info('POST请求结果 ----> 失败 <--- 结果为', response);
    }

    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async get<T> (url: string): Promise<T> {

    this.ctx.logger.info('发起GET请求：url ---->', url);

    const response = await this.app.curl(url, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
    });

    if (response.status === 200) {
      this.ctx.logger.info('GET请求结果: --> 成功 <--- 结果为 ---->', response.data);
      return response.data;
    } else {
      this.ctx.logger.info('GET请求结果 ----> 失败 <--- 结果为', response);
    }

    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }
}
