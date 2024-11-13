const AddComment = ({ postId, comment, setComment, handleSubmit }) => {
  return (
    <form className="add-comment-form" onSubmit={(e) => handleSubmit(e, comment, setComment)}>
      <textarea 
        value={comment.body} // Displays the current comment body
        onChange={(e) => setComment({ body: e.target.value })} // Updates comment body as user types
        placeholder="Add a comment..." // Placeholder text when the textarea is empty
      />
      {/* Button to submit the new comment */}
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;
