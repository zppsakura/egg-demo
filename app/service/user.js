'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async register(user) {
    console.log('user', user);
    console.log('modelUsr', this.ctx.model);
    return user;
  }
}

module.exports = UserService;
