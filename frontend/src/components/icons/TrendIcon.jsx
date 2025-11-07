import React from 'react';

const TrendIcon = ({ 
  direction = "up", 
  className = "w-5 h-5", 
  color = "currentColor",
  ...props 
}) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    {...props}
  >
    {direction === "up" ? (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
      />
    ) : (
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" 
      />
    )}
  </svg>
);

export default TrendIcon;