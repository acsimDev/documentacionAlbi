import React from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import Card from '../components/Card';
import { EmergencyActivationIcon, EmergencyManagementIcon, EmergencyFollowUpIcon } from '../components/Icons';
import './ServicioEmergenciaCIPE.css';

const ServicioEmergenciaCIPE = () => {
  return (
    <div className="servicio-emergencia-page">
      <Header />
      <main className="servicio-emergencia-content">
        <div className="page-container">
          <h1>Servicio de emergencia CIPE</h1>
          <p className="page-description">
            Sistema especializado para la atención de emergencias y situaciones críticas con protocolos específicos y respuesta inmediata.
          </p>
          
          <div className="documents-container">
            <h3>Documentos operacionales:</h3>
            <div className="documents-links">
              <a href={`${import.meta.env.BASE_URL}servicio-emergencia/se-protocolos`} className="document-link">Protocolos</a>
              <a href={`${import.meta.env.BASE_URL}servicio-emergencia/se-script-de-atencion`} className="document-link">Script De Atención</a>
            </div>
          </div>
          
          <Section title="Funcionalidades de Emergencia">
            <div className="modules-grid">
              <Card
                icon={<EmergencyActivationIcon />}
                title="Proceso de Activación de Medida de Protección"
                description="Sistema especializado para atención de emergencias."
                pagePrefix="emergencia"
              />
              <Card
                icon={<EmergencyManagementIcon />}
                title="Proceso de Gestión de Emergencias"
                description="Servicios especializados para atención de emergencias."
                pagePrefix="emergencia"
              />
              <Card
                icon={<EmergencyFollowUpIcon />}
                title="Proceso de Gestión de Seguimientos"
                description="Atención telefónica especializada las 24 horas del día."
                pagePrefix="emergencia"
              />
              
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default ServicioEmergenciaCIPE;
