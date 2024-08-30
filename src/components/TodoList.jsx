import React, { useState, useEffect } from 'react';

function TodoList({ userId, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos?userid=${userId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          setTodos([]);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
        setTodos([]);
      }
    };

    fetchTodos();
  }, [userId]);

  const addTodo = async () => {
    try {
      const response = await fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTodo,
          userid: userId,
          completed: false,
          description: '',
        }),
      });
      const todo = await response.json();
      if (todo && todo.id) {
        setTodos([...todos, todo]);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await fetch(`https://66d012f0181d059277dd1d11.mockapi.io/Todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      setEditingTodo(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, completed: !todo.completed });
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
          todos.map((todo) => (
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
