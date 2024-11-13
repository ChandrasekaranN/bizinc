'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import PostList from '../components/posts/PostList';
import AddPost from '../components/posts/AddPost';
import checkAuth from '../middleware/checkAuth';

export default checkAuth(function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts/get');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e, post, setPost) => {
    e.preventDefault();
    if (post.title.trim() && post.body.trim()) {
      try {
        const response = await axios.post('/api/posts/post', post);
        setPosts((prevPosts) => [...prevPosts, response.data]);
        setPost({ title: '', body: '' });
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  const handleLikePost = async (postId, currentLikeStatus) => {
    try {
      await axios.put(`/api/posts/${postId}/like`);
      setPosts(posts.map((post) => post.id === postId ? { ...post, liked: !currentLikeStatus } : post));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // In PostsPage.js
  return (
    <div className="container">
      <h1>Posts</h1>
      <AddPost post={post} setPost={setPost} handleSubmit={handleSubmit} />
      <br/>
      <PostList posts={posts} onLikePost={handleLikePost} />
      <br/>
    </div>
  );

});
