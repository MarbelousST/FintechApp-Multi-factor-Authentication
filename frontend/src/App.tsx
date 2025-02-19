// src/App.tsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Header from "./components/Header";

// Definir un componente PrivateRoute
// que redirige a /login si el usuario no está loggeado
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // si no está loggeado, redirigimos a /login
    return <LoginPage />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <div className='main'>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
