import { Context } from 'egg';
import { Model, DataTypes } from 'sequelize';
import { BaseModel, BaseModelProps, BaseModelStatic } from '../core/model';

export interface RoleMenu extends BaseModel, Model {
  id: number;

  roleId: number;

  menuId: number;
}

export default (app: Context) => {
  const sequelize = app.model;

  const RoleMenuModel = sequelize.define('uvs_sys_role_menu',
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '记录id',
      },
      roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '角色id',
      },
      menuId: {
        type: DataTypes.INTEGER.UNSIGNED,
        comment: '菜单id',
      },
      // 注入基本model的配置
      ...BaseModelProps,
    },
    {
      indexes: [{ fields: [ 'role_id' ] }, { fields: [ 'menu_id' ] }],
    },
  ) as BaseModelStatic<RoleMenu>;

  // RoleMenuModel.sync({force: true}).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })

  return RoleMenuModel;
};
