// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIndex from '../../../app/controller/index';
import ExportMenu from '../../../app/controller/menu';
import ExportRole from '../../../app/controller/role';
import ExportSms from '../../../app/controller/sms';
import ExportUpload from '../../../app/controller/upload';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    index: ExportIndex;
    menu: ExportMenu;
    role: ExportRole;
    sms: ExportSms;
    upload: ExportUpload;
    user: ExportUser;
  }
}
