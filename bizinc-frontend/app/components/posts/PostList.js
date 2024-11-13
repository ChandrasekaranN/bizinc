import Post from './Post';

const PostList = ({ posts, onLikePost }) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} onLikePost={onLikePost} /> // Bind input value to post.id, post and onLikepost
      ))}
    </ul>
  );
};

export default PostList;
