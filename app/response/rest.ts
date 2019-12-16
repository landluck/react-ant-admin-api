import { ApiResponse } from '../../typings/iny';
import { ApiResponseCode } from './responseCode';
import { ApiResponseMsg } from './responseMsg';

export function buildSuccess<T>(data?: any): ApiResponse<T> {

  return buildResponse<T>(ApiResponseCode.SUCCESS, data || {}, ApiResponseMsg.SUCCESS);
}

export function buildFail<T>(code: ApiResponseCode, msg: ApiResponseMsg): ApiResponse<T> {
  return buildResponse<T>(code, {} as T, msg);
}

export function buildResponse<T>(code: ApiResponseCode, data: T, msg: ApiResponseMsg): ApiResponse<T> {
  return {
    code,
    data,
    msg,
  };
}
