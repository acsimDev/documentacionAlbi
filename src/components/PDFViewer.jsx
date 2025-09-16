import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

// Configurar el worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ fileName, documentTitle, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Error al cargar el documento PDF');
    setIsLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const downloadPDF = () => {
    if (fileName) {
      const link = document.createElement('a');
      link.href = `/docs/${fileName}`;
      link.download = fileName;
      link.click();
    }
  };

  return (
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-container">
        <div className="pdf-viewer-header">
          <div className="pdf-viewer-title">
            <h3>{documentTitle || 'Documento PDF'}</h3>
            <span className="pdf-filename">{fileName}</span>
          </div>
          <div className="pdf-viewer-controls">
            <button 
              className="control-btn"
              onClick={downloadPDF}
              title="Descargar PDF"
            >
              📥 Descargar
            </button>
            <button 
              className="control-btn close-btn"
              onClick={onClose}
              title="Cerrar visor"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        <div className="pdf-viewer-toolbar">
          <div className="page-controls">
            <button 
              className="toolbar-btn"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              ◀ Anterior
            </button>
            <span className="page-info">
              Página {pageNumber} de {numPages || '...'}
            </span>
            <button 
              className="toolbar-btn"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              Siguiente ▶
            </button>
          </div>
          
          <div className="zoom-controls">
            <button 
              className="toolbar-btn"
              onClick={zoomOut}
              title="Alejar"
            >
              🔍-
            </button>
            <span className="zoom-info">
              {Math.round(scale * 100)}%
            </span>
            <button 
              className="toolbar-btn"
              onClick={zoomIn}
              title="Acercar"
            >
              🔍+
            </button>
            <button 
              className="toolbar-btn"
              onClick={resetZoom}
              title="Zoom original"
            >
              🔍
            </button>
          </div>
        </div>

        <div className="pdf-viewer-content">
          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando documento...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <p>{error}</p>
              <p className="error-detail">
                Asegúrate de que el archivo PDF existe en la carpeta /docs/
              </p>
            </div>
          )}
          
          {!isLoading && !error && (
            <div className="pdf-document-container">
              <Document
                file={`/docs/${fileName}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando documento...</p>
                  </div>
                }
              >
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale}
                  className="pdf-page"
                />
              </Document>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
