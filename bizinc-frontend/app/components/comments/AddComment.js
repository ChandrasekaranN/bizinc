const AddComment = ({ postId, comment, setComment, handleSubmit }) => {
  return (
    <form className="add-comment-form" onSubmit={(e) => handleSubmit(e, comment, setComment)}>
      <textarea 
        value={comment.body} 
        onChange={(e) => setComment({ body: e.target.value })} 
        placeholder="Add a comment..."
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;
