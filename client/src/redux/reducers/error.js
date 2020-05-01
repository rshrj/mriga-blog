import {
  FILL_INPUT_ERRORS,
  FILL_INTERNAL_ERRORS,
  FLUSH_INTERNAL_ERRORS,
  FLUSH_INPUT_ERRORS
} from '../actions/types';

const initialState = {
  input: {},
  internal: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FILL_INPUT_ERRORS:
      return {
        ...state,
        input: payload
      };
    case FLUSH_INPUT_ERRORS:
      return {
        ...state,
        input: {}
      };
    case FILL_INTERNAL_ERRORS:
      return {
        ...state,
        internal: payload
      };
    case FLUSH_INTERNAL_ERRORS:
      return {
        ...state,
        internal: {}
      };
    default:
      return state;
  }
}
