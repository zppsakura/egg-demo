'use strict';

const Service = require('egg').Service;
const utility = require('utility');
const JsonCode = require('../constant/JsonCode.js');


class UserService extends Service {
  async register(user) {
    if (user.password !== user.password_check) {
      console.log('两次密码不一样');
      return null;
    }
    const user2 = {
      ...user,
      password: utility.md5(user.password),
    };
    return this.ctx.model.User.create(user2);
  }

  async login(user) {
    const nameInfo = await this.ctx.model.User.findOne({ name: user.name }).exec();
    if (!nameInfo) {
      return JsonCode.DATA_NOT_FOUND;
    }
    const passwordInfo = await this.ctx.model.User.findOne({ name: user.name, password: utility.md5(user.password) }).exec();
    if (!passwordInfo) {
      return JsonCode.PASSWORD_ERROR;
    }
    return JsonCode.SUCCESS;

  }
}

module.exports = UserService;
