import { Context, Service } from "egg";
import Sms = require("@alicloud/pop-core");
import { AliyunSmsConfig } from "../../typings";

interface AliyunResponse {
  BizId: string;
  Code: string;
  Message: string;
  RequestId: string;
}

export default class AliyunService extends Service {
  aliyunSms: Sms;

  options: AliyunSmsConfig;

  constructor(ctx: Context) {
    super(ctx);

    this.options = this.config.sms;

    this.aliyunSms = new Sms({
      accessKeyId: this.options.accessKeyId,
      accessKeySecret: this.options.accessKeySecret,
      endpoint: this.options.endpoint,
      apiVersion: "2017-05-25"
    });
  }

  // 发送验证码
  public async sendVerifyCode(mobile: string, code: number, signName: string, templateId: string) {
    return await this.sendMessage(
      [mobile],
      signName,
      templateId,
      JSON.stringify({
        code: code
      })
    );
  }

  // 基础发送短信函数
  public async sendMessage(
    mobiles: string[],
    signName: string,
    templateId: string,
    templateParam?: string
  ) {


    try {

      const data: AliyunResponse = await this.aliyunSms.request(
        "SendSms",
        {
          RegionId: this.options.regionId,
          PhoneNumbers: mobiles.join(","),
          SignName: signName,
          TemplateCode: templateId,
          TemplateParam: templateParam,
        },
        {
          method: "POST"
        }
      );

      this.ctx.logger.info('阿里云发送短信验证码结果', data)
  
      if (data.Code === "OK") {
        return data.BizId;
      }
  
      return null;
      
    } catch (error) {

      this.ctx.logger.error(error)

      return null
    }
  }
}
