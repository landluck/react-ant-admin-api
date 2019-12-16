import { Application } from 'egg';

// app.js
export default class AppBootHook {
  protected app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // 例如：参数中的密码是加密的，在此处进行解密
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    // 例如：创建自定义应用的示例
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
  }

  async didReady() {
    // 应用已经启动完毕
    this.app.logger.info('-----启动成功-----');
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }
}
