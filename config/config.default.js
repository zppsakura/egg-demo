/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610861657625_4991';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.security = {
    // 关闭csrf验证
    csrf: {
        enable: false,
        ignoreJSON: true,
    },
    // 白名单
    domainWhiteList: ['*']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true, 
  };
  
  config.mongoose = {
    client: {
      url: '',
      options: {},
      plugins: [],
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};