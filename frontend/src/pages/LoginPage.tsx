// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import MFAValidate from '../components/MFAValidate';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showMFA, setShowMFA] = useState(false);

  const handleMFANeeded = () => {
    setShowMFA(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleMFASuccess = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div>
      {!showMFA ? (
        <LoginForm 
          onMFANeeded={handleMFANeeded} 
          onLoginSuccess={handleLoginSuccess} 
        />
      ) : (
        <MFAValidate onMFASuccess={handleMFASuccess} />
      )}
    </div>
  );
};

export default LoginPage;