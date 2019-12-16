export enum ApiResponseCode {
  SUCCESS = 200,
  SERVER_ERROR = 300,
  NO_TOKEN = 400,
  TOKEN_ERROR = 400,
  NOT_FOUND = 404,

  // 参数校验不通过
  PARAMS_ERROR = 4001,

  // 资源已存在
  RESOURCE_EXISTED = 4003,
  // 超出限制
  RESOURCE_LIMTI = 4007,

  // 用户相关
  USER_NOT_FOUND = 4004,
  USER_ERROR = 4005,
  USER_UNAVAILABLE = 4006,
}
