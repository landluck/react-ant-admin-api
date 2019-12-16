import { Context } from "egg";
import BaseService from "../core/service";
import { Sms } from "../model/sms";
import SqlUtils from '../utils/sql';
import { Op } from "sequelize";
export default class SmsService extends BaseService<Sms> {
  constructor(ctx: Context) {
    super(ctx);

    this.model = ctx.model.Sms;
  }

  public async countByMobile(mobile: string) {

    const count = await this.ctx.model.Sms.count({
      where: {
        mobile,
        createdAt: {
          [Op.gte]: new Date()
        }
      }
    });

    return count;
  }

  public async countByIp(ip: string) {
    const count = await this.ctx.model.Sms.count({
      where: {
        ip,
        createdAt: {
          [Op.gte]: new Date()
        }
      }
    });

    return count;
  }

  public async sendVerifyCode(mobile: string, code: number, ip: string) {
    const config = this.config.sms.verifyCode;

    // const bizId = await this.ctx.service.aliyunSms.sendVerifyCode(
    //   mobile,
    //   code,
    //   config.signName,
    //   config.templateCode
    // );

    // if (!bizId) return null;

    const record = await this.ctx.model.Sms.create({
      mobile,
      code,
      ip,
      bizId: '',
      content: "",
      tid: config.templateCode
    });

    return record
  }

  public async findCodeByMobileAndCode(mobile: string, code: number): Promise<Sms | null> {

    const message = await this.ctx.model.Sms.findOne({
      where: {
        mobile,
        code,
      },
      ...SqlUtils.queryOptions()
    })

    if (message) {
      return message.get({ plain: true }) as Sms
    }
    return null
  }
}
