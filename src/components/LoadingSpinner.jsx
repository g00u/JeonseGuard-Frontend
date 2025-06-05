import React from 'react';
import '../styles/LoadingSpinner.css'; 

const LoadingSpinner = ({ text = "로그인 처리 중입니다..." }) => (
  <div className="loading-spinner-container">
    <div className="spinner"></div>
    <p>{text}</p>
  </div>
);

export default LoadingSpinner;
