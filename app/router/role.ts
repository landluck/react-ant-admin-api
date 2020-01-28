import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace('/role');

  /**
   * @api {post} /role 创建角色
   * @apiName CreateRole
   * @apiGroup role
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {String} name 角色名称
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
  apiRouter.post('/', controller.role.createOne);
  /**
   * @api {put} /role 修改角色
   * @apiName UpdateRole
   * @apiGroup role
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 角色id
   * @apiParam {String} name 角色名称
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
  apiRouter.put('/', controller.role.updateOne);

  /**
   * @api {delete} /role/:id 删除角色
   * @apiName removeRole
   * @apiGroup role
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
  apiRouter.delete('/:id', controller.role.removeOne);

  /**
   * @api {get} /role/ 查找角色列表
   * @apiName GetRole
   * @apiGroup role
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 角色id
   * @apiParam {String} name 角色名称
   * @apiParam {Number} size 分页大小
   * @apiParam {Number} page 页码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Object} data.list 角色列表
   * @apiSuccess {Object} data.list.id 角色列表
   * @apiSuccess {String} data.list.name 角色名称
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
  apiRouter.get('/', controller.role.queryList);

  /**
   * @api {get} /role/menu/:id 查找角色菜单
   * @apiName GetRoleMenu
   * @apiGroup role
   *
   * @apiHeader {String} token 用户token
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Array} data 响应结果
   * @apiSuccess {Number} data.id 角色id
   * @apiSuccess {String} data.list.name 菜单名称
   * @apiSuccess {String} data.list.icon 菜单icon
   * @apiSuccess {String} data.list.url 菜单url
   * @apiSuccess {String} data.list.desc 菜单描述
   * @apiSuccess {Number} data.list.sort 菜单排序
   * @apiSuccess {Number} data.list.parentId 菜单父级id
   * @apiSuccess {Number} data.list.level 菜单等级
   * @apiSuccess {Array} data.list.children 子菜单列表
   * @apiSuccess {Array} data.ids 包含所有菜单的id数组
   *
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
  apiRouter.get('/menu/:id', controller.role.queryRoleMenu);

  /**
   * @api {put} /role/menu/:id 修改角色菜单
   * @apiName UpdateRoleMenu
   * @apiGroup role
   *
   * @apiHeader {String} token 用户token
   * @apiParam  {Array}  menuIds 菜单ids
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
  apiRouter.put('/menu/:id', controller.role.updateRoleMenu);
};
