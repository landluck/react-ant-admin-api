import { Context } from "egg";
import BaseService from "../core/service";
import { Menu } from "../model/menu";
import { MenuSearchQuery } from "../controller/menu";
import { Op, FindAndCountOptions } from "sequelize";
import SqlUtils from "../utils/sql";

export default class MenuService extends BaseService<Menu> {
  constructor(ctx: Context) {
    super(ctx);

    this.model = ctx.model.Menu;
  }

  public async findCascader(ids?: number[]) {
    const where: { id?: any } = {};

    if (ids) {
      where.id = {
        [Op.in]: ids
      };
    }

    const list = await this.ctx.model.Menu.findAll({
      where,
      ...SqlUtils.queryOptions()
    });
    
    for (let i = list.length - 1; i >= 0; i--) {
      const item = list[i].get({ plain: true }) as Menu;
      for (let z = 0; z < list.length; z++) {
        const menu = list[z].get({ plain: true }) as Menu;
        if (item.parentId === menu.id) {
          if (menu.children) {
            // 进行排序
            for (let s = menu.children.length - 1; s >= 0; s--) {
              const child = menu.children[s]
              if (item.sort > child.sort) {
                menu.children.splice(s + 1, 0, item)
                break
              }

              if (s === 0) {
                menu.children.unshift(item)
              }
            }
          } else {
            menu.children = [item];
          }

          list.splice(i, 1);
          break
        }
      }
    }

    list.sort((a, b) => a.sort - b.sort)
    
    return list;
  }

  public async findList(params: MenuSearchQuery) {
    const query: {
      name?: any;
      level?: number;
      parentId?: number;
      id?: number;
      url?: any;
    } = {};

    if (params.name) {
      query.name = {
        [Op.like]: `%${params.name}%`
      };
    }

    if (params.id) {
      query.id = params.id;
    }

    if (params.url) {
      query.url = {
        [Op.like]: `%${params.url}%`
      };
    }

    if (params.level) {
      query.level = params.level;
    }
    if (params.parentId) {
      query.parentId = params.parentId;
    }

    const options: FindAndCountOptions = {
      include: [
        {
          model: this.ctx.model.Menu,
          as: "parent",
          required: false,
          ...SqlUtils.queryOptions()
        }
      ]
    };

    return this.findListByKey(query, params, options);
  }
}
