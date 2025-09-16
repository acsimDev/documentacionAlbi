import React, { useState } from 'react';
import './MainMenu.css';
import ProgressCircle from './ProgressCircle';
import { useProgress } from '../context/ProgressContext';
import { useHighlight } from '../context/HighlightContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, 
  faBullhorn, 
  faLaptopCode, 
  faClipboardList, 
  faHandshake, 
  faDollarSign, 
  faCogs,
  faFilePdf
} from '@fortawesome/free-solid-svg-icons';

const MainMenu = ({ onDocumentSelect }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeProgressMenu, setActiveProgressMenu] = useState(null);
  const { getProgress, updateProgress } = useProgress();
  const { isHighlighted, toggleHighlight } = useHighlight();

  // Función para generar el ID del módulo basado en el título
  const generateModuleId = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Función para manejar el toggle de highlighting
  const handleToggleHighlight = (e, moduleId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHighlight(moduleId);
  };

  // Función para manejar el click en el círculo de progreso
  const handleProgressClick = (e, moduleId) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProgressMenu(activeProgressMenu === moduleId ? null : moduleId);
  };


  // Función para actualizar el progreso
  const handleProgressUpdate = (moduleId, percentage) => {
    updateProgress(moduleId, percentage);
    setActiveProgressMenu(null);
  };

  // Función para cerrar el menú de progreso
  const closeProgressMenu = () => {
    setActiveProgressMenu(null);
  };

  const menuItems = [
    {
      id: 'corporativo',
      title: 'Corporativo',
      icon: faBuilding,
      submenu: [
        'Escrituras constitución',
        'Directorios / Poderes',
        'Pacto de accionistas',
        'Registro de accionistas',
        'Estructura de empresas',
        'Participaciones',
        'Incentivos/opciones a gtes',
        'Ofertas a inversionistas',
        'Definición abogado',
        'Contador y plan ctas',
        'Definición Banco',
        'Selección Gerentes'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: faBullhorn,
      submenu: [
        'BD de prospectos Latam',
        'Análisis de competencia',
        'Instituc. mayores desafíos',
        'Sitios web',
        'Estrategias marketing digital',
        'Imagen corporativa',
        'Posicionamiento de marca',
        'Participación en seminarios',
        'Política de referidos',
        'Agencia de medios',
        'Artículos de prensa',
        'Relato (Transf digital)',
        'Catálogo de servicios',
        'Catálogo de productos',
        'Videos usuarios/ayudas'
      ]
    },
    {
      id: 'plataformas',
      title: 'Plataformas',
      icon: faLaptopCode,
      submenu: [
        'Diseños de módulos/sistema',
        'Construcción de módulos',
        'Primeras instalaciones',
        'Documentación',
        'Respaldos',
        'Actualización currículos',
        'Empaquetamiento software',
        'Referencias por segmento',
        'Versiones marca blanca',
        'U/X',
        'Manuales de configuración',
        'Manuales de instalación',
        'Política seguridad de datos',
        'Metodologías',
        'Performance',
        'Mesa de ayuda',
        'Medios pago internacionales',
        'Operación de plataformas'
      ]
    },
    {
      id: 'selling',
      title: 'Selling package/ Plan',
      icon: faClipboardList,
      submenu: [
        'Propuestas tipo',
        'Esquema de ofertas',
        'Definición de pricing',
        'Problemática segmento/país',
        'Casos con resultados',
        'Testimonios',
        'Demos por segmento / país',
        'Videos promocionales',
        'Cronogramas tipo',
        'Plan comercial',
        'Contratación vendedores',
        'CRM prospectos/ventas',
        'Gestión de proyectos',
        'Compensation package'
      ]
    },
    {
      id: 'alianzas',
      title: 'Alianzas',
      icon: faHandshake,
      submenu: [
        'Influencers seg/país',
        'Negociación Agentes',
        'Negociación Integradores',
        'Negociación distribuidores',
        'Autoridades',
        'Gremios',
        'Joint Ventures Ues, IP, CFT',
        'Retail / Comercio Electrónico',
        '1ros clientes por industria',
        'Bancos, Cajas, empresas',
        'Distribuidoras'
      ]
    },
    {
      id: 'ventas',
      title: 'Ventas',
      icon: faDollarSign,
      submenu: [
        'Reclutar vendedores',
        'Coordinación reuniones',
        'Demos/material',
        'Analizar alternat. solución',
        'Generar propuestas',
        'Reuniones con autoridades',
        'Políticas públicas',
        'Generación pipeline',
        'Adm ciclo vtas por cliente',
        'Reuniones de avance',
        'Cierre de negocios',
        'Formalización de contratos',
        'Administración Proyecto',
        'Seguimiento y alertas',
        'Asegurar satisfacción',
        'Generar testimoniales'
      ]
    },
    {
      id: 'operaciones',
      title: 'Operaciones',
      icon: faCogs,
      submenu: [
        'Plan de ventas',
        'Flujo de caja',
        'Financiamiento',
        'Nuevas inversiones',
        'Informes tipo',
        'Directorios formales',
        'Gestión pipeline ventas',
        'Control de proyectos',
        'Satisfacción de clientes',
        'Reuniones de avance',
        'Registro Propiedad Intelectual',
        'Registro de marcas',
        'Contratos tipo (NDA; Agente...)',
        'Contrato HR (IP, Non compet..)',
        'Oficina y su operación'
      ]
    }
  ];

  const handleMenuClick = (menuId) => {
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  const handleSubmenuClick = (menuTitle, submenuItem) => {
    // Crear un nombre de archivo basado en el menú y submenú
    const fileName = `${menuTitle.toLowerCase().replace(/\s+/g, '-')}-${submenuItem.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    onDocumentSelect(fileName, submenuItem);
    setActiveDropdown(null);
  };

  return (
    <nav className="main-menu">
      <div className="menu-container">
        <h2 className="menu-title">Estructuración y Operación Negocio Tecnológico</h2>
        <div className="menu-grid">
          {menuItems.map((item) => {
            const moduleId = generateModuleId(item.title);
            const progress = getProgress(moduleId);
            const isHighlightedModule = isHighlighted(moduleId);
            
            return (
              <div key={item.id} className="menu-item">
                <div className={`menu-card ${isHighlightedModule ? 'highlighted' : ''}`}>
                  <div className="card-content">
                    <div className="card-icon">
                      <FontAwesomeIcon icon={item.icon} className="fa-icon" />
                    </div>
                    <div className="card-main">
                      <div className="card-header">
                        <h3 className="card-title">{item.title}</h3>
                        <button 
                          className={`status-tag ${isHighlightedModule ? 'active' : ''}`}
                          onClick={(e) => handleToggleHighlight(e, moduleId)}
                          title={isHighlightedModule ? 'Quitar de desarrollo' : 'Marcar en desarrollo'}
                        >
                          {isHighlightedModule ? 'En desarrollo' : '○'}
                        </button>
                      </div>
                      <p className="card-description">Estructuración y operación del negocio tecnológico</p>
                      <div className="card-footer">
                        <button
                          className="menu-button"
                          onClick={() => handleMenuClick(item.id)}
                        >
                          <span className="menu-text">Ver opciones</span>
                          <span className="dropdown-arrow">
                            {activeDropdown === item.id ? '▲' : '▼'}
                          </span>
                        </button>
                        <div className="card-progress">
                          <div 
                            className="progress-circle-container"
                            onClick={(e) => handleProgressClick(e, moduleId)}
                            title="Click para ajustar progreso"
                          >
                            <ProgressCircle percentage={progress} size={50} strokeWidth={4} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {activeDropdown === item.id && (
                  <div className="submenu">
                    {item.submenu.map((subItem, index) => (
                      <button
                        key={index}
                        className="submenu-item"
                        onClick={() => handleSubmenuClick(item.title, subItem)}
                      >
                        <FontAwesomeIcon icon={faFilePdf} className="submenu-icon" />
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}

                {activeProgressMenu === moduleId && (
                  <div className="progress-dropdown">
                    <div className="progress-dropdown-header">
                      <span>Ajustar Progreso</span>
                      <button 
                        className="progress-dropdown-close"
                        onClick={closeProgressMenu}
                        title="Cerrar"
                      >
                        ×
                      </button>
                    </div>
                    <div className="progress-dropdown-options">
                      {[0, 25, 50, 75, 100].map(percentage => (
                        <button
                          key={percentage}
                          className={`progress-dropdown-option ${progress === percentage ? 'active' : ''}`}
                          onClick={() => handleProgressUpdate(moduleId, percentage)}
                        >
                          {percentage}%
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MainMenu;
