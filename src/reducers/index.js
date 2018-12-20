import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import todosReducer from './todos';

const  rootReducer = combineReducers({
  router: routerReducer,
  todos: todosReducer
});

export default rootReducer;