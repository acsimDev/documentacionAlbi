import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ percentage, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (percentage) => {
    if (percentage === 0) return '#6c757d'; // Gris
    if (percentage <= 25) return '#ffc107'; // Amarillo
    if (percentage <= 50) return '#a4d65e'; // Amarillo-verde claro
    if (percentage <= 75) return '#6bbf47'; // Verde medio
    return '#28a745'; // Verde
  };

  const getSizeClass = (size) => {
    if (size <= 40) return 'size-small';
    if (size <= 60) return 'size-medium';
    return 'size-large';
  };

  const getColorClass = (percentage) => {
    if (percentage === 0) return 'color-0';
    if (percentage <= 25) return 'color-25';
    if (percentage <= 50) return 'color-50';
    if (percentage <= 75) return 'color-75';
    return 'color-100';
  };

  const color = getColor(percentage);
  const sizeClass = getSizeClass(size);
  const colorClass = getColorClass(percentage);

  return (
    <div className={`progress-circle-container ${sizeClass} ${colorClass}`}>
      <svg
        className="progress-circle"
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Círculo de fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e9ecef"
          strokeWidth={strokeWidth}
        />
        {/* Círculo de progreso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="progress-stroke"
        />
      </svg>
      <div className="progress-text">
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressCircle;
