const autoBind = require('auto-bind');
const TodoModel = require('./model');

class Todos{
  constructor(){
    autoBind(this);
  }

  async get(req, res){
    try {
      const result = await TodoModel.getTasks({});
      res.send({ success: true, result });      
    } catch (error) {
      res.status(500);
      res.send({ message : error.message })  ;    
    }
  }
  async getById(req, res){
    try {
      const result = await TodoModel.getTaskById(req.params.id);
      res.send({ success: true, result });
    } catch (error) {
      res.status(500);
      res.send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await TodoModel.updateTask(req.params.id, req.body.done);
      res.send({ success: true, result });
    } catch (error) {
      res.status(500);
      res.send({ message: error.message })
    }
  }

  async create(req, res) {
    try {
      const result = await TodoModel.createNewTask(req.body.task);
      res.send({ success: true, result });
    } catch (error) {
      res.status(500);
      res.send({ message: error.message });
    }
  }
  
  async delete(req, res) {
    try {
      const result = await TodoModel.deletTask(req.params.id);
      res.send({ success: true, result });
    } catch (error) {
      res.status(500);
      res.send({ message: error.message }); 
    }
  }
}

module.exports = new Todos();