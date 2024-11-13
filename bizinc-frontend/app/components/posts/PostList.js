import Post from './Post';

const PostList = ({ posts, onLikePost }) => {
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} onLikePost={onLikePost} />
      ))}
    </ul>
  );
};

export default PostList;
