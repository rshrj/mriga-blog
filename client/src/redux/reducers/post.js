import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_FLUSH,
  POSTS_FETCH_DONE,
  POSTS_FETCH_START,
  POST_SUBMIT_DONE,
  POST_SUBMIT_START,
  POST_SUBMIT_MSG_REVERT
} from '../actions/types';

const initialState = {
  modalShown: false,
  loadingPosts: false,
  submittingPost: false,
  submitSuccessful: false,
  modalFlush: false,
  posts: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case POSTS_FETCH_START:
      return {
        ...state,
        loadingPosts: true
      };
    case POSTS_FETCH_DONE:
      return {
        ...state,
        posts: payload,
        loadingPosts: false
      };
    case POST_SUBMIT_START:
      return {
        ...state,
        submittingPost: true
      };
    case POST_SUBMIT_DONE:
      return {
        ...state,
        submittingPost: false,
        submitSuccessful: true
      };
    case POST_SUBMIT_MSG_REVERT:
      return {
        ...state,
        submitSuccessful: false
      };
    case MODAL_OPEN:
      return {
        ...state,
        modalShown: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalShown: false
      };
    case MODAL_FLUSH:
      return {
        ...state,
        modalFlush: true
      };
    default:
      return state;
  }
}
