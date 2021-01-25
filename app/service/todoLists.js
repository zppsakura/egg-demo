'use strict';

const Service = require('egg').Service;
// const JsonCode = require('../constant/JsonCode.js');

class TodoListsService extends Service {
  // 获取代办信息列表
  async getLists() {
    const lists = await this.ctx.model.TodoLists.find().exec();
    return lists;
  }

}

module.exports = TodoListsService;
