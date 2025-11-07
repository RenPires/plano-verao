import React from 'react';

const Card = ({ 
  children, 
  className = "", 
  hover = true, 
  padding = "p-6",
  ...props 
}) => {
  return (
    <div
      className={`
        card 
        ${padding}
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-summer-800 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>
    {children}
  </div>
);

export default Card;