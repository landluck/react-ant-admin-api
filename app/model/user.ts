import { Context } from 'egg';
import { Model, DataTypes } from 'sequelize';
import { BaseModel, BaseModelProps, BaseModelStatic } from '../core/model';
import role from './role';

export interface User extends BaseModel, Model {
  id: number;

  name: string;

  account: string;

  password: string;

  avatar?: string | null;

  mobile: string;

  roleId: number;

  status: number;
}

export default (app: Context) => {
  const sequelize = app.model;

  const UserModel = sequelize.define('uvs_user',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '用户id',
      },
      name: {
        type: DataTypes.STRING(8),
        comment: '用户名称',
      },
      account: {
        type: DataTypes.STRING(16),
        comment: '用户账号',
      },
      avatar: {
        type: DataTypes.STRING(100),
        comment: '用户头像',
      },
      password: {
        type: DataTypes.CHAR(32),
        comment: '用户密码',
      },
      mobile: {
        type: DataTypes.CHAR(11),
        defaultValue: '',
        comment: '用户手机号',
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
        comment: '角色id',
      },
      status: {
        type: DataTypes.TINYINT({ length : 1 }).UNSIGNED,
        defaultValue: 1,
        comment: '角色状态：1 正常 0 禁用',
      },

      // 注入基本model的配置
      ...BaseModelProps,
    },
    {
      indexes: [{ fields: [ 'mobile' ] }, { fields: [ 'account' ] }, { fields: [ 'role_id' ] }],
    },
  ) as BaseModelStatic<User>;

  UserModel.belongsTo(role(app), {
    // 不创建外健
    constraints: false,
    // 指定关联id
    targetKey: 'id',
    as: 'role',
  });

  // UserModel.sync({force: true}).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })

  return UserModel;
};
