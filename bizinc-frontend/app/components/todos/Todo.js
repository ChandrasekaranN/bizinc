// components/todo.js
const Todo = ({ todo, onCompletetodo }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none',}}>
      {todo.title}
      <button onClick={() => onCompletetodo(todo.id)}>
        {todo.completed ? 'Completed' : 'Complete'}
      </button>
    </li>
  );
};

export default Todo;
