const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {/* Iterate over the comments array and display each comment */}
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
