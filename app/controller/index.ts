import { Controller } from 'egg';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';
import ApiException from '../exception/ApiException';

export default class HomeController extends Controller {
  public async queryList() {
    // const { ctx } = this;

    // ctx.body = await ctx.service.task.queryTask();
    console.log('ff');
    // ctx.success({ a: 1, b: 2 });
    throw new ApiException(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
    // ctx.fail(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }
}
