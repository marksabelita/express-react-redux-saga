const TodoSchema = require('./schema');

class TodoModel {
  getTasks() {
    return new Promise((resolve, reject) => {
      TodoSchema.find({}, {}, { sort: { 'created_at': -1 } }, function (err, todos) {
        (err) ? reject(err) : resolve(todos);
      })
    })
  }

  getTaskById(id) {
    return new Promise((resolve, reject) => {
      TodoSchema.findById(id,  function (err, todo) {
        (err) ? reject(err) : resolve(todo);
      })
    });
  }

  updateTask(id, status) {
    return new Promise((resolve, reject) => {
      TodoSchema.findByIdAndUpdate(id,  { $set: { done: status } }, function(err, result) {
        (err) ? reject(err) : resolve(result);
      });
    })
  }

  createNewTask(task) {
    return new Promise((resolve, reject) => {
      const todo = new TodoSchema(
        {
          task,
          created_at: new Date(),
          done: false
        }
      );

      todo.save(function (err, result) {
        (err) ? reject(err) : resolve(result);
      })
    })
  }

  deletTask(id) {
    return new Promise((resolve, reject) => {
      TodoSchema.findByIdAndRemove(id, function (err, result) {
        (err) ? reject(err) : resolve(result);
      })
    })
  }
}

module.exports = new TodoModel();