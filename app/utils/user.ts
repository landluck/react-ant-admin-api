import crypto = require('crypto');
import { createRandomStr } from './random';
import UserConstants from '../constants/user';

export function encodeUserPwd (pwd: string): string {
  return crypto.createHash('md5').update(pwd.repeat(2) + UserConstants.USER_PWD_KEY).digest('hex');
}

export function createToken(userId: number): string {
  return crypto.createHash('md5').update(userId + createRandomStr() + new Date().getTime() + UserConstants.USER_TOKEN_KEY).digest('hex');
}

export default {
  encodeUserPwd,
  createToken,
};
