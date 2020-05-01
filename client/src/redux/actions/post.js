import axios from 'axios';

import {
  POSTS_FETCH_START,
  POSTS_FETCH_DONE,
  POST_SUBMIT_START,
  POST_SUBMIT_DONE,
  MODAL_CLOSE,
  MODAL_OPEN,
  MODAL_FLUSH,
  POST_SUBMIT_MSG_REVERT
} from './types';

import { fillErrors, flushErrors } from './error';

export const openModal = () => (dispatch) => {
  dispatch({
    type: MODAL_OPEN
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: MODAL_CLOSE
  });
  dispatch(flushErrors(false));
};

export const fetchPosts = () => async (dispatch) => {
  dispatch({
    type: POSTS_FETCH_START
  });
  try {
    let res = await axios.get('/api/posts');
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: res.data.posts
    });
  } catch (err) {
    let { errors } = err.response.data;
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: []
    });
    dispatch(fillErrors(errors, true));
  }
};

export const fetchPostById = (id, history, postImg) => async (dispatch) => {
  dispatch({
    type: POSTS_FETCH_START
  });
  try {
    let res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: [res.data.post]
    });
    postImg.current.style.backgroundImage = `url(${res.data.post.image})`;
  } catch (err) {
    let { errors } = err.response.data;
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: []
    });
    dispatch(fillErrors(errors, true));
    history.push('/notfound');
  }
};

export const fetchPostsByTags = (tags) => async (dispatch) => {
  dispatch({
    type: POSTS_FETCH_START
  });
  try {
    let body = JSON.stringify({ tags });
    let options = { headers: { 'Content-Type': 'application/json' } };
    let res = await axios.post('/api/posts/tags', body, options);
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: res.data.posts
    });
  } catch (err) {
    let { errors } = err.response.data;
    dispatch({
      type: POSTS_FETCH_DONE,
      payload: []
    });
    dispatch(fillErrors(errors, true));
  }
};

export const submitPost = (post, history) => async (dispatch) => {
  dispatch({
    type: POST_SUBMIT_START
  });
  try {
    let body = JSON.stringify(post);
    let options = { headers: { 'Content-Type': 'application/json' } };
    await axios.post('/api/posts', body, options);
    dispatch({
      type: POST_SUBMIT_DONE
    });
    setTimeout(() => {
      dispatch({
        type: POST_SUBMIT_MSG_REVERT
      });
      dispatch(closeModal());
      dispatch({
        type: MODAL_FLUSH
      });
      history.push('/');
      dispatch(fetchPosts());
    }, 1000);
  } catch (err) {
    let { errors } = err.response.data;
    dispatch({
      type: POST_SUBMIT_DONE
    });
    dispatch({
      type: POST_SUBMIT_MSG_REVERT
    });
    dispatch(fillErrors(errors, false));
  }
};
