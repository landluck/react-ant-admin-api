import { Context } from 'egg';
import { Model, DataTypes } from 'sequelize';
import { BaseModel, BaseModelProps, BaseModelStatic } from '../core/model';


export interface Role extends BaseModel, Model {
  id: number;

  name: string;
}



export default (app: Context) => {
  const sequelize = app.model;

  const RoleModel = sequelize.define('uvs_sys_role',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '角色id',
      },
      name: {
        type: DataTypes.STRING(12),
        comment: '角色名称',
      },
      // 注入基本model的配置
      ...BaseModelProps
    }
  ) as BaseModelStatic<Role>;

  // RoleModel.sync({force: true}).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })

  return RoleModel;
};
