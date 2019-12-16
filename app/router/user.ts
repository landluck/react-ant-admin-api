import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app;
  const apiRouter = router.namespace('/user');

  /**
   * @api {post} /user/login 用户登录
   * @apiName LoginUser
   * @apiGroup User
   *
   * @apiParam {String} account 账号
   * @apiParam {String} password 密码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Number} data.id 用户id
   * @apiSuccess {String} data.account 用户昵称
   * @apiSuccess {String} data.avatarUrl 头像
   * @apiSuccess {String} data.mobile 手机号
   * @apiSuccess {String} data.user 手机号
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 1000,
   *       "name": "张三",
   *       "account": "landluck",
   *       "avatarUrl": "https://www.baidu.com",
   *       "mobile": "15558165021",
   *       "user": 1,
   *       "status": 1,
   *       "token": "jlkfdjfkdljfdkljk"
   *     }
   */
  apiRouter.post('/login', controller.user.login);

  /**
   * @api {post} /user/login-mobile 用户手机号码登录
   * @apiName LoginUserMobile
   * @apiGroup User
   *
   * @apiParam {String} mobile 手机号
   * @apiParam {String} code 验证码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Number} data.id 用户id
   * @apiSuccess {String} data.account 用户昵称
   * @apiSuccess {String} data.avatarUrl 头像
   * @apiSuccess {String} data.mobile 手机号
   * @apiSuccess {String} data.user 手机号
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 1000,
   *       "name": "张三",
   *       "account": "landluck",
   *       "avatarUrl": "https://www.baidu.com",
   *       "mobile": "15558165021",
   *       "user": 1,
   *       "status": 1,
   *       "token": "jlkfdjfkdljfdkljk"
   *     }
   */
  apiRouter.post('/login-mobile', controller.user.loginByMobile);

  /**
   * @api {post} /user/register 用户注册
   * @apiName RegisterUser
   * @apiGroup User
   *
   * @apiParam {String} name 姓名
   * @apiParam {String} account 账号/手机号
   * @apiParam {String} password 密码
   * @apiParam {String} mobile 用户手机号
   * @apiParam {Number} code 用户手机号验证码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Number} data.id 用户id
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       code: 200,
   *       msg: 'success',
   *       data: {
   *         id: 10
   *       }
   *     }
   */
  apiRouter.post('/register', controller.user.registerUser);

  /**
   * @api {post} /user 创建用户
   * @apiName CreateUser
   * @apiGroup User
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {String} name 姓名
   * @apiParam {String} account 账号/手机号
   * @apiParam {String} password 密码
   * @apiParam {String} avatar 用户头像
   * @apiParam {String} mobile 用户手机号
   * @apiParam {Number} roleId 用户权限id
   * @apiParam {Number} status 用户状态
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
  apiRouter.post('/', controller.user.createUser);

  /**
   * @api {put} /user 修改用户
   * @apiName UpdateUser
   * @apiGroup User
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 用户id
   * @apiParam {String} name 姓名
   * @apiParam {String} account 账号/手机号
   * @apiParam {String} password 密码
   * @apiParam {String} avatar 用户头像
   * @apiParam {String} mobile 用户手机号
   * @apiParam {Number} roleId 用户权限id
   * @apiParam {Number} status 用户状态
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
  apiRouter.put('/', controller.user.updateUser);
  /**
   * @api {delete} /user/:id 删除用户
   * @apiName removeUser
   * @apiGroup User
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
  apiRouter.delete('/:id', controller.user.removeUser);

  /**
   * @api {put} /user/pwd 修改用户密码
   * @apiName UpdateUserPwd
   * @apiGroup User
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {string} mobile 用户手机号
   * @apiParam {Number} code 验证码
   * @apiParam {string} password 新密码
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
  apiRouter.put('/pwd', controller.user.updateUserPwd);

  /**
   * @api {get} /user/ 查找用户列表
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiHeader {String} token 用户token
   *
   * @apiParam {Number} id 用户id
   * @apiParam {String} name 用户名称
   * @apiParam {String} account 用户账号
   * @apiParam {String} mobile 用户手机号
   * @apiParam {Number} size 分页大小
   * @apiParam {Number} page 页码
   *
   * @apiSuccess {Number} code 响应状态码
   * @apiSuccess {String} msg  响应描述
   * @apiSuccess {Object} data 响应结果
   * @apiSuccess {Object} data.list 用户列表
   * @apiSuccess {Number} data.list.id 用户列表
   * @apiSuccess {Number} data.list.roleId 用户角色id
   * @apiSuccess {String} data.list.name 用户名称
   * @apiSuccess {String} data.list.account 用户账号
   * @apiSuccess {String} data.list.mobile 用户手机号
   * @apiSuccess {String} data.list.avatar 用户头像
   * @apiSuccess {String} data.list.avatar 用户头像
   * @apiSuccess {Object} data.list.role 用户角色
   * @apiSuccess {Object} data.list.role.id 用户角色id
   * @apiSuccess {Object} data.list.role.name 用户角色名称
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
  apiRouter.get("/", controller.user.queryList);

  /**
   * @api {get} /user/menu/:id 查找用户菜单
   * @apiName GetUserMenu
   * @apiGroup User
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
  apiRouter.get("/menu", controller.user.queryUserMenu);
};
