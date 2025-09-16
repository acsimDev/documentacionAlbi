import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logoFiscalia from '../assets/img/LogoFiscalia.png';
import logoCIPE from '../assets/img/LogoCIPE.png';
import HighlightManager from './HighlightManager';
import { BackArrowIcon } from './Icons';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();

  // Función para manejar el botón de regreso
  const handleBackClick = () => {
    navigate(-1);
  };

  // Cerrar el menú desplegable cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo-container fiscalia-logo">
            <img src={logoFiscalia} alt="Logo Fiscalía" className="logo-image" />
          </div>
          <div className="logo-container cipe-logo">
            <img src={logoCIPE} alt="Logo CIPE" className="logo-image" />
          </div>
        </div>
        <div className="header-right">
          <h1 className="main-title">
            <span className="title-line-1">Plataforma Contactabilidad CIPE para MP</span>
            <span className="title-line-2">Diseño modular alineado con los objetivos del modelo</span>
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
          <div className="nav-tab-dropdown" ref={dropdownRef}>
            <button 
              className={`nav-tab ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Plataforma CIPE
              <span className="dropdown-arrow">▼</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link 
                  to="/" 
                  className={`dropdown-item ${location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Módulos
                </Link>
                <Link 
                  to="/p-plan" 
                  className={`dropdown-item ${location.pathname === '/p-plan' ? 'active' : ''}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Plan
                </Link>
              </div>
            )}
          </div>
          <Link 
            to="/piloto-cipe" 
            className={`nav-tab ${location.pathname === '/piloto-cipe' ? 'active' : ''}`}
          >
            Piloto CIPE
          </Link>
          <Link 
            to="/servicio-emergencia" 
            className={`nav-tab ${location.pathname === '/servicio-emergencia' ? 'active' : ''}`}
          >
            Servicio de emergencia CIPE
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
