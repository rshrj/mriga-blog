import React, { useEffect, useRef } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPostById } from '../redux/actions/post';

import PostSkeletons from './PostSkeletons';

const PostDetail = () => {
  const { id } = useParams();

  const { posts, loadingPosts } = useSelector((store) => store.post);

  const postImg = useRef(null);

  let post = {
    title: '',
    body: '',
    tags: [''],
    created_at: '',
    image: 'https://picsum.photos/600/300'
  };
  if (posts.length === 1) {
    post = posts[0];
  }

  const dispatch = useDispatch();

  const history = useHistory();

  const titleCase = (title) =>
    title
      .split(/ /g)
      .map(
        (word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
      )
      .join('');

  useEffect(() => {
    dispatch(fetchPostById(id, history, postImg));
    // eslint-disable-next-line
  }, []);

  return (
    <section className='postdetail'>
      <div className='container'>
        {loadingPosts && posts.length !== 1 ? (
          <PostSkeletons />
        ) : (
          <div className='postdetail-card'>
            <div className='post-title'>
              <h1>{post.title}</h1>
              <p>{post.created_at}</p>
            </div>
            <div className='post-tags'>
              <ul>
                {post.tags.map((tag, index) => (
                  <li key={index}>
                    <Link to={`/tags/${tag}`} className='btn-tag'>
                      {titleCase(tag)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='post-content'>
              <div className='post-image' ref={postImg}>
                Image
              </div>
              {post.body}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostDetail;
