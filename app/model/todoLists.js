'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TodoListsSchema = new Schema({
    title: { type: String },
  });

  return mongoose.model('TodoLists', TodoListsSchema);
}
;
