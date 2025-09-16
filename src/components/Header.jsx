import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logoAlbibot from '../assets/img/albibot.jpeg';
import HighlightManager from './HighlightManager';
import { BackArrowIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Función para manejar el botón de regreso
  const handleBackClick = () => {
    navigate(-1);
  };


  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo-container albibot-logo">
            <img src={logoAlbibot} alt="Logo Albibot" className="logo-image" />
          </div>
        </div>
        <div className="header-right">
          <h1 className="main-title">
            <span className="title-line-1">Plataforma de Documentación Albibot</span>
            <span className="title-line-2">Estructuración y Operación Negocio Tecnológico</span>
          </h1>
        </div>
      </div>
      <nav className="header-nav">
        <div className="nav-tabs">
          {location.pathname !== '/' && (
            <button 
              className="back-button"
              onClick={handleBackClick}
              title="Volver atrás"
            >
              <BackArrowIcon />
            </button>
          )}
          <Link 
            to="/" 
            className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}
          >
            Plataforma Albibot
          </Link>
        </div>
        <div className="nav-actions">
          <HighlightManager />
          <button 
            className="logout-button"
            onClick={logout}
            title="Cerrar sesión"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
