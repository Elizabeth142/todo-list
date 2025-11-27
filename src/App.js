import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
  // Load tasks from local storage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all');

  // Save tasks to local storage on every update
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new task
  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  // Mark task as completed
  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  // Delete task
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Edit task
  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  // Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.isCompleted;
    if (filter === 'incomplete') return !todo.isCompleted;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      {/* Todo Form */}
      <TodoForm addTodo={addTodo} />

      {/* Todo List */}
      {filteredTodos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
}

export default App;
