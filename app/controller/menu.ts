import { Controller } from 'egg';

export interface MenuSearchQuery {
  id?: number;
  url?: string;
  name?: string;
  level?: number;
  parentId?: number;
  page?: number;
  size?: number;
}

class MenuController extends Controller {

  public async queryList() {
    const query: MenuSearchQuery = this.ctx.query;

    const data = await this.service.menu.findList(query);

    this.ctx.success(data);
  }

  public async queryCascader () {

    const data = await this.service.menu.findCascader();

    this.ctx.success(data);
  }

  public async createOne() {
    const { ctx } = this;

    ctx.validate({
      name: 'string',
      icon: 'string',
      url: 'string',
      sort: 'number',
      level: 'number',
      parentId: 'number',
    });

    const data = await this.service.menu.createInstance(ctx.request.body);

    if (data) {
      return ctx.success();
    }

    return ctx.fail();
  }

  public async updateOne() {
    const { ctx } = this;

    ctx.validate({
      id: 'number',
      name: 'string',
      icon: 'string',
      url: 'string',
      sort: 'number',
      parentId: 'number',
      level: 'number',
    });

    const docs = await this.service.menu.updateById(ctx.request.body, ctx.request.body.id);

    if (docs) {
      return ctx.success();
    }

    return ctx.fail();
  }

  public async removeOne() {
    const { ctx } = this;

    ctx.validate(
      {
        id: /\d+/,
      },
      ctx.params,
    );

    const docs = await this.service.menu.removeById(ctx.params.id);

    if (docs) {
      return ctx.success();
    }

    return ctx.fail();
  }
}

export default MenuController;
