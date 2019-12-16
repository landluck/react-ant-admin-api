import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace('/index');

  apiRouter.get('/list', controller.index.queryList);
};
