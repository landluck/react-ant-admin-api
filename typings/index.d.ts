import "egg";

declare module "egg" {}

export interface ExcludeAttributes {
  attributes: {
    exclude: Array<string>;
  };
}

export interface CheckRules {}

export interface AliyunSmsConfig {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint: string;
  regionId: string;

  countByMobile: number;
  countByIp: number;

  verifyCode: {
    signName: string;
    templateCode: string;
  };
}

export interface OssConfig {
  qiniu?: QiniuConfig;
  local?: LocalConfig;
}

export interface LocalConfig {
  host?: string;
  dir: string;
  prefix?: string
}

export interface QiniuConfig {
  accessKey: string;
  secretKey: string;
  scope: string;
  host: string;
}

export interface PageParams {
  page?: number;
  size?: number;
}

export interface PageInfo {
  size: number;
  page: number;
  dataTotal: number;
  pageTotal: number;
}

export interface PageSql {
  limit: number;
  offset: number;
}
