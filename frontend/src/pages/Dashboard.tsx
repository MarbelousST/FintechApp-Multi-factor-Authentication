// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import { disableMFA, logoutUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import MFASetup from '../components/MFASetup';

const Dashboard: React.FC = () => {
  const { setIsLoggedIn } = useAuth();
  const [showMFASetup, setShowMFASetup] = useState(false);
  const [disableMsg, setDisableMsg] = useState('');
  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
    } catch (err) {
      console.error('Error al cerrar sesión', err);
    }
  };

  const handleDisableMFA = async () => {
    setError('');
    setDisableMsg('');
    try {
      const data = await disableMFA();
      setDisableMsg(data.message);  // e.g. 'MFA deshabilitada'
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Error al deshabilitar MFA');
    }
  };

  return (
    <div className='main-dashboard'>
      <div className='main-form'>
        <h2>Dashboard</h2>
        <p>¡Bienvenido a tu área privada!</p>
        <div className='buttons-container'>
          {showMFASetup ? (
            <MFASetup />
          ) : (
            <button onClick={() => setShowMFASetup(true)}>
              Habilitar MFA
            </button>
          )}
          { !showMFASetup ? (<button onClick={handleDisableMFA}>Deshabilitar MFA</button>) : <></>}
          {disableMsg && <p style={{color: 'green'}}>{disableMsg}</p>}
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
        <hr />

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;