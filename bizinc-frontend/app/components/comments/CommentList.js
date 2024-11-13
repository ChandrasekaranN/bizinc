const CommentList = ({ comments }) => {
  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-item">
          <p>{comment.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
