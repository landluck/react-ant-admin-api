import { Service } from 'egg';
import { BaseModelStatic } from './model';
import SqlUtils from '../utils/sql';
import { Model, FindAndCountOptions, WhereAttributeHash } from 'sequelize';
import { PageParams, PageInfo } from '../../typings';
import Page from '../utils/page';

/**
 * BaseService service 基础类, 提供四个基础方法
 * 提供基础方法
 *
 *
 * 需要在每个继承该基础 service 的类构造函数中，指定 model 为当前 service 的 model
 */

export default class BaseService<T extends Model> extends Service {
  model: BaseModelStatic<T>;

  public async findById(id: number): Promise<T | null> {

    const model = await this.model.findOne({
      ...SqlUtils.queryOptions(),
      where: {
        id,
      },
    });

    if (model) {
      return model.get({ plain: true }) as T;
    }

    return null;
  }

  public async findListByKey(
    where: { [key in keyof T]?: T[key] },
    pageParams: PageParams,
    options?: FindAndCountOptions,
  ): Promise<{ list: T[]; page: PageInfo }> {
    const page = new Page(pageParams);

    const { rows, count } = await this.model.findAndCountAll({
      where: where as WhereAttributeHash,
      ...SqlUtils.queryOptions(),
      ...page.buildOptions(),
      ...options,
    });

    page.setTotal(count);

    return {
      list: rows,
      page: page.getData(),
    };
  }

  public async removeById(id: number): Promise<boolean> {
    const result = await this.model.destroy({
      where: {
        id,
      },
    });
    console.log(result);

    if (result === 1) {
      return true;
    }

    return false;
  }

  public async updateById(
    instance: { [key in keyof T]?: T[key] } & { id?: number },
    id: number,
  ): Promise<boolean> {
    // 删除数据中原有的id
    if (instance.id) {
      delete instance.id;
    }

    // 这里的 ctx.user 是全局挂载到 ctx 的用户信息

    const [ result ] = await this.model.update(
      SqlUtils.updateOptions<T>(instance as T, this.ctx.user),
      {
        where: {
          id,
        },
      },
    );

    if (result === 1) {
      return true;
    }

    return false;
  }

  public async createInstance(
    instance: { [key in keyof T]?: T[key] },
  ): Promise<T> {
    const model = await this.model.create(
      SqlUtils.createOptions<T>(instance as T, this.ctx.user),
    );

    return model.get({ plain: true }) as T;
  }
}
