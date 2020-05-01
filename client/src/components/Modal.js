import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Modal = ({ modalShown, closeModal, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [body, setBody] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setDisabled(true);

    let reqBody = JSON.stringify({ title, tags, body });
    let options = { headers: { 'Content-Type': 'application/json' } };
    axios
      .post('/api/posts', reqBody, options)
      .then((res) => {
        setSubmitted(true);
        setTimeout(() => {
          closeModal(e);
          setSubmitted(false);
          history.push('/');
          fetchPosts();
        }, 1000);
      })
      .catch((err) => {
        let errorObj = {};
        const errorsArray = err.response.data.errors;
        errorsArray.forEach((error) => {
          errorObj[error.param] = error.msg;
        });
        setErrors(errorObj);
        setDisabled(false);
      });
  };

  const handleChange = (e, setter) => {
    setErrors({});
    setter(e.target.value);
  };

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
          {submitted && (
            <div className='input-group'>
              <small class='submitted-text'>
                <i class='fas fa-check-circle'></i> Submitted Successfully
              </small>
            </div>
          )}
          <div className='input-group'>
            <button
              type='submit'
              className={`btn btn-submit ${disabled && 'btn-submit-disabled'}`}
              disabled={disabled}
            >
              <i className='fas fa-paper-plane fa-fw'></i> Submit
            </button>
          </div>
          <div className='input-group'>
            <button
              className={`btn btn-close ${disabled && 'btn-close-disabled'}`}
              onClick={(e) => {
                setErrors({});
                closeModal(e);
              }}
            >
              <i className='fas fa-times fa-fw'></i> Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
