import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getTodos, deleteTodo, updateTodo, createTodo } from '../actions/todos';
import TodoList from './container/todo-list';
import TodoForm from './forms/todo-form';

class Todos extends Component {

  constructor(props) {
    super(props);
    this.state = { newTask: "" }
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickUpdateTodo = this.onClickUpdateTodo.bind(this);
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount() {
    const { getTodos } = this.props;
    getTodos();
  }

  onSubmit(e){
    e.preventDefault();
    const { createTodo } = this.props;
    if (this.state.newTask != ""){
      createTodo({ "task": this.state.newTask });
      this.setState({
        newTask: ''
      });
    }
  }

  onChangeTask(value){
    this.setState({  newTask : value });
  }

  onClickUpdateTodo(data){
    const { updateTodo } = this.props;
    updateTodo(data);
  }

  onClickDelete(id){
    const { deleteTodo } = this.props;
    deleteTodo(id);
  }
  
  render() {
    const { todos } = this.props;

    return (
      <div className="">
        <div className="col-sm-12">
          <h3> Todo list: </h3>
        </div>
        <TodoForm onChangeTask={this.onChangeTask} onSubmit ={this.onSubmit} newTask={ this.state.newTask } />
        <div className="col-sm-12">
          <ul className="list-group">
            <TodoList todos={todos} onClickDelete={this.onClickDelete} onClickUpdateTodo={this.onClickUpdateTodo} />
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProp = (state) => {
  return {
    todos: state.todos
  }
};

Todos.propTypes = {
  todos: PropTypes.object,
  getTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired
};

export default connect(mapStateToProp, { getTodos, deleteTodo, updateTodo, createTodo })(Todos);