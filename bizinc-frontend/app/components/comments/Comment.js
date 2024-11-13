// components/Comment.js
const Comment = ({ comment }) => {
    return (
      <li>
        <p>{comment.body}</p>
      </li>
    );
  };
  
  export default Comment;
  