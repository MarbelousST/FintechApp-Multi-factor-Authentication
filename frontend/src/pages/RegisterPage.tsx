// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { registerUser } from '../api/authApi';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      const data = await registerUser(username, email, password);
      // data => {message: 'Usuario creado exitosamente'}
      setSuccessMsg(data.message || 'Registro exitoso');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error al registrarse');
    }
  };

  return (
    <div className='main-register'>
      <div className='main-form'>
        <h2>Registro</h2>
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleRegister} className='form'>
          <div className='form-item'>
            <label>Username:</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className='form-item'>
            <label>Email:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className='form-item'>
            <label>Contraseña:</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
