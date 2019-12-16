// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAliyun from '../../../app/service/aliyun';
import ExportMenu from '../../../app/service/menu';
import ExportProduct from '../../../app/service/product';
import ExportQiniu from '../../../app/service/qiniu';
import ExportRedis from '../../../app/service/redis';
import ExportRequest from '../../../app/service/request';
import ExportRole from '../../../app/service/role';
import ExportSms from '../../../app/service/sms';
import ExportTask from '../../../app/service/task';
import ExportUpload from '../../../app/service/upload';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    aliyun: ExportAliyun;
    menu: ExportMenu;
    product: ExportProduct;
    qiniu: ExportQiniu;
    redis: ExportRedis;
    request: ExportRequest;
    role: ExportRole;
    sms: ExportSms;
    task: ExportTask;
    upload: ExportUpload;
    user: ExportUser;
  }
}
