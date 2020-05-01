import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const postImg = useRef(null);

  const titleCase = (title) =>
    title
      .split(/ /g)
      .map(
        (word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
      )
      .join('');

  const shorten = (content) =>
    content.length > 150 ? `${content.substring(0, 150)}...` : content;

  useEffect(() => {
    postImg.current.style.backgroundImage = `url(${post.image})`;
  }, [post.image]);

  return (
    <div className='post-card'>
      <div className='left'>
        <div className='post-img' ref={postImg}></div>
      </div>
      <div className='right'>
        <h1>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h1>
        <div className='details'>
          <div className='tags'>
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
          <p>{post.created_at}</p>
        </div>
        <div className='content'>{shorten(post.body)}</div>
      </div>
    </div>
  );
};

export default PostCard;
