'use strict';

const Controller = require('egg').Controller;

const JsonCode = require('../constant/JsonCode.js');


class TodoListsController extends Controller {
  async getLists() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.todoLists.getLists();
    // 设置响应内容和响应状态码
    switch (res.code) {
      case JsonCode.SUCCESS:
        ctx.body = {
          code: res.code,
          data: res.data,
          msg: '列表获取成功',
        };
        break;
      default:
        ctx.body = {
          msg: '获取失败',
        };
        break;
    }
    ctx.status = 200;
  }
  async listAdd() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.todoLists.listAdd(ctx.query);
    // 设置响应内容和响应状态码
    switch (res.code) {
      case JsonCode.SUCCESS:
        ctx.body = {
          code: res.code,
          data: res.data,
          msg: res.msg,
        };
        break;
      case JsonCode.DATA_IS_FOUND:
        ctx.body = {
          code: res.code,
          msg: res.msg,
        };
        break;
      default:
        ctx.body = {
          msg: '列表添加失败',
        };
        break;
    }
    ctx.status = 200;
  }
  async listDelete() {
    const { ctx, service } = this;
    // 调用 Service 进行业务处理
    const res = await service.todoLists.listDelete(ctx.query);
    // 设置响应内容和响应状态码
    switch (res.code) {
      case JsonCode.SUCCESS:
        ctx.body = {
          code: res.code,
          data: res.data,
          msg: res.msg,
        };
        break;
      case JsonCode.DATA_NOT_FOUND:
        ctx.body = {
          code: res.code,
          msg: res.msg,
        };
        break;
      default:
        ctx.body = {
          msg: '列表删除失败',
        };
        break;
    }
    ctx.status = 200;
  }
}

module.exports = TodoListsController;
