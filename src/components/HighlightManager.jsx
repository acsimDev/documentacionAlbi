import React, { useState } from 'react';
import { useHighlight } from '../context/HighlightContext';
import './HighlightManager.css';

const HighlightManager = () => {
  const { 
    highlightedModules, 
    clearAllHighlights
  } = useHighlight();
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="highlight-manager">
      <button 
        className="highlight-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Ver módulos en desarrollo"
      >
        🔧 {highlightedModules.length > 0 && `(${highlightedModules.length})`}
      </button>
      
      {isOpen && (
        <div className="highlight-panel">
          <div className="highlight-header">
            <h3>Módulos en Desarrollo</h3>
            <button 
              className="clear-all-btn"
              onClick={clearAllHighlights}
              disabled={highlightedModules.length === 0}
            >
              Limpiar todo
            </button>
          </div>
          
          {highlightedModules.length > 0 ? (
            <div className="highlight-list">
              <ul>
                {highlightedModules.map((id, index) => (
                  <li key={index}>{id}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="highlight-empty">
              <p>No hay módulos marcados como "en desarrollo"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HighlightManager;
