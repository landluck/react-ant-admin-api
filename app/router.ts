import { Application } from 'egg';
import index from './router/index';
import user from './router/user';
import sms from './router/sms';
import menu from './router/menu';
import role from './router/role';

export default (app: Application) => {

  const { router } = app;

  router.prefix('/react-ant-admin-api');

  index(app);
  user(app);
  sms(app);
  menu(app);
  role(app);
};
