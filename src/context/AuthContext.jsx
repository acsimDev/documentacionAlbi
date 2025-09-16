import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  // Función para resetear el timer de inactividad
  const resetInactivityTimer = () => {
    lastActivityRef.current = Date.now();
    
    // Limpiar el timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Establecer nuevo timeout de 30 minutos 
    timeoutRef.current = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000);
  };

  // Función para detectar actividad del usuario
  const handleUserActivity = () => {
    if (isAuthenticated) {
      resetInactivityTimer();
    }
  };

  useEffect(() => {
    // Verificar si hay una sesión guardada en localStorage
    const savedAuth = localStorage.getItem('cipe_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      resetInactivityTimer();
    }
    setIsLoading(false);

    // Agregar event listeners para detectar actividad
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Limpiar event listeners al desmontar
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAuthenticated]);

  // Efecto para manejar el cierre de la ventana/pestaña
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Limpiar la sesión al cerrar la ventana
      localStorage.removeItem('cipe_auth');
    };

    const handleVisibilityChange = () => {
      // Si la página se oculta (cambio de pestaña, minimizar, etc.)
      if (document.hidden) {
        // Opcional: también limpiar sesión al cambiar de pestaña
        // localStorage.removeItem('cipe_auth');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const login = (username, password) => {
    // Credenciales fijas
    if (username === 'albi' && password === 'albi2025') {
      setIsAuthenticated(true);
      localStorage.setItem('cipe_auth', 'true');
      resetInactivityTimer();
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cipe_auth');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
