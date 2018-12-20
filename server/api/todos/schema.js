const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
  task: String,
  created_at: Date,
  done: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;