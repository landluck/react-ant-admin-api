import { Context } from "egg";
import { Model, DataTypes } from "sequelize";
import { BaseModel, BaseModelProps, BaseModelStatic } from "../core/model";

export interface Menu extends BaseModel, Model {
  id?: number;

  name: string;

  url: string;

  icon: string;

  desc: string;

  sort: number;

  parentId: number;

  level: number;
  
  children?: Menu[];
}

export default (app: Context) => {
  const sequelize = app.model;

  const MenuModel = sequelize.define("uvs_sys_menu", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      comment: "菜单id"
    },
    name: {
      type: DataTypes.STRING(5),
      comment: "菜单名称"
    },
    url: {
      type: DataTypes.STRING(32),
      comment: "菜单地址"
    },
    icon: {
      type: DataTypes.STRING(16),
      comment: "菜单icon"
    },
    desc: {
      type: DataTypes.STRING(16),
      comment: "菜单描述"
    },
    sort: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      comment: "菜单排序"
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      comment: "父级菜单id"
    },
    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      comment: "菜单等级"
    },

    // 注入基本model的配置
    ...BaseModelProps
  }, {
    indexes: [ { fields: ['parent_id'] } ]
  }) as BaseModelStatic<Menu>;
  
  MenuModel.belongsTo(MenuModel, {
    // 不创建外健 
    constraints: false,
    // 指定关联id
    targetKey: 'id',
    as: 'parent'
  })


  // MenuModel.sync({force: true}).then(res => {
  //   console.log(res)
  // }).catch(err => {
  //   console.log(err)
  // })

  return MenuModel;
};
