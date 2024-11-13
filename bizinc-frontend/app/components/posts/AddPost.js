// In AddPost.js
const AddPost = ({ post, setPost, handleSubmit }) => {
  return (
    <form className="add-post-form" onSubmit={(e) => handleSubmit(e, post, setPost)}>
      <input
        type="text"
        placeholder="New post title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <textarea
        placeholder="Post body"
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;