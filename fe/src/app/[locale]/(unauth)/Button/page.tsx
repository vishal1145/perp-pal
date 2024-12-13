'use client';
import React from 'react';

const Button = ({ label, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-cyan-500 text-white px-12 py-3 rounded-lg shadow-md font-medium hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
