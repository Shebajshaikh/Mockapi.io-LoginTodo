import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store';
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
    <Provider store={store}>
      <div className="min-h-screen bg-gray-200">
        {userId ? (
          <TodoList userId={userId} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Provider>
  );
}

export default App;
