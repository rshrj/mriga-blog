import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.css';

import Blog from './components/Blog';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import PostDetail from './components/PostDetail';

function App() {
  const [showScroll, setShowScroll] = useState(false);

  // const history = useHistory();

  const { posts } = useSelector((store) => store.post);

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

  // useEffect(() => {
  //   history.listen((location, action) => {
  //     console.log(
  //       `The current URL is ${location.pathname}${location.search}${location.hash}`
  //     );
  //     console.log(`The last navigation action was ${action}`);
  //   });
  // });

  return (
    <Router>
      <Layout scrollToTop={scrollToTop} showScroll={showScroll}>
        <Switch>
          <Route exact path='/'>
            <Blog posts={posts} />
          </Route>
          <Route exact path='/post/:id' component={PostDetail} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
