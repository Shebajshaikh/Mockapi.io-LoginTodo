import React, { useState } from 'react';
import {
  useGetTodosByUserQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../features/todoApi';

function TodoList({ userId, onLogout }) {
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  const { data: todos = [], refetch } = useGetTodosByUserQuery(userId);
  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleAddTodo = async () => {
    try {
      await addTodo({
        title: newTodo,
        userid: userId,
        completed: false,
        description: '',
      }).unwrap();
      setNewTodo('');
      refetch();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      refetch();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updatedFields) => {
    try {
      await updateTodo({ id, ...updatedFields }).unwrap();
      setEditingTodo(null);
      refetch();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await handleUpdateTodo(id, { ...todo, completed: !todo.completed });
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
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? '(Completed)' : ''}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              <button onClick={() => toggleComplete(todo.id)}>Toggle Complete</button>
              <button onClick={() => setEditingTodo(todo)}>Edit</button>
              {editingTodo && editingTodo.id === todo.id && (
                <div>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                  />
                  <button onClick={() => handleUpdateTodo(editingTodo.id, editingTodo)}>Save</button>
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
