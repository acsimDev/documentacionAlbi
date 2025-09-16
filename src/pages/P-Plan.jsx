import React from 'react';
import Header from '../components/Header';
import './P-Plan.css';

const PPlan = () => {
  return (
    <div className="p-plan-page">
      <Header />
      <main className="p-plan-content">
        <div className="page-container">
          <h1>Plan CIPE</h1>
          <p className="page-description">
            Presentación del plan estratégico y operativo del Centro de Integración y Protección Especializada (CIPE).
          </p>
          
                    
          <div className="content-section">
            <h2>Presentación del Plan</h2>
            <div className="pdf-viewer-container">
              <iframe
                src={`${import.meta.env.BASE_URL}docs/Resumen Plan CIPE.pdf#toolbar=1&navpanes=1&scrollbar=1`}
                width="100%"
                height="600px"
                title="Resumen Plan CIPE"
                className="pdf-viewer"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PPlan;
