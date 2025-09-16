import React, { createContext, useContext, useState, useEffect } from 'react';

const HighlightContext = createContext();

export const useHighlight = () => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight debe ser usado dentro de HighlightProvider');
  }
  return context;
};

export const HighlightProvider = ({ children }) => {
  const [highlightedModules, setHighlightedModules] = useState(() => {
    // Módulos que siempre aparecen "en desarrollo" por defecto
    const defaultHighlightedModules = [
      'hub-integraciones',      // 0. Hub integraciones
      'call-center',           // 1.1 Módulo Atenciones OI Call Center
      'atenciones-ministerio', // 1.2 Módulo Atenciones Ministerio
      'emergencia',            // 3. Módulo atenciones línea emergencia
      'autoatencion',          // 9. Módulo Autoatención
      'configuracion',         // 10. Módulo Configuración
      'agentes-ia',            // 11. Módulo Agentes inteligentes
      'seguridad'              // 13. Módulo Seguridad
    ];

    // Cargar desde localStorage o usar módulos por defecto
    const saved = localStorage.getItem('highlightedModules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Combinar módulos guardados con los por defecto
        const combined = [...new Set([...defaultHighlightedModules, ...parsed])];
        return new Set(combined);
      } catch (error) {
        console.error('Error parsing saved highlighted modules:', error);
        return new Set(defaultHighlightedModules);
      }
    }
    return new Set(defaultHighlightedModules);
  });

  const toggleHighlight = (moduleId) => {
    setHighlightedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const isHighlighted = (moduleId) => {
    return highlightedModules.has(moduleId);
  };

  const clearAllHighlights = () => {
    setHighlightedModules(new Set());
  };

  const highlightModule = (moduleId) => {
    setHighlightedModules(prev => new Set([...prev, moduleId]));
  };

  const unhighlightModule = (moduleId) => {
    setHighlightedModules(prev => {
      const newSet = new Set(prev);
      newSet.delete(moduleId);
      return newSet;
    });
  };

  // Guardar en localStorage cada vez que cambie highlightedModules
  useEffect(() => {
    localStorage.setItem('highlightedModules', JSON.stringify(Array.from(highlightedModules)));
  }, [highlightedModules]);

  return (
    <HighlightContext.Provider
      value={{
        highlightedModules: Array.from(highlightedModules),
        toggleHighlight,
        isHighlighted,
        clearAllHighlights,
        highlightModule,
        unhighlightModule
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};
