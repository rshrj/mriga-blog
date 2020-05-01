import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTimes,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

import { submitPost, closeModal } from '../redux/actions/post';
import { flushErrors } from '../redux/actions/error';

const Modal = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');

  const {
    modalShown,
    submittingPost,
    submitSuccessful,
    modalFlush
  } = useSelector((store) => store.post);
  const errors = useSelector((store) => store.error).input;
  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitPost({ title, tags, body }, history));
  };

  const handleChange = (e, setter) => {
    dispatch(flushErrors(false));
    setter(e.target.value);
  };

  const closeModalBtn = (e) => {
    e.preventDefault();
    dispatch(closeModal());
  };

  useEffect(() => {
    if (modalFlush) {
      setTitle('');
      setTags('');
      setBody('');
    }
  }, [setTitle, setTags, setBody, modalFlush]);

  return (
    <div className={`master-overlay ${modalShown && 'shown'}`}>
      <div className='new-post-modal'>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <label>Enter the title</label>
            <input
              className={`input-text ${errors.title && 'input-invalid'}`}
              type='text'
              name='title'
              id='inputTitle'
              value={title}
              onChange={(e) => handleChange(e, setTitle)}
              autoFocus
            />
            {errors.title && (
              <small className='invalid-text'>{errors.title}</small>
            )}
          </div>
          <div className='input-group'>
            <label>
              Tags <small>(seperated by comma)</small>
            </label>
            <input
              className={`input-text ${errors.tags && 'input-invalid'}`}
              type='text'
              name='tags'
              value={tags}
              onChange={(e) => handleChange(e, setTags)}
              id='inputTags'
            />
            {errors.tags && (
              <small className='invalid-text'>{errors.tags}</small>
            )}
          </div>
          <div className='input-group'>
            <label>Body</label>
            <textarea
              type='text'
              className={`input-textarea ${errors.body && 'input-invalid'}`}
              name='body'
              id='inputBody'
              value={body}
              onChange={(e) => handleChange(e, setBody)}
              rows='3'
              cols='90'
            ></textarea>
            {errors.body && (
              <small className='invalid-text'>{errors.body}</small>
            )}
          </div>
          {submitSuccessful && (
            <div className='input-group'>
              <small className='submitted-text'>
                <FontAwesomeIcon icon={faCheckCircle} fixedWidth /> Submitted
                Successfully
              </small>
            </div>
          )}
          <div className='input-group'>
            <button
              type='submit'
              className={`btn btn-submit ${
                submittingPost && 'btn-submit-disabled'
              }`}
              disabled={submittingPost}
            >
              {submittingPost ? (
                <span className='spinner'>Loading...</span>
              ) : (
                <React.Fragment>
                  <FontAwesomeIcon icon={faPaperPlane} fixedWidth /> Submit
                </React.Fragment>
              )}
            </button>
          </div>
          <div className='input-group'>
            <button
              className={`btn btn-close ${
                submittingPost && 'btn-close-disabled'
              }`}
              disabled={submittingPost}
              onClick={closeModalBtn}
            >
              <FontAwesomeIcon icon={faTimes} fixedWidth /> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
