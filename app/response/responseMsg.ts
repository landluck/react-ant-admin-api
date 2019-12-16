export enum ApiResponseMsg {
  SUCCESS = 'success',
  SERVER_ERROR = '服务器错误',
  NO_TOKEN = '鉴权失败、请登录',
  TOKEN_ERROR = '登录过期，请重新登录',
  WX_CODE_ERROR = '登录失败、微信信息错误',
  NOT_FOUND = '资源不存在',

  // 用户相关
  USER_NOT_FOUND = '登录失败、用户不存在',
  USER_PWD_ERROR = '登录失败、用户密码错误',
  USER_EXISTED = '用户已存在，请检查后重试',
  USER_UNAVAILABLE = '用户已禁用，请联系管理员',

  // 校验相关
  MOBILE_ERROR = '手机号码错误，请输入合法手机号码',
  CODE_ERROR = '验证码错误，请输入合法验证码',

  // 验证码
  SMS_OVER = '发送失败，每个手机号每天最多发送&条',
  SMS_SND_ERROR = '发送失败，请联系管理员'
}
