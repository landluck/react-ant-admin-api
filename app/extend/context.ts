import { Context } from 'egg';
import { buildSuccess, buildFail } from '../response/rest';
import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';
import { User } from '../model/user';

const USER = Symbol('Context#user');

export default {
  success<T> (this: Context, data?: any) {
    this.body = buildSuccess<T>(data);
  },

  fail (this: Context, code: ApiResponseCode = ApiResponseCode.SERVER_ERROR, msg: ApiResponseMsg = ApiResponseMsg.SERVER_ERROR) {
    this.body = buildFail(code, msg);
  },

  get user (): User {
    return this[USER];
  },

  set user (user: User) {
    this[USER] = user;
  },
};
