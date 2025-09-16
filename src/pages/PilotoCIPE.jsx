import React from 'react';
import Header from '../components/Header';
import Section from '../components/Section';
import Card from '../components/Card';
import { ProcessLoadIcon, ProcessFollowUpIcon, ProcessCloseIcon } from '../components/Icons';
import './PilotoCIPE.css';

const PilotoCIPE = () => {
  return (
    <div className="piloto-cipe-page">
      <Header />
      <main className="piloto-cipe-content">
        <div className="page-container">
          <h1>Piloto CIPE</h1>
          <p className="page-description">
            Sistema piloto para pruebas y validación de nuevas funcionalidades antes de su implementación en producción.
          </p>
          
          <div className="documents-container">
            <h3>Documentos operacionales:</h3>
            <div className="documents-links">
              <a href={`${import.meta.env.BASE_URL}piloto-cipe/p-protocolos`} className="document-link">Protocolos</a>
              <a href={`${import.meta.env.BASE_URL}piloto-cipe/p-script-de-atencion`} className="document-link">Script De Atención</a>
            </div>
          </div>
          
          <Section title="Funcionalidades">
            <div className="modules-grid">
              <Card
                icon={<ProcessLoadIcon />}
                title="Proceso de carga"
                description="..."
                pagePrefix="piloto"
              />
              <Card
                icon={<ProcessFollowUpIcon />}
                title="Proceso de Seguimiento"
                description="..."
                pagePrefix="piloto"
              />
              <Card
                icon={<ProcessCloseIcon />}
                title="Proceso de Cierre y análisis"
                description="..."
                pagePrefix="piloto"
              />
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default PilotoCIPE;
