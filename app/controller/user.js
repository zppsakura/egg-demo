'use strict';

const Controller = require('egg').Controller;

const JsonCode = require('../constant/JsonCode.js');


class UserController extends Controller {
  async register() {
    const { ctx, service } = this;
    const createRule = {
      name: { type: 'string' },
      phone: { type: 'string' },
      password: { type: 'string' },
      password_check: { type: 'string' },
    };
    // 校验参数
    ctx.validate(createRule);
    // 组装参数
    // 调用 Service 进行业务处理
    const res = await service.user.register(Object.assign(ctx.request.body));
    // 设置响应内容和响应状态码
    switch (res) {
      case JsonCode.PASSWORD_SAME:
        ctx.body = {
          code: res,
          msg: '两次密码不一致',
        };
        break;
      case JsonCode.USERNAME_ISHAS:
        ctx.body = {
          code: res,
          msg: '该用户已注册过',
        };
        break;
      case JsonCode.SUCCESS:
        ctx.body = {
          code: res,
          msg: '注册成功',
        };
        break;
      default:
        break;
    }
    ctx.status = 200;
  }

  async login() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.user.login(ctx.request.body);
    if (res.code === JsonCode.SUCCESS) {
      ctx.body = {
        code: res.code,
        data: res.data,
        msg: '登录成功',
      };
      ctx.session.user = ctx.request.body;
      console.log('login', ctx.session.user);
    } else if (res.code === JsonCode.DATA_NOT_FOUND) {
      ctx.body = {
        code: res.code,
        msg: '该用户未注册，请前去注册',
      };
    } else {
      ctx.body = {
        code: res.code,
        msg: '密码不正确',
      };
    }
  }
}

module.exports = UserController;
