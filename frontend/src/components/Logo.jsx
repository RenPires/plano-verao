import React from 'react';

const Logo = ({ className = "w-12 h-12", variant = "default", ...props }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    
  >
    <defs>
      {/* Gradiente principal mais vibrante */}
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      
      {/* Gradiente das ondas mais contrastante */}
      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="50%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
      
      {/* Efeito de brilho */}
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
        <feMerge> 
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Círculo principal com gradiente mais vibrante */}
    <circle 
      cx="100" 
      cy="100" 
      r="75" 
      fill="url(#logoGradient)" 
      opacity="0.95"
      className="animate-gentle-glow"
    />
    
    {/* Detalhe interno do sol */}
    <circle cx="100" cy="100" r="55" fill="rgba(255,255,255,0.2)" />
    
    {/* Raios do sol - mais definidos */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
      <rect
        key={index}
        x="98"
        y="30"
        width="4"
        height="20"
        fill="rgba(255,255,255,0.8)"
        transform={`rotate(${rotation} 100 100)`}
        rx="2"
      />
    ))}
    
    {/* Ondas estilizadas - mais suaves e elegantes */}
    <path
      d="M35 125 Q100 95, 165 125"
      stroke="url(#waveGradient)"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
    <path
      d="M25 145 Q100 115, 175 145"
      stroke="url(#waveGradient)"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    
    {/* Reflexos na água */}
    <circle cx="65" cy="85" r="4" fill="white" opacity="0.9" />
    <circle cx="125" cy="80" r="3" fill="white" opacity="0.7" />
    <circle cx="90" cy="110" r="2" fill="white" opacity="0.5" />
    
    {/* Centro brilhante */}
    <circle cx="100" cy="100" r="15" fill="white" opacity="0.3" />
    <circle cx="100" cy="100" r="8" fill="white" opacity="0.6" />
  <Logo className="w-10 h-10 lg:w-14 lg:h-14 text-yellow-300 animate-wave-float" />
  </svg>
);

export default Logo;