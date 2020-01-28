import { Context } from 'egg';
import { Model, DataTypes } from 'sequelize';
import { BaseModel, BaseModelProps, BaseModelStatic } from '../core/model';

export interface Sms extends BaseModel, Model {
  id?: number;

  userId?: string;

  ip: string;

  bizId: string;

  content: string;

  mobile: string;

  code: number;

  tid: string;
}

export default (app: Context) => {
  const sequelize = app.model;

  const SmsModel = sequelize.define('uvs_sms_log',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '记录id',
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
        comment: '用户id',
      },
      ip: {
        type: DataTypes.STRING(16),
        comment: '用户ip',
      },
      bizId: {
        type: DataTypes.STRING(32),
        comment: '三方流水号',
      },
      content: {
        type: DataTypes.STRING(70),
        comment: '短信发送内容',
      },
      code: {
        type: DataTypes.INTEGER({ length: 6 }).UNSIGNED,
        comment: '短信验证码',
      },
      tid: {
        type:  DataTypes.STRING(16),
        comment: '模版id',
      },
      mobile: {
        type: DataTypes.CHAR(11),
        defaultValue: '',
        comment: '用户手机号',
      },

      // 注入基本model的配置
      ...BaseModelProps,
    },
    {
      indexes: [{ fields: [ 'mobile' ] }],
    },
  ) as BaseModelStatic<Sms>;

  // SmsModel.sync({force: true}).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })

  return SmsModel;
};
