import React, { useState } from 'react';
import { useGetUserQuery } from '../features/todoApi';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { data: users = [] } = useGetUserQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      onLogin(user.userid); 
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text"
           value={email} 
           onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password"
           value={password} 
           onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
