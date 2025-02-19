// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { loginUser } from '../api/authApi';

type Props = {
  onMFANeeded: () => void;
  onLoginSuccess: () => void;
};

const LoginForm: React.FC<Props> = ({ onMFANeeded, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(username, password);
      if (data.message === 'MFA_REQUIRED') {
        onMFANeeded();
      } else if (data.message === 'LOGIN_OK') {
        onLoginSuccess();
      } else {
        setError('Respuesta desconocida del servidor.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className='main-login'>
      <div className='main-form'>
        <h2>Login</h2>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='form-item'>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='form-item'>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div >
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
