import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './SessionWarning.css';

const SessionWarning = () => {
  const { logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let warningTimeout;
    let countdownInterval;

    // Mostrar advertencia 5 minutos antes del timeout (25 minutos de inactividad)
    const showWarningTime = 25 * 60 * 1000; // 25 minutos en milisegundos
    const totalTimeout = 30 * 60 * 1000; // 30 minutos en milisegundos

    warningTimeout = setTimeout(() => {
      setShowWarning(true);
      setTimeLeft(5 * 60); // 5 minutos restantes

      // Iniciar countdown
      countdownInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, showWarningTime);

    return () => {
      if (warningTimeout) clearTimeout(warningTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [logout]);

  const handleExtendSession = () => {
    setShowWarning(false);
    setTimeLeft(0);
    // El timer se reseteará automáticamente por la actividad del usuario
  };

  const handleLogout = () => {
    logout();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div className="session-warning-overlay">
      <div className="session-warning-modal">
        <div className="warning-header">
          <h3>⚠️ Sesión por expirar</h3>
        </div>
        <div className="warning-content">
          <p>Tu sesión expirará en <strong>{formatTime(timeLeft)}</strong> por inactividad.</p>
          <p>¿Deseas continuar con la sesión?</p>
        </div>
        <div className="warning-actions">
          <button 
            className="extend-button"
            onClick={handleExtendSession}
          >
            Continuar sesión
          </button>
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;
