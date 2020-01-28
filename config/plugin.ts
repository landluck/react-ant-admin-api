import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  routerPlus: {
    enable: true,
    package: 'egg-router-plus',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
