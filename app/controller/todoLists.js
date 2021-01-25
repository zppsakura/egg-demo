'use strict';

const Controller = require('egg').Controller;

const JsonCode = require('../constant/JsonCode.js');


class TodoListsController extends Controller {
  async getLists() {
    const { ctx, service } = this;
    if (ctx.session.user) {
      // 调用 Service 进行业务处理
      const res = await service.todoLists.getLists();
      // 设置响应内容和响应状态码
      console.log('res', res);
    } else {
      ctx.body = {
        msg: '你还没登录，请先去登录！',
        code: JsonCode.ERROR,
      };
    }
  }
}

module.exports = TodoListsController;
