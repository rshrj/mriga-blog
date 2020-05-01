import React, { useEffect, useState } from 'react';

import PostCard from './PostCard';

const Blog = ({ posts }) => {
  return (
    <section className='posts'>
      <div className='container'>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
