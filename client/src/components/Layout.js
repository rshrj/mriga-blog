import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { openModal } from '../redux/actions/post';

import Footer from './Footer';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons';
import { faBuffer } from '@fortawesome/free-brands-svg-icons';

const Layout = (props) => {
  const dispatch = useDispatch();

  const navOverlay = useRef(null);
  useEffect(() => {
    navOverlay.current.style.opacity = props.showScroll ? 1 : 0;
  });

  const history = useHistory();

  const openModalBtn = (e) => {
    e.preventDefault();
    dispatch(openModal());
  };

  return (
    <React.Fragment>
      <Modal />

      <nav className={props.showScroll && 'shadow'}>
        <div className='nav-overlay' ref={navOverlay}></div>
        <div className='container'>
          <div className='brand' onClick={(e) => history.push('/')}>
            <FontAwesomeIcon icon={faBuffer} fixedWidth size='2x' />
            <h1>The Blog</h1>
          </div>
          <div className='nav-links'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/' onClick={openModalBtn}>
                  Create post
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        className={`btn btn-scroll ${props.showScroll && 'show'}`}
        onClick={props.scrollToTop}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <section className='banner'>
        <h1>Share your thoughts and memories.</h1>
        <button
          className='btn btn-banner'
          id='btn-create'
          onClick={openModalBtn}
        >
          Create a blog post now{' '}
          <span>
            <FontAwesomeIcon icon={faChevronCircleRight} fixedWidth />
          </span>
        </button>
      </section>

      {props.children}

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
