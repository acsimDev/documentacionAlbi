import React from 'react';
import './Section.css';
import logo1 from '../assets/img/logo1.png';

const Section = ({ title, children }) => {
  return (
    <div className="section">
      <h2 className="section-title">
        <img src={logo1} alt="Logo sección" className="section-icon" />
        {title}
      </h2>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
};

export default Section;
