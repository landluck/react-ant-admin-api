import { Controller } from "egg";
import { ApiResponseCode } from "../response/responseCode";
import { ApiResponseMsg } from "../response/responseMsg";
import { encodeUserPwd, createToken } from "../utils/user";
import { User } from "../model/user";
import ApiDate from "../constants/date";
import UserConstants from "../constants/user";
import { verifyMobile, verifyCode } from "../utils/verify";
import { Sms } from "../model/sms";

interface UserLoginBody {
  account: string;
  password: string;
}

interface UserLoginMobileBody {
  mobile: string;
  code: string;
}

interface UpdateUserPwdBody {
  mobile: string;
  code: number;
  password: string;
}

export interface UserSearchParams {
  id?: number;
  name?: any;
  account?: any;
  mobile?: any;
  page?: number;
  size?: number;
}

class UserController extends Controller {
  public async queryList() {
    const { ctx } = this;

    const query: UserSearchParams = ctx.query;

    const data = await ctx.service.user.findList(query);

    ctx.success(data);
  }

  public async login() {
    const { ctx } = this;

    ctx.validate({
      account: "string",
      password: "string"
    });

    const body: UserLoginBody = ctx.request.body;

    const user = await ctx.service.user.findUserByAccount(body.account);

    if (!user) {
      return ctx.fail(
        ApiResponseCode.USER_NOT_FOUND,
        ApiResponseMsg.USER_NOT_FOUND
      );
    }

    if (user.status === UserConstants.UNAVAILABLE) {
      return ctx.fail(
        ApiResponseCode.USER_UNAVAILABLE,
        ApiResponseMsg.USER_UNAVAILABLE
      );
    }

    const pwd = encodeUserPwd(body.password);

    ctx.logger.info(pwd);

    if (pwd !== user.password) {
      return ctx.fail(
        ApiResponseCode.USER_ERROR,
        ApiResponseMsg.USER_PWD_ERROR
      );
    }

    const token = createToken(user.id);

    const docs = await ctx.service.redis.setex(
      token,
      user.id.toString(),
      ApiDate.ONE_DAY_TIME
    );
    const docsOther = await ctx.service.redis.setMap(user.id.toString(), user);

    delete user.password;

    if (docs && docsOther) {
      return ctx.success({
        token,
        ...user
      });
    }

    ctx.fail(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async loginByMobile() {
    const { ctx } = this;

    const body: UserLoginMobileBody = ctx.request.body;

    if (!verifyMobile(body.mobile)) {
      return ctx.fail(ApiResponseCode.USER_ERROR, ApiResponseMsg.MOBILE_ERROR);
    }

    if (!verifyCode(body.code)) {
      return ctx.fail(ApiResponseCode.USER_ERROR, ApiResponseMsg.CODE_ERROR);
    }

    const code = await ctx.service.sms.findCodeByMobileAndCode(
      body.mobile,
      Number(body.code)
    );

    if (!code) {
      return ctx.fail(ApiResponseCode.USER_ERROR, ApiResponseMsg.CODE_ERROR);
    }

    const user = await ctx.service.user.findUserByMobile(body.mobile);

    if (!user) {
      return ctx.fail(
        ApiResponseCode.USER_NOT_FOUND,
        ApiResponseMsg.USER_NOT_FOUND
      );
    }

    if (user.status === UserConstants.UNAVAILABLE) {
      return ctx.fail(
        ApiResponseCode.USER_UNAVAILABLE,
        ApiResponseMsg.USER_UNAVAILABLE
      );
    }

    const opt = await ctx.service.sms.removeById(code.id!);

    if (!opt) {
      return ctx.fail();
    }

    const token = createToken(user.id);

    const docs = await ctx.service.redis.setex(
      token,
      user.id.toString(),
      ApiDate.ONE_DAY_TIME
    );
    const docsOther = await ctx.service.redis.setMap(user.id.toString(), user);

    delete user.password;

    if (docs && docsOther) {
      return ctx.success({
        token,
        ...user
      });
    }

    ctx.fail(ApiResponseCode.SERVER_ERROR, ApiResponseMsg.SERVER_ERROR);
  }

  public async registerUser() {
    const { ctx } = this;

    ctx.validate({
      name: "string",
      account: "string",
      password: "string",
      mobile: "string",
      code: /\d{6}/
    });

    const user = ctx.request.body as User & { code: number };

    const code: Sms | null = await ctx.service.sms.findCodeByMobileAndCode(
      user.mobile,
      user.code
    );

    if (!code) {
      return ctx.fail(ApiResponseCode.PARAMS_ERROR, ApiResponseMsg.CODE_ERROR);
    }

    const hasUser: User | null = await ctx.service.user.findUserByAccount(
      user.account
    );

    if (hasUser) {
      return ctx.fail(
        ApiResponseCode.RESOURCE_EXISTED,
        ApiResponseMsg.USER_EXISTED
      );
    }

    user.password = encodeUserPwd(user.password);

    const opt = await ctx.service.sms.removeById(code.id!);

    if (!opt) {
      return ctx.fail();
    }

    const docs = await ctx.service.user.createInstance(user);

    if (docs) {
      return ctx.success({ id: docs.id });
    }

    ctx.fail();
  }

  public async createUser() {
    const { ctx } = this;

    ctx.validate({
      name: "string",
      account: "string",
      mobile: "string",
      roleId: "number",
      status: "number"
    });

    const user = ctx.request.body as User;

    const hasUser: User | null = await ctx.service.user.findUserByAccount(
      user.account
    );

    if (hasUser) {
      return ctx.fail(
        ApiResponseCode.RESOURCE_EXISTED,
        ApiResponseMsg.USER_EXISTED
      );
    }

    if (user.password) {
      user.password = encodeUserPwd(user.password);
    }

    const docs = await ctx.service.user.createInstance(user);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async updateUser() {
    const { ctx } = this;

    ctx.validate({
      id: "number",
      name: "string",
      account: "string",
      mobile: "string",
      roleId: "number",
      status: "number"
    });

    const user = ctx.request.body as User;

    const userData: User | null = await ctx.service.user.findById(user.id);

    if (!userData) {
      return ctx.fail(
        ApiResponseCode.USER_NOT_FOUND,
        ApiResponseMsg.USER_NOT_FOUND
      );
    }

    user.password = encodeUserPwd(user.password);

    const docs = await ctx.service.user.updateById(user, user.id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async removeUser() {
    const { ctx } = this;

    const params: {
      id: number;
    } = ctx.params;

    ctx.validate(
      {
        id: /\d+/
      },
      params
    );

    const user: User | null = await ctx.service.user.findById(params.id);

    if (!user) {
      return ctx.fail(
        ApiResponseCode.USER_NOT_FOUND,
        ApiResponseMsg.USER_NOT_FOUND
      );
    }

    const docs = await ctx.service.user.removeById(params.id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async updateUserPwd() {
    const { ctx } = this;

    ctx.validate({
      mobile: /\d{11}/,
      code: /\d{6}/,
      password: "string"
    });

    const data: UpdateUserPwdBody = ctx.request.body;

    const code = await ctx.service.sms.findCodeByMobileAndCode(
      data.mobile,
      data.code
    );

    if (!code) {
      return ctx.fail(ApiResponseCode.PARAMS_ERROR, ApiResponseMsg.CODE_ERROR);
    }

    const user = await ctx.service.user.findUserByMobile(data.mobile);

    if (!user) {
      return ctx.fail(
        ApiResponseCode.USER_NOT_FOUND,
        ApiResponseMsg.USER_NOT_FOUND
      );
    }

    const pwd = encodeUserPwd(data.password);

    const docs = await ctx.service.user.updateById({ password: pwd }, user.id);

    if (docs) {
      return ctx.success();
    }

    ctx.fail();
  }

  public async queryUserMenu () {
    const { ctx } = this;

    const id = ctx.user.roleId

    const data = await ctx.service.role.findRoleMenuByRoleId(id)

    ctx.success(data)
  }
}

export default UserController;
