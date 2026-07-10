import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, onClick }) => {
  return (
    <div className={`card ${className}`} style={style} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
};
