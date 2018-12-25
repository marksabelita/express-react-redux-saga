import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TodoList = (props) => {
  const { todos, onClickDelete, onClickUpdateTodo } = props;

  if (todos) {
    return todos.list.map(todo => {
      return (
        <li className={"list-group-item " + (todo.done ? "done" : "")} key={todo._id}>
          <span className="float-left"> {todo.task} </span>
          <strong>{moment(todo.created_at).format('MMMM Do YYYY, h:mm:ss')}</strong>

          <span onClick={() => onClickDelete(todo._id)} className="float-right"> <i className="far fa-trash-alt"></i> </span>
          <span onClick={() => onClickUpdateTodo(todo)} className="float-right"> <i className='far fa-check-circle'></i> </span>
        </li>
      )
    })
  }
};


TodoList.propTypes = {
  todos: PropTypes.object,
  onClickDelete: PropTypes.func.isRequired,
  onClickUpdateTodo: PropTypes.func.isRequired
};

export default TodoList;