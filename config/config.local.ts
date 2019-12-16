import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.static = {
    maxAge: 0,
    cacheControl: 'no-cache',
  };
  return config;
};
