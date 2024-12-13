// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5001/login', { username, password }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          localStorage.setItem('token', response.data.token); // Stocker le jeton
          navigate('/admin'); // Redirige vers la page d'administration après connexion
    } catch (err) {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div>
      <h2>Connexion Admin</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Login;
