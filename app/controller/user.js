'use strict';

const Controller = require('egg').Controller;

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
    const res = await service.user.register(ctx.request.body);
    // 设置响应内容和响应状态码
    ctx.body = res;
    ctx.status = 200;
  }

  async info() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = UserController;
