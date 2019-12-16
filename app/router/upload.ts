import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace("/upload");

  /**
   * @api {post} /upload/image 上传图片
   * @apiName UploadImage
   * @apiGroup Upload
   * 
   * @apiHeader {String} token 用户token
   * 
   * @apiParam {String} file 文件数据
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Array} data 响应结果
   * @apiSuccess {string} data.url 图片绝对地址
   * @apiSuccess {number} data.width 图片宽度
   * @apiSuccess {number} data.height 图片高度
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: [
   *          {
   *            url: '',
   *            width: '',
   *            height: ''
   *          }
   *       ]
   *     }
   */
  apiRouter.post("/image", controller.upload.uploadImage);
};
