import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';
import { getTodos, deleteTodo, updateTodo, createTodo } from '../actions/todos';

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

  renderTodos() {
    const { todos } = this.props;

    return todos.list.map(todo => {
      return (
        <li className="list-group-item" key={todo._id}> 
          <span className="float-left"> {todo.task} </span>
          <strong>{moment(todo.created_at).format('MMMM Do YYYY, h:mm:ss')}</strong>

          <span onClick={() => this.onClickDelete(todo._id) }  className="float-right"> <i className="far fa-trash-alt"></i> </span>
          <span onClick={() => this.onClickUpdateTodo(todo)} className="float-right"> <i className='far fa-check-circle'></i> </span>
          
        </li>
      )
    })
  }

  renderForm() {
    return(
      <form className="form-inline new-task" onSubmit={ this.onSubmit }>
        <div className="form-group col-sm-10">
          <input onChange={() => this.onChangeTask(event.target.value) } type="text" className="form-control" id="inputPassword2" placeholder="New Task"/>
        </div>
        <div className="col-sm-2">
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    )
  }

  onSubmit(e){
    e.preventDefault();
    const { createTodo } = this.props;
    createTodo({ "task": this.state.newTask });
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
    console.log(this.props);
    return (
      <div className="">
        <h3> Todo list: </h3>
        {this.renderForm()}
        <div className="col-sm-12">
          <ul className="list-group">
            {this.renderTodos()}
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