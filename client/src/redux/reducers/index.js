import { combineReducers } from 'redux';

import errorReducer from './error';
import postReducer from './post';

export default combineReducers({
  error: errorReducer,
  post: postReducer
});
