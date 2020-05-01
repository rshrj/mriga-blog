import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Footer from './Footer';
import Modal from './Modal';

const Layout = (props) => {
  const [modalShown, setModalShown] = useState(false);

  const navOverlay = useRef(null);

  const history = useHistory();

  const openModal = (e) => {
    e.preventDefault();

    setModalShown(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setModalShown(false);
  };

  useEffect(() => {
    navOverlay.current.style.opacity = props.showScroll ? 1 : 0;
  });

  return (
    <React.Fragment>
      <Modal
        modalShown={modalShown}
        closeModal={closeModal}
        fetchPosts={props.fetchPosts}
      />

      <nav className={props.showScroll && 'shadow'}>
        <div className='nav-overlay' ref={navOverlay}></div>
        <div className='container'>
          <div className='brand' onClick={(e) => history.push('/')}>
            <i className='fab fa-buffer fa-2x fa-fw'></i>
            <h1>The Blog</h1>
          </div>
          <div className='nav-links'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/' onClick={openModal}>
                  Create post
                </Link>
              </li>
              <li>
                <Link to='/team'>Team</Link>
              </li>
              <li>
                <Link to='/about'>About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        className={`btn btn-scroll ${props.showScroll && 'show'}`}
        onClick={props.scrollToTop}
      >
        <i className='fas fa-arrow-up'></i>
      </button>

      <section className='banner'>
        <h1>Share your thoughts and memories.</h1>
        <button className='btn btn-banner' id='btn-create' onClick={openModal}>
          Create a blog post now
          <span>
            <i className='fas fa-chevron-circle-right fa-fw'></i>
          </span>
        </button>
      </section>

      {props.children}

      <Footer />
    </React.Fragment>
  );
};

export default Layout;
