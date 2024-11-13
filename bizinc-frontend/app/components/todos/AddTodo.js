// components/AddTodo.js
const AddTodo = ({ todo, setTodo, handleSubmit }) => {
  return (
    <form onSubmit={(e) => handleSubmit(e, todo, setTodo)}>
      <input
        type="text"
        placeholder="New todo"
        value={todo} // Use the todo value passed from the parent
        onChange={(e) => setTodo(e.target.value)} // Update the todo value in the parent state
      />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default AddTodo;
