import { Context } from 'egg';
import BaseService from '../core/service';
import { Role } from '../model/role';
import { RoleSearchParams } from '../controller/role';
import { Op, Transaction } from 'sequelize';
import SqlUtils from '../utils/sql';

export default class RoleService extends BaseService<Role> {
  constructor(ctx: Context) {
    super(ctx);

    this.model = ctx.model.Role;
  }

  public async findList(params: RoleSearchParams) {
    const query: RoleSearchParams = {};

    if (params.name) {
      query.name = {
        [Op.like]: `%${params.name}%`,
      };
    }
    if (params.id) {
      query.id = params.id;
    }

    return this.findListByKey(query, params);
  }

  public async findRoleMenuByRoleId(id: number) {
    const data = await this.ctx.model.RoleMenu.findAll({
      where: {
        roleId: id,
      },
      ...SqlUtils.queryOptions(),
      order: [],
    });

    const ids = data.map(item => item.menuId);

    const menuList = await this.ctx.service.menu.findCascader(ids);

    return {
      list: menuList,
      ids,
    };
  }

  public async updateRoleMenuByRoleId(id: number, menuIds: number[]) {
    const data = await this.ctx.model.RoleMenu.findAll({
      where: {
        roleId: id,
      },
      ...SqlUtils.queryOptions(),
    });

    // 查找到原先的存在的ids
    const ids = data.map(item => item.menuId);

    // 要删除的 ids
    const removeIds: number[] = [];
    // 要新建的 ids
    const createIds: number[] = [];

    ids.forEach((id: number, i: number) => {
      const index = menuIds.indexOf(id);
      if (index === -1) {
        // 不存在需要删除,推入该记录的id
        removeIds.push(data[i].id);
        // 存在，删除 menuIds 中的该元素。剩下的即为新建的
      } else {
        menuIds.splice(index, 1);
      }
    });

    createIds.push(...menuIds);

    if (removeIds.length === 0 && createIds.length === 0) return true;

    // 开始事务
    const transaction: Transaction = await this.ctx.model.transaction();
    try {
      await this.ctx.model.RoleMenu.destroy({
        where: {
          id: {
            [Op.in]: removeIds,
          },
        },
        transaction,
      });

      await this.ctx.model.RoleMenu.bulkCreate(
        createIds.map((menuId: number) =>
          SqlUtils.createOptions<{ roleId: number; menuId: number }>(
            { roleId: id, menuId },
            this.ctx.user,
          ),
        ),
        {
          transaction,
        },
      );
      // 提交事务
      await transaction.commit();

      return true;
    } catch (error) {
      this.ctx.logger.info(error);

      // 错误回滚
      await transaction.rollback();

      return false;
    }
  }
}
