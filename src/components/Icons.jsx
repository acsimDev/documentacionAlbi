import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCogs, 
  faPhone, 
  faBuilding, 
  faComments, 
  faExclamationTriangle,
  faBalanceScale,
  faExchangeAlt,
  faBrain,
  faDollarSign,
  faChartLine,
  faUserCog,
  faEnvelope,
  faLock,
  faGlobe,
  faBuildingColumns,
  faClipboardList,
  faRobot,
  faFlask,
  faMicroscope,
  faChartBar,
  faExclamationCircle,
  faLifeRing,
  faPhoneAlt,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

// Icono para Hub de integraciones
export const IntegrationIcon = () => <FontAwesomeIcon icon={faCogs} size="2x" />;

// Iconos para módulos de atención
export const CallCenterIcon = () => <FontAwesomeIcon icon={faPhone} size="2x" />;
export const MinistryIcon = () => <FontAwesomeIcon icon={faBuilding} size="2x" />;
export const WhatsAppIcon = () => <FontAwesomeIcon icon={faComments} size="2x" />;
export const EmergencyIcon = () => <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />;

// Iconos para módulos de evaluación y derivación
export const RiskEvaluationIcon = () => <FontAwesomeIcon icon={faBalanceScale} size="2x" />;
export const ReferralIcon = () => <FontAwesomeIcon icon={faExchangeAlt} size="2x" />;

// Iconos para módulos de apoyo
export const LegalSupportIcon = () => <FontAwesomeIcon icon={faBalanceScale} size="2x" />;
export const PsychosocialIcon = () => <FontAwesomeIcon icon={faBrain} size="2x" />;
export const BenefitsIcon = () => <FontAwesomeIcon icon={faDollarSign} size="2x" />;

// Iconos para módulos de monitoreo
export const MonitoringIcon = () => <FontAwesomeIcon icon={faChartLine} size="2x" />;

// Iconos para módulos de gestión
export const SelfServiceIcon = () => <FontAwesomeIcon icon={faUserCog} size="2x" />;
export const ConfigurationIcon = () => <FontAwesomeIcon icon={faCogs} size="2x" />;
export const MessagingIcon = () => <FontAwesomeIcon icon={faEnvelope} size="2x" />;
export const SecurityIcon = () => <FontAwesomeIcon icon={faLock} size="2x" />;
export const CoexistenceIcon = () => <FontAwesomeIcon icon={faGlobe} size="2x" />;
export const InternalManagementIcon = () => <FontAwesomeIcon icon={faBuildingColumns} size="2x" />;
export const OPAManagementIcon = () => <FontAwesomeIcon icon={faClipboardList} size="2x" />;
export const StrategicTransformationIcon = () => <FontAwesomeIcon icon={faExchangeAlt} size="2x" />;
export const AIIcon = () => <FontAwesomeIcon icon={faRobot} size="2x" />;

// Iconos para Piloto CIPE
export const ProcessLoadIcon = () => <FontAwesomeIcon icon={faFlask} size="2x" />;
export const ProcessFollowUpIcon = () => <FontAwesomeIcon icon={faMicroscope} size="2x" />;
export const ProcessCloseIcon = () => <FontAwesomeIcon icon={faChartBar} size="2x" />;

// Iconos para Servicio de Emergencia CIPE
export const EmergencyActivationIcon = () => <FontAwesomeIcon icon={faExclamationCircle} size="2x" />;
export const EmergencyManagementIcon = () => <FontAwesomeIcon icon={faLifeRing} size="2x" />;
export const EmergencyFollowUpIcon = () => <FontAwesomeIcon icon={faPhoneAlt} size="2x" />;

// Icono para botón de regreso
export const BackArrowIcon = () => <FontAwesomeIcon icon={faArrowLeft} size="sm" />;