
import { Context } from 'egg';
import { User } from '../model/user';
import SqlUtils from '../utils/sql';

import BaseService from '../core/service';
import { UserSearchParams } from '../controller/user';
import { Op, FindAndCountOptions } from 'sequelize';

export default class UserService extends BaseService<User> {

  constructor (ctx: Context) {
    super(ctx);

    this.model = ctx.model.User;
  }

  public async findList(params: UserSearchParams) {
    const query: UserSearchParams = {};

    if (params.name) {
      query.name = {
        [Op.like]: `%${params.name}%`,
      };
    }
    if (params.id) {
      query.id = params.id;
    }

    if (params.account) {
      query.account = {
        [Op.like]: `%${params.account}%`,
      };
    }

    if (params.mobile) {
      query.mobile = {
        [Op.like]: `%${params.mobile}%`,
      };
    }

    const options: FindAndCountOptions = {
      include: [
        {
          model: this.ctx.model.Role,
          required: false,
          as: 'role',
          ...SqlUtils.queryOptions(),
        },
      ],
    };

    return this.findListByKey(query, params, options);
  }

  public async findUserByAccount(account: string): Promise<User | null> {

    const user = await this.ctx.model.User.findOne({
      where: {
        account,
      },
      ...SqlUtils.queryOptions(),
    });

    if (user) {
      return user.get({ plain: true }) as User;
    }
    return null;
  }

  public async findUserByMobile(mobile: string): Promise<User | null> {

    const user = await this.ctx.model.User.findOne({
      where: {
        mobile,
      },
      ...SqlUtils.queryOptions(),
    });

    if (user) {
      return user.get({ plain: true }) as User;
    }
    return null;
  }

}
