// components/todoList.js
import Todo from './Todo';

const TodoList = ({ todos, onCompletetodo }) => {

  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onCompletetodo={onCompletetodo} />
      ))}
    </ul>
  );
};

export default TodoList;
