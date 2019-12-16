import { Context } from 'egg';
import ApiException from '../exception/ApiException';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';

export default function errHandle(): any {
  return async (ctx: Context, next: () => Promise<any>) => {

    try {
      await next();
    } catch (error) {

      if (error instanceof ApiException) {
        ctx.logger.error(error);

        ctx.fail(error.code, error.message);
        return;
      }

      // 参数校验错误
      if ((error as Error).message === 'Validation Failed') {
        const validation = error.errors[0];

        if (validation) {

          ctx.logger.error(validation);

          return ctx.fail(ApiResponseCode.PARAMS_ERROR, (validation.field + ' ' + validation.message as ApiResponseMsg.SERVER_ERROR));
        }
      }

      ctx.logger.error(error);

      const status = error.status || 500;

      const errMsg = status === 500 ? 'Internal Server Error' : error.message;

      ctx.fail(status, errMsg);

    }
  };
}
