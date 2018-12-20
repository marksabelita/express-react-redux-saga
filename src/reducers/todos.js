import { GET_TODOS, FETCH_TODOS, FETCH_ERROR, DELETE_TODO, UPDATE_TODO, CREATE_TODO } from '../actions/type'

const initialState = {
  loading: false,
  list: [],
  error: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return { ...state }
    case FETCH_TODOS:
      return { list: action.payload,  }
    case FETCH_ERROR: 
      return { ...state, error: action.error }
    case CREATE_TODO:
      return { ...state, create: action.create }
    case DELETE_TODO:
      return { ...state, id: action.id };
    case UPDATE_TODO:
      return { ...state, update: action.payload }
    default:
      return state;
  }
}