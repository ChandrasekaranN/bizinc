const AddPost = ({ post, setPost, handleSubmit }) => {
  return (
    <form className="add-post-form" onSubmit={(e) => handleSubmit(e, post, setPost)}>
      <input
        type="text"
        placeholder="New post title"
        value={post.title} // Bind input value to post.title
        onChange={(e) => setPost({ ...post, title: e.target.value })} // Update post title on change
      />
      <textarea
        placeholder="Post body"
        value={post.body} // Bind textarea value to post.body
        onChange={(e) => setPost({ ...post, body: e.target.value })} // Update post body on change
      />
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;