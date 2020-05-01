import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts } from '../redux/actions/post';

import PostCard from './PostCard';
import PostSkeletons from './PostSkeletons';

const Blog = ({ posts }) => {
  const { loadingPosts } = useSelector((store) => store.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line
  }, []);

  return (
    <section className='posts'>
      <div className='container'>
        {loadingPosts ? (
          <PostSkeletons />
        ) : (
          posts.map((post) => <PostCard post={post} key={post.id} />)
        )}
      </div>
    </section>
  );
};

export default Blog;
