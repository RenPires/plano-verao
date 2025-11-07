import React from 'react';

const LogoIcon = ({ className = "w-8 h-8", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient id="iconWave" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
    
    <circle cx="16" cy="16" r="12" fill="url(#iconGradient)" />
    <path
      d="M6 20 Q16 15, 26 20"
      stroke="url(#iconWave)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="16" cy="16" r="3" fill="white" opacity="0.8" />
  </svg>
);

export default LogoIcon;