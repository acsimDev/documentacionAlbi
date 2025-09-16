import React, { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [moduleProgress, setModuleProgress] = useState(() => {
    // Cargar desde localStorage o usar valores por defecto
    const saved = localStorage.getItem('moduleProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
    
    // Valores por defecto
    return {
      'hub-integraciones': 0,
      'call-center': 0,
      'atenciones-ministerio': 0,
      'autoatencion': 25,
      'whatsapp': 0,
      'emergencia': 0,
      'evaluacion-riesgo': 0,
      'derivaciones': 0,
      'acompanamiento-legal': 0,
      'apoyo-psicosocial': 0,
      'prestaciones': 0,
      'monitoreo': 0,
      'configuracion': 0,
      'agentes-ia': 50,
      'mensajeria': 0,
      'seguridad': 0,
      'coexiste': 0,
      'gestion-interna': 0,
      'opa': 0,
      'transformacion-estrategica': 0
    };
  });

  const updateProgress = (moduleId, percentage) => {
    setModuleProgress(prev => {
      const newProgress = { ...prev, [moduleId]: percentage };
      // Guardar en localStorage
      localStorage.setItem('moduleProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getProgress = (moduleId) => {
    return moduleProgress[moduleId] || 0;
  };

  useEffect(() => {
    // Guardar cambios en localStorage
    localStorage.setItem('moduleProgress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  const value = {
    moduleProgress,
    updateProgress,
    getProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
