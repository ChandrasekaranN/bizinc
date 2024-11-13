import { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from '../comments/AddComment';  // Import AddComment component
import CommentList from '../comments/CommentList';  // Import CommentList component

const Post = ({ post, onLikePost }) => {
  const [comments, setComments] = useState([]);  // Store comments for each post
  const [comment, setComment] = useState({ body: '' });  // Manage new comment input

  // Fetch comments when the post is loaded
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${post.id}/comments`);
        setComments(response.data);  // Set comments for the current post
      } catch (error) {
        console.error(`Error fetching comments for post ${post.id}:`, error);
      }
    };
    fetchComments();
  }, [post.id]);  // Re-fetch comments if post.id changes

  // Handle like/unlike functionality for the post
  const handleLikePost = () => {
    onLikePost(post.id, post.liked);
  };

  // Handle adding a comment
  const handleCommentSubmit = async (e, comment, setComment) => {
    e.preventDefault();
    if (comment.body.trim()) {
      try {
        const response = await axios.post(`/api/posts/${post.id}/comments`, comment);
        setComments((prevComments) => [...prevComments, response.data]);  // Add new comment
        setComment({ body: '' });  // Clear comment input
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // In Post.js
  return (
    <li className="post-card">
      <h2 >{post.title}</h2>
      <p>{post.body}</p>
      <div>
      <button className='like-button' onClick={handleLikePost}>
        {post.liked ? 'Unlike' : 'Like'}
      </button>
      </div>
      <div className="comments">
        <h3>Comments</h3>
        <CommentList comments={comments} className="comment-list" />
        <AddComment
          postId={post.id}
          comment={comment}
          setComment={setComment}
          handleSubmit={handleCommentSubmit}
          className="add-comment-form"
        />
      </div>
    </li>
  );
};

export default Post;
