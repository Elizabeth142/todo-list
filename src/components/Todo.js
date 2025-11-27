import React, { useState } from 'react';

function Todo({ todo, index, completeTodo, removeTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (newText.trim() === '') return; // prevent empty edits
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          {todo.text}
          <div>
            <button onClick={() => completeTodo(index)}>
              {todo.isCompleted ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => removeTodo(index)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Todo;
