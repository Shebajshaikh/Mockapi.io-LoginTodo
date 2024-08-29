import React, { useState } from 'react';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleLogout = () => {
    setUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {userId ? (
        <TodoList userId={userId} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
