import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/sms");

  /**
   * @api {post} /sms 发送验证码
   * @apiName SendSms
   * @apiGroup Sms
   *
   * @apiParam {String} mobile 账号
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {}
   *     }
   */
  apiRouter.post("/", controller.sms.sendMessage);
};
