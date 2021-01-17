'use strict';

const Controller = require('egg').Controller;

const JsonCode = require('../constant/JsonCode.js');


class UserController extends Controller {
  async register() {
    const { ctx, service } = this;
    const createRule = {
      name: { type: 'string' },
      age: { type: 'number' },
      phone: { type: 'number' },
      password: { type: 'string' },
      password_check: { type: 'string' },
    };
    // 校验参数
    ctx.validate(createRule);
    // 组装参数
    // 调用 Service 进行业务处理
    const res = await service.user.register(Object.assign(ctx.request.body));
    // 设置响应内容和响应状态码
    if (res) {
      ctx.body = {
        data: res,
        code: JsonCode.SUCCESS,
        msg: '注册成功',
      };
    } else {
      ctx.body = {
        data: res,
        code: JsonCode.ERROR,
        msg: '两次密码不一致',
      };
    }
    ctx.status = 200;

  }

  async login() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.user.login(ctx.request.body);
    if (res === JsonCode.SUCCESS) {
      ctx.body = {
        code: res,
        msg: '登录成功',
      };
      ctx.session.user = ctx.request.body;
    } else {
      ctx.body = {
        code: res,
        msg: '密码不正确',
      };
    }
  }

  async info() {
    const { ctx } = this;
    console.log(ctx.session);
    if (ctx.session.user) {
      ctx.body = {
        data: 'ABC',
        code: JsonCode.SUCCESS,
      };
    } else {
      ctx.body = {
        data: null,
        code: JsonCode.ERROR,
      };
    }
  }
}

module.exports = UserController;
