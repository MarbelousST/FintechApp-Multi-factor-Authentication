// src/components/MFAValidate.tsx
import React, { useState } from 'react';
import { verifyMFALogin } from '../api/authApi';

type Props = {
  onMFASuccess: () => void;
};

const MFAValidate: React.FC<Props> = ({ onMFASuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await verifyMFALogin(code);
      if (data.message === 'MFA_OK') {
        onMFASuccess();
      } else {
        setError(data.error || 'Error al verificar MFA');
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error de conexión');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h3>Verificar Código MFA</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Código TOTP</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>
      <button type="submit">Verificar</button>
    </form>
  );
};

export default MFAValidate;
