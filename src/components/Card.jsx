import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import ProgressCircle from './ProgressCircle';
import { useProgress } from '../context/ProgressContext';
import { useHighlight } from '../context/HighlightContext';

const Card = ({ icon, title, description, linkText = "Ver más", pagePrefix = "" }) => {
  const { getProgress } = useProgress();
  const { isHighlighted, toggleHighlight } = useHighlight();
  
  // Función para generar el ID del módulo basado en el título
  const generateModuleId = (title, pagePrefix = "") => {
    if (title.includes('Hub integraciones')) return 'hub-integraciones';
    if (title.includes('Call Center')) return 'call-center';
    if (title.includes('Atenciones Ministerio')) return 'atenciones-ministerio';
    if (title.includes('Autoatención')) return 'autoatencion';
    if (title.includes('WhatsApp')) return 'whatsapp';
    if (title.includes('línea emergencia')) return 'emergencia';
    if (title.includes('Evaluación de Riesgo')) return 'evaluacion-riesgo';
    if (title.includes('Derivaciones')) return 'derivaciones';
    if (title.includes('acompañamiento legal')) return 'acompanamiento-legal';
    if (title.includes('apoyo psicosocial')) return 'apoyo-psicosocial';
    if (title.includes('Prestaciones')) return 'prestaciones';
    if (title.includes('Monitoreo')) return 'monitoreo';
    if (title.includes('Configuración')) return 'configuracion';
    if (title.includes('Agentes inteligentes')) return 'agentes-ia';
    if (title.includes('mensajería')) return 'mensajeria';
    if (title.includes('Seguridad')) return 'seguridad';
    if (title.includes('Coexiste')) return 'coexiste';
    if (title.includes('Gestión Interna')) return 'gestion-interna';
    if (title.includes('OPA')) return 'opa';
    if (title.includes('Transformación Estratégica')) return 'transformacion-estrategica';
    
    // Módulos específicos para páginas nuevas
    if (title.includes('Ej 1')) return 'ej1-modulo';
    if (title.includes('Ej 2')) return 'ej2-modulo';
    if (title.includes('Ej 3')) return 'ej3-modulo';
    if (title.includes('Ej 4')) return 'ej4-modulo';
    
    // Módulos de Piloto CIPE
    if (title.includes('Proceso de carga')) return 'ej1-modulo';
    if (title.includes('Proceso de Seguimiento')) return 'ej2-modulo';
    if (title.includes('Proceso de Cierre y análisis')) return 'ej3-modulo';
    
    // Módulos de Servicio de Emergencia CIPE
    if (title.includes('Proceso de Activación de Medida de Protección')) return 'ej1-modulo';
    if (title.includes('Proceso de Gestión de Emergencias')) return 'ej2-modulo';
    if (title.includes('Proceso de Gestión de Seguimientos')) return 'ej3-modulo';
    
    return 'modulo-generico';
  };

  const baseModuleId = generateModuleId(title);
  const moduleId = pagePrefix ? `${pagePrefix}-${baseModuleId}` : baseModuleId;
  const progress = getProgress(moduleId);
  const isHighlightedModule = isHighlighted(moduleId);
  

  const handleToggleHighlight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHighlight(moduleId);
  };

  return (
    <div className={`card ${isHighlightedModule ? 'highlighted' : ''}`}>
      <div className="card-content">
                  <div className={`card-icon ${pagePrefix || 'principal'}`}>
            {typeof icon === 'string' ? <span className="emoji-icon">{icon}</span> : icon}
          </div>
        <div className="card-main">
          <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <button 
              className={`highlight-toggle ${isHighlightedModule ? 'active' : ''}`}
              onClick={handleToggleHighlight}
              title={isHighlightedModule ? 'Quitar de desarrollo' : 'Marcar en desarrollo'}
            >
              {isHighlightedModule ? 'En desarrollo' : '○'}
            </button>
          </div>
          <p className="card-description">{description}</p>
          <div className="card-footer">
            <Link to={`/module/${moduleId}`} className="card-link">
              {linkText}
            </Link>
            <div className="card-progress">
              <ProgressCircle percentage={progress} size={50} strokeWidth={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
