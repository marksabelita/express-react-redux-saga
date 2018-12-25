import React from 'react';
import PropTypes from 'prop-types';


const TodoForm = (props) => {
  const { onSubmit, onChangeTask, newTask } = props;

  return (
    <form className="form-inline new-task" onSubmit={ onSubmit }>
      <div className="form-group col-sm-10">
        <input onChange={() => onChangeTask(event.target.value)} value={newTask} type="text" className="form-control" id="inputPassword2" placeholder="New Task" />
      </div>
      <div className="col-sm-2">
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
    </form>
  )
};


TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChangeTask: PropTypes.func.isRequired,
  newTask: PropTypes.string
};

export default TodoForm;