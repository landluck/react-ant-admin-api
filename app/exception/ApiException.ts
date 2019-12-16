import { ApiResponseCode } from '../response/responseCode';
import { ApiResponseMsg } from '../response/responseMsg';

export default class ApiException extends Error {
  code: ApiResponseCode;
  message: ApiResponseMsg;

  constructor(code: ApiResponseCode, message: ApiResponseMsg) {
    super(message);
    this.code = code;
    this.message = message;
    Object.setPrototypeOf(this, ApiException.prototype);
  }

}
