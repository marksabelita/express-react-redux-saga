import { put, takeLatest, all, call } from 'redux-saga/effects';
import { FETCH_TODOS, GET_TODOS, FETCH_ERROR, DELETE_TODO, UPDATE_TODO, CREATE_TODO } from '../actions/type';
import axios from 'axios';

const hostname = window && window.location && window.location.hostname;
const API_URL = (hostname === 'localhost') ? 'http://localhost:8080' : '';

function getRequest(data) {
  return axios.request({
    method: 'get',
    url: data.url,
  });
}

function postRequest(data) {
  return axios.request({
    method: 'post',
    url: data.url,
    data: data.body
  });
}

function deleteRequest(data) {
  return axios.request({
    method: 'delete', 
    url: data.url
  })
}

function* deleteTodo(params){
  try {
    const response = yield call(deleteRequest, { 'url': `${API_URL}/api/todos/${params.id}` });
    if (response.status === 200) {
      
      yield put({ type: GET_TODOS  });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* getTodos() {
  try {
    const response = yield call(getRequest, { 'url': `${API_URL}/api/todos` });
    if (response.status === 200) {
      yield put({ type: FETCH_TODOS, payload: response.data.result });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* updateTodo(params){
  try {
    const { _id, done } = params.update;
    const payload = {
      url: `${API_URL}/api/todo/${_id}`,
      body:{
        done: (done) ? false : true
      }
    }
    const response = yield call(postRequest, payload );
    if (response.status === 200) {
      yield put({ type: GET_TODOS });
    } else {
      throw response;
    }
    
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* createTodo(params){
  try {
    const payload = {
      url: `${API_URL}/api/todos`,
      body: params.create
    }

    const response = yield call(postRequest, payload);
    if (response.status === 200) {
      yield put({ type: GET_TODOS });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

function* actionDeleteTodo() {
  yield takeLatest(DELETE_TODO, deleteTodo);
}

function* actionGetTodos() {
  yield takeLatest(GET_TODOS, getTodos);
}

function* actionUpdateTodo() {
  yield takeLatest(UPDATE_TODO, updateTodo);
} 

function* actionCreateTodo() {
  yield takeLatest(CREATE_TODO, createTodo);
} 


export default function* rootSaga() {
  yield all([
    actionGetTodos(),
    actionDeleteTodo(),
    actionUpdateTodo(),
    actionCreateTodo()
  ]);
}