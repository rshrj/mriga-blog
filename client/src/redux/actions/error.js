import {
  FLUSH_INPUT_ERRORS,
  FLUSH_INTERNAL_ERRORS,
  FILL_INTERNAL_ERRORS,
  FILL_INPUT_ERRORS
} from './types';

export const fillErrors = (errorsArr, internal) => (dispatch) => {
  if (internal) {
    dispatch({
      type: FILL_INTERNAL_ERRORS,
      payload: errorsArr[0].msg
    });
  } else {
    let errorObj = {};
    errorsArr.forEach((error) => {
      errorObj[error.param] = error.msg;
    });
    dispatch({
      type: FILL_INPUT_ERRORS,
      payload: errorObj
    });
  }
};

export const flushErrors = (internal) => (dispatch) => {
  dispatch({
    type: internal ? FLUSH_INTERNAL_ERRORS : FLUSH_INPUT_ERRORS
  });
};
