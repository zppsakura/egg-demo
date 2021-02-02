'use strict';

const Service = require('egg').Service;
const JsonCode = require('../constant/JsonCode.js');

class TodoListsService extends Service {
  // 获取代办信息列表
  async getLists() {
    const lists = await this.ctx.model.TodoLists.find({}).exec();
    const data = {
      code: JsonCode.SUCCESS,
      data: lists,
    };
    return data;
  }
  async listDelete(info) {
    const todoList = await this.ctx.model.TodoLists.findOne({ title: info.title }).exec();
    if (!todoList) {
      const data = {
        code: JsonCode.DATA_NOT_FOUND,
        msg: '该条信息不存在，无法删除',
      };
      return data;
    }
    await this.ctx.model.TodoLists.remove({ title: info.title }).exec();
    const data = {
      code: JsonCode.SUCCESS,
      msg: '列表删除成功',
    };
    return data;
  }
}

module.exports = TodoListsService;
