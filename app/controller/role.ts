import { Controller } from "egg";

export interface RoleSearchParams {
  id?: number
  name?: any
  page?: number
  size?: number
}

export interface RoleMenuParams {
  id: number
}


class RoleController extends Controller {

  public async queryRoleMenu () {
    const { ctx } = this;

    ctx.validate({
      id: /\d+/
    }, ctx.params)

    const { id }: RoleMenuParams = ctx.params

    const data = await ctx.service.role.findRoleMenuByRoleId(id)

    ctx.success(data)
  }

  public async updateRoleMenu () {
    const { ctx } = this;

    ctx.validate({
      menuIds: 'array'
    })

    ctx.validate({
      id: /\d+/
    }, ctx.params)

    const { menuIds }: { menuIds: number[]} = ctx.request.body
    const { id }: { id: string} = ctx.params

    const docs = await ctx.service.role.updateRoleMenuByRoleId(Number(id), menuIds)

    if (docs) {
      return ctx.success()
    }

    ctx.fail()
  }

  public async queryList () {
    const { ctx } = this;

    const query: RoleSearchParams = ctx.query

    const data = await ctx.service.role.findList(query)

    ctx.success(data)
  }


  public async createOne() {
    const { ctx } = this;

    ctx.validate({
      name: "string"
    });

    const data = await this.service.role.createInstance(ctx.request.body);

    if (data) {
      return ctx.success();
    }

    return ctx.fail();
  }

  public async updateOne() {
    const { ctx } = this

    ctx.validate({
      id: 'number',
      name: "string"
    });

    const docs = await this.service.role.updateById(ctx.request.body, ctx.request.body.id);

    if (docs) {
      return ctx.success();
    }

    return ctx.fail();
  }

  public async removeOne() {
    const { ctx } = this;

    ctx.validate(
      {
        id: /\d+/
      },
      ctx.params
    );

    const docs = await this.service.role.removeById(ctx.params.id)

    if (docs) {
      return ctx.success();
    }

    return ctx.fail();
  }
}

export default RoleController;
