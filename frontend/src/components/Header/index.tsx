import React from "react";
import "./index.css"; // Importamos los estilos
import { Link } from 'react-router-dom';
import Logo from "../../assets/logo_creze-1.svg"; // Importar el SVG


const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link to="/">
          <img src={Logo} className="logo" alt="Vite logo" />
        </Link>
        {/* Botones */}
        <div className="buttons">
          <div className="menu-item">
            <Link className="menu-link" to="/register">Registrarse</Link>{' '}
          </div>
          <div className="menu-item">
            <Link className="menu-link" to="/login">Iniciar Sesión</Link>{' '}
          </div>
          <div className="menu-item">
            <Link className="menu-link" to="/dashboard">Ir al Dashboard</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
