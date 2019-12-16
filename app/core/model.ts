import { DataTypes, Model, BuildOptions } from 'sequelize'

export interface BaseModel {

  // 创建者
  creator: string;

  // 修改者
  modifier: string;

  // 创建时间
  readonly createdAt: Date;
  // 修改时间
  readonly updatedAt: Date;
}

export type BaseModelStatic<T> = typeof Model & (new (values?: object, options?: BuildOptions) => T);


export const BaseModelProps = {

  // 创建者
  creator: {
    type: DataTypes.STRING(16)
  },

  // 修改者
  modifier: {
    type: DataTypes.STRING(16)
  }
}
