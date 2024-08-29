import React, { useState, useEffect } from 'react';

function TodoList({ userId, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos?userid=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]); 
        }
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setTodos([]); 
      });
  }, [userId]);

  const addTodo = () => {
    fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        title: newTodo, 
        userid: userId, 
        completed: false, 
        description: '' 
      })
    })
      .then(response => response.json())
      .then(todo => {
        if (todo && todo.id) {
          setTodos([...todos, todo]);
        }
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  const deleteTodo = (id) => {
    fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  const updateTodo = (id, updatedFields) => {
    fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
      .then(response => response.json())
      .then(updatedTodo => {
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
        setEditingTodo(null);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      updateTodo(id, { ...todo, completed: !todo.completed });
    }
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? '(Completed)' : ''}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => toggleComplete(todo.id)}>Toggle Complete</button>
              <button onClick={() => setEditingTodo(todo)}>Edit</button>
              {editingTodo && editingTodo.id === todo.id && (
                <div>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  />
                  <button onClick={() => updateTodo(editingTodo.id, editingTodo)}>Save</button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
