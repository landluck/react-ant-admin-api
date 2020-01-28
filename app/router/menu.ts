import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace('/menu');

  /**
   * @api {post} /menu 创建菜单
   * @apiName CreateMenu
   * @apiGroup Menu
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {String} name 菜单名称
   * @apiParam {String} icon 菜单icon
   * @apiParam {String} url 菜单url
   * @apiParam {String} desc 菜单描述
   * @apiParam {Number} sort 菜单排序
   * @apiParam {Number} parentId 菜单父级id
   * @apiParam {Number} level 菜单等级
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
  apiRouter.post('/', controller.menu.createOne);
  /**
   * @api {put} /menu 修改菜单
   * @apiName UpdateMenu
   * @apiGroup Menu
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 菜单id
   * @apiParam {String} name 菜单名称
   * @apiParam {String} icon 菜单icon
   * @apiParam {String} url 菜单url
   * @apiParam {String} desc 菜单描述
   * @apiParam {Number} sort 菜单排序
   * @apiParam {Number} parentId 菜单父级id
   * @apiParam {Number} level 菜单等级
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
  apiRouter.put('/', controller.menu.updateOne);

  /**
   * @api {delete} /menu/:id 删除菜单
   * @apiName removeMenu
   * @apiGroup Menu
   *
   * @apiHeader {String} token 用户token
   *
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
  apiRouter.delete('/:id', controller.menu.removeOne);

  /**
   * @api {get} /menu/ 查找菜单列表
   * @apiName GetMenu
   * @apiGroup Menu
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 菜单id
   * @apiParam {String} name 菜单名称
   * @apiParam {String} url 菜单url
   * @apiParam {Number} level 菜单level
   * @apiParam {Number} size 分页大小
   * @apiParam {Number} page 页码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Object} data.list 菜单列表
   * @apiSuccess {Object} data.list.id 菜单列表
   * @apiSuccess {String} data.list.name 菜单名称
   * @apiSuccess {String} data.list.icon 菜单icon
   * @apiSuccess {String} data.list.url 菜单url
   * @apiSuccess {String} data.list.desc 菜单描述
   * @apiSuccess {Number} data.list.sort 菜单排序
   * @apiSuccess {Number} data.list.parentId 菜单父级id
   * @apiSuccess {Number} data.list.level 菜单等级
   * @apiSuccess {Object} data.page 分页信息
   * @apiSuccess {Object} data.page.dataTotal 总条数
   * @apiSuccess {Object} data.page.size 分页大小
   * @apiSuccess {Object} data.page.page 当前是第几页
   * @apiSuccess {Object} data.page.pageTotal 总页码
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {
   *         list: [
   *           {
   *             id: 1,
   *             name: '首页',
   *             icon: 'icon',
   *             url: '/index',
   *             desc: '',
   *             ...
   *           }
   *         ],
   *         page: {
   *           dataTotal: 100,
   *           size: 5,
   *           page: 5,
   *           pageTotal: 20
   *         }
   *       }
   *     }
   */
  apiRouter.get('/', controller.menu.queryList);

  /**
   * @api {get} /menu/cascader 查找菜单级联列表
   * @apiName GetMenuCascader
   * @apiGroup Menu
   *
   * @apiHeader {String} token 用户token
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Array} data 响应结果
   * @apiSuccess {Number} data.id 菜单id
   * @apiSuccess {String} data.list.name 菜单名称
   * @apiSuccess {String} data.list.icon 菜单icon
   * @apiSuccess {String} data.list.url 菜单url
   * @apiSuccess {String} data.list.desc 菜单描述
   * @apiSuccess {Number} data.list.sort 菜单排序
   * @apiSuccess {Number} data.list.parentId 菜单父级id
   * @apiSuccess {Number} data.list.level 菜单等级
   * @apiSuccess {Array} data.list.children 子菜单列表
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: [
   *           {
   *             id: 1,
   *             name: '首页',
   *             icon: 'icon',
   *             url: '/index',
   *             desc: '',
   *             children: []
   *           }
   *         ]
   *     }
   */
  apiRouter.get('/cascader', controller.menu.queryCascader);
};
