import ip = require('ip');
import { EggAppConfig, PowerPartial } from 'egg';
import { AliyunSmsConfig, OssConfig } from '../typings'

export default () => {
  const config = {} as PowerPartial<EggAppConfig> & { sms: AliyunSmsConfig, oss: OssConfig, };

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = '_1554196283322_156_xxx';


  config.cluster = {
    listen: {
      port: 3300,
      hostname: ip.address(),
    },
  };

  config.multipart = {
    mode: 'file'
  }

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  // add your egg config in here
  config.middleware = [ 'errHandle', 'auth' ];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'react-ant-admin',
    password: 'xxx',
    database: 'react-ant-admin',
    logQueryParameters: true,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 2,
    },
  };

  config.auth = {
    url: new Set([ '/user/login', '/user/login-mobile', '/', '/sms']),
    // ignore (ctx: Context) {
    //   return ctx.url.indexOf('.') !== -1
    // }
  };

  config.sms = {
    accessKeyId: 'xxxx',
    accessKeySecret: 'xx',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    regionId: 'cn-hangzhou',
    verifyCode: {
      signName: 'xxx',
      templateCode: 'xxx'
    },
    // 单个手机号每天可发送短信条数
    countByMobile: 10,
    // 单个ip每天可发送短信条数
    countByIp: 30
  }

  config.oss = {
    qiniu: {
      accessKey: 'xxx',
      secretKey: 'xxxx',
      scope: 'xxxx',
      host: 'xxxx'
    },
    local: {
      prefix: '/public/image',
      dir: '/app/public/image'
    }
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
