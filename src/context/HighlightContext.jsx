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
    // Cargar desde localStorage, sin módulos por defecto
    const saved = localStorage.getItem('highlightedModules');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return new Set(parsed);
      } catch (error) {
        console.error('Error parsing saved highlighted modules:', error);
        return new Set();
      }
    }
    return new Set();
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
