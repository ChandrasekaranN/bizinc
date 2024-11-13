'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import TodoList from '../components/todos/TodoList';
import AddTodo from '../components/todos/AddTodo';
import checkAuth from '../middleware/checkAuth';

export default checkAuth(function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(''); // State for the input field

  // Fetch todos when the page loads
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('/api/todos/get');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  // Handle form submission to add a new todo
  const handleSubmit = async (e, todo, setTodo) => {
    e.preventDefault();
    if (todo.trim()) {
      try {
        const response = await axios.post('/api/todos/post', { title: todo });
        setTodos((prevTodos) => [...prevTodos, response.data]); // Add the new todo
        setTodo(''); // Clear the input field after submitting
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Handle marking todo as completed
  const handleCompletetodo = async (todoId) => {
    try {
      await axios.put(`/api/todos/${todoId}/complete`);
      setTodos(todos.map(todo => todo.id === todoId ? { ...todo, completed: true } : todo));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todos={todos} onCompletetodo={handleCompletetodo} />
    </div>
  );
}
);