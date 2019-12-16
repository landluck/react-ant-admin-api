import { Context, EggAppConfig } from 'egg';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';
import { User } from '../model/user';

export default function auth(options: EggAppConfig): any {
  return async (ctx: Context, next: () => Promise<any>) => {

    if ((options.url as Set<string>).has(ctx.url)) {
      await next();
    } else {
      const token = ctx.header.token;

      if (!token) {
        return ctx.fail(ApiResponseCode.NO_TOKEN, ApiResponseMsg.NO_TOKEN);
      }

      const userId = await ctx.service.redis.get(token);

      if (!userId) {
        return ctx.fail(ApiResponseCode.TOKEN_ERROR, ApiResponseMsg.TOKEN_ERROR);
      }

      const user = await ctx.service.redis.getMap<User>(userId);

      if (!user) {
        return ctx.fail(ApiResponseCode.TOKEN_ERROR, ApiResponseMsg.TOKEN_ERROR);
      }

      ctx.user = user;

      await next();
    }

  };
}
