import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import SessionWarning from './components/SessionWarning';
import Header from './components/Header';
import Section from './components/Section';
import Card from './components/Card';
import ModuleDetail from './components/ModuleDetail';
import PilotoCIPE from './pages/PilotoCIPE';
import ServicioEmergenciaCIPE from './pages/ServicioEmergenciaCIPE';
import PProtocolos from './pages/P-Protocolos';
import PScriptDeAtencion from './pages/P-ScriptDeAtencion';
import SEProtocolos from './pages/SE-Protocolos';
import SEScriptDeAtencion from './pages/SE-ScriptDeAtencion';
import PPlan from './pages/P-Plan';
import { 
  IntegrationIcon,
  CallCenterIcon,
  MinistryIcon,
  WhatsAppIcon,
  EmergencyIcon,
  RiskEvaluationIcon,
  ReferralIcon,
  LegalSupportIcon,
  PsychosocialIcon,
  BenefitsIcon,
  MonitoringIcon,
  SelfServiceIcon,
  ConfigurationIcon,
  MessagingIcon,
  SecurityIcon,
  CoexistenceIcon,
  InternalManagementIcon,
  OPAManagementIcon,
  StrategicTransformationIcon,
  AIIcon
} from './components/Icons';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#16808C',
          color: 'white',
          fontSize: '18px'
        }}>
          Cargando...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="app">
      <SessionWarning />
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main className="main-content">
        {/* Hub de integraciones - Elemento central */}
        <div className="hub-section">
          <Card
            icon={<IntegrationIcon />}
            title="0. Hub integraciones"
            description="Central de integración entre todos los módulos del sistema."
          />
        </div>

        {/* Sección superior - Módulos para procesos de contactabilidad */}
        <Section title="Módulos para procesos de contactabilidad con nuevo paradigma">
          <div className="catalog-bar">
            <span>Catálogo servicios/tareas</span>
          </div>
          <div className="modules-grid">
            <Card
              icon={<CallCenterIcon />}
              title="1.1 Módulo Atenciones OI Call Center"
              description="Gestión de atenciones a través del call center operativo."
            />
            <Card
              icon={<MinistryIcon />}
              title="1.2 Módulo Atenciones Ministerio"
              description="Atenciones directas desde el Ministerio Público."
            />
            <Card
              icon={<WhatsAppIcon />}
              title="1.3 Módulo Atención WhatsApp"
              description="Atención a través de WhatsApp Business."
            />
            <Card
              icon={<RiskEvaluationIcon />}
              title="2. Módulo Evaluación de Riesgo"
              description="Evaluación y análisis de riesgos en los casos."
            />
            <Card
              icon={<SelfServiceIcon />}
              title="9. Módulo Autoatención"
              description="Sistema de autoatención para víctimas y abogados."
            />
            <Card
              icon={<AIIcon />}
              title="11. Módulo Agentes inteligentes y multiagentes"
              description="Sistema de agentes inteligentes y multiagentes."
            />
            <Card
              icon={<InternalManagementIcon />}
              title="16. Módulo Gestión Interna T."
              description="Gestión interna de MP transitoria."
            />
          </div>
        </Section>

        {/* Sección media - Procesos de apoyo y protección */}
        <Section title="Procesos de apoyo y protección mejorados">
          <div className="modules-grid">
            <Card
              icon={<EmergencyIcon />}
              title="3. Módulo atenciones línea emergencia"
              description="Gestión de atenciones de emergencia y urgencia."
            />
            <Card
              icon={<ReferralIcon />}
              title="4. Módulo Derivaciones"
              description="Sistema de derivaciones entre diferentes áreas."
            />
            <Card
              icon={<PsychosocialIcon />}
              title="6. Módulo atención apoyo psicosocial"
              description="Apoyo psicosocial integral para víctimas y familiares."
            />
            <Card
              icon={<LegalSupportIcon />}
              title="7. Módulo atención acompañamiento legal"
              description="Acompañamiento legal especializado para víctimas."
            />
            <Card
              icon={<BenefitsIcon />}
              title="8. Módulo gestión de Prestaciones"
              description="Gestión de prestaciones y beneficios."
            />
          </div>
        </Section>

        {/* Sección media - Nueva Gestión integral KPI */}
        <Section title="Nueva Gestión integral KPI">
          <div className="modules-grid">
            <Card
              icon={<MessagingIcon />}
              title="12. Módulo gestión mensajería y alertas"
              description="Gestión de mensajería y sistema de alertas."
            />
            <Card
              icon={<SecurityIcon />}
              title="13. Módulo Seguridad"
              description="Gestión de seguridad y protección de datos."
            />
            <Card
              icon={<CoexistenceIcon />}
              title="15. Coexiste otras aplicaciones satélites regionales"
              description="Integración con aplicaciones satélites regionales."
            />
          </div>
        </Section>

        {/* Sección inferior - Módulos complementarios */}
        <Section title="Módulos complementarios">
          <div className="modules-grid">
            <Card
              icon={<MonitoringIcon />}
              title="5. Módulo Monitoreo y Seguimiento"
              description="Monitoreo y seguimiento de casos y procesos."
            />
            <Card
              icon={<ConfigurationIcon />}
              title="10. Módulo Configuración y perfilamiento global"
              description="Configuración general y perfilamiento del sistema."
            />
            <Card
              icon={<OPAManagementIcon />}
              title="17. Módulo gestión OPA T."
              description="Gestión de OPA (Oficina de Protección y Atención)."
            />
          </div>
        </Section>

        {/* Módulo de Transformación Estratégica */}
        <div className="strategic-section">
          <Card
            icon={<StrategicTransformationIcon />}
            title="14. Módulo Transformación Estratégica. (MTE)"
            description="Transformación estratégica del modelo de atención."
          />
        </div>
            </main>
          </>
        } />
        <Route path="/piloto-cipe" element={<PilotoCIPE />} />
        <Route path="/piloto-cipe/p-protocolos" element={<PProtocolos />} />
        <Route path="/piloto-cipe/p-script-de-atencion" element={<PScriptDeAtencion />} />
        <Route path="/servicio-emergencia" element={<ServicioEmergenciaCIPE />} />
        <Route path="/servicio-emergencia/se-protocolos" element={<SEProtocolos />} />
        <Route path="/servicio-emergencia/se-script-de-atencion" element={<SEScriptDeAtencion />} />
        <Route path="/p-plan" element={<PPlan />} />
        <Route path="/module/:moduleId" element={<ModuleDetail />} />
      </Routes>
    </div>
  );
}

export default App;
