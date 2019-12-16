import { Controller } from "egg";
import { ApiResponseCode } from "../response/responseCode";
import { ApiResponseMsg } from "../response/responseMsg";
import { verifyMobile } from "../utils/verify";
import { createRandomNum } from "../utils/random";

export default class SmsController extends Controller {
  public async sendMessage() {
    const { ctx } = this;

    const body: {
      mobile: string;
    } = ctx.request.body;

    if (!body.mobile || !verifyMobile(body.mobile)) {
      return ctx.fail(
        ApiResponseCode.PARAMS_ERROR,
        ApiResponseMsg.MOBILE_ERROR
      );
    }

    const count = await ctx.service.sms.countByMobile(body.mobile);

    if (count > this.config.sms.countByMobile) {
      return ctx.fail(
        ApiResponseCode.RESOURCE_LIMTI,
        ApiResponseMsg.SMS_OVER.replace(
          "&",
          this.config.sms.countByMobile.toString()
        ) as ApiResponseMsg
      );
    }

    if (ctx.ip) {
      const ipCount = await ctx.service.sms.countByIp(ctx.ip);

      if (ipCount > this.config.sms.countByIp) {
        return ctx.fail(
          ApiResponseCode.RESOURCE_LIMTI,
          ApiResponseMsg.SMS_OVER.replace(
            "&",
            this.config.sms.countByMobile.toString()
          ) as ApiResponseMsg
        );
      }
    }

    // 生成随机验证码
    const code = createRandomNum(999999, 100000);

    const doc = await ctx.service.sms.sendVerifyCode(body.mobile, code, ctx.ip);

    if (!doc) {
      return ctx.fail(
        ApiResponseCode.SERVER_ERROR,
        ApiResponseMsg.SMS_SND_ERROR
      );
    }

    return ctx.fail(ApiResponseCode.SERVER_ERROR, ('验证码为:' + code ) as ApiResponseMsg)

    // return ctx.success();
  }
}
