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

  async listAdd(info) {
    const todoList = await this.ctx.model.TodoLists.findOne({ title: info.title }).exec();
    if (todoList) {
      const data = {
        code: JsonCode.DATA_IS_FOUND,
        msg: '该条信息已存在，请勿重复添加！',
      };
      return data;
    }
    await this.ctx.model.TodoLists.create({ title: info.title });
    const data = {
      code: JsonCode.SUCCESS,
      msg: '列表添加成功',
    };
    return data;
  }

  async listEdit(info, id) {
    console.log('service info', info);
    const data = {
      code: JsonCode.ERROR,
      msg: '参数不得为空',
    };
    if (info.title) {
      const res = await this.ctx.model.TodoLists.findByIdAndUpdate(id, { title: info.title }, function(err, ret) {
        if (err) {
          console.log('更新失败');
        }
        return ret;
      }).exec();
      if (res._id) {
        data.code = JsonCode.SUCCESS;
        data.msg = '更新成功';
      } else {
        data.code = JsonCode.ERROR;
        data.msg = '更新失败';
      }
    }
    return data;
  }

  async listDelete(id) {
    await this.ctx.model.TodoLists.findByIdAndDelete(id, function(err, docs) {
      if (err) {
        console.log(err);
      } else {
        return docs;
      }
    });
    const data = {
      code: JsonCode.SUCCESS,
      msg: '列表删除成功',
    };
    return data;
  }
}

module.exports = TodoListsService;
