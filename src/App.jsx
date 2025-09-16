import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import SessionWarning from './components/SessionWarning';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import PDFViewer from './components/PDFViewer';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentTitle, setDocumentTitle] = useState('');

  const handleDocumentSelect = (fileName, title) => {
    setSelectedDocument(fileName);
    setDocumentTitle(title);
  };

  const handleClosePDF = () => {
    setSelectedDocument(null);
    setDocumentTitle('');
  };

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
            <MainMenu onDocumentSelect={handleDocumentSelect} />
            {selectedDocument && (
              <PDFViewer 
                fileName={selectedDocument}
                documentTitle={documentTitle}
                onClose={handleClosePDF}
              />
            )}
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
