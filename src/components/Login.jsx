import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://66d012f0181d059277dd1d11.mockapi.io/User`)
      .then(response => response.json())
      .then(users => {
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
          onLogin(user.userid); 
        } else {
          alert('Invalid email or password');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <form onSubmit={handleSubmit}>
      <label>
  Email:
  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
</label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
