import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Blog from './components/Blog';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import PostDetail from './components/PostDetail';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = (e) => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', handleScroll);

  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get('/api/posts')
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Router>
      <Layout
        scrollToTop={scrollToTop}
        showScroll={showScroll}
        fetchPosts={fetchPosts}
      >
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Blog posts={posts} {...props} />}
          />
          <Route exact path='/team' component={TeamPage} />
          <Route exact path='/about' component={AboutPage} />
          <Route exact path='/post/:id' component={PostDetail} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
