import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  progress: number; // 0 to 100
  status?: 'success' | 'warning' | 'danger';
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status, color, height }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  // Determine color based on status or progress percentage
  let colorClass = 'progress-fill-primary';
  if (status === 'success' || (clampedProgress < 65 && !status)) {
    colorClass = 'progress-fill-success';
  } else if (status === 'warning' || (clampedProgress >= 65 && clampedProgress < 85 && !status)) {
    colorClass = 'progress-fill-warning';
  } else if (status === 'danger' || (clampedProgress >= 85 && !status)) {
    colorClass = 'progress-fill-danger';
  }

  const fillStyle = color ? { width: `${clampedProgress}%`, backgroundColor: color } : { width: `${clampedProgress}%` };

  return (
    <div className="progress-track" style={height ? { height: `${height}px` } : {}}>
      <div 
        className={`progress-fill ${color ? '' : colorClass}`} 
        style={fillStyle}
      ></div>
    </div>
  );
};
