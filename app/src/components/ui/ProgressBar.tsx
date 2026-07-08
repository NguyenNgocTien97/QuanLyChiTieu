import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  progress: number; // 0 to 100
  status?: 'success' | 'warning' | 'danger';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {
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

  return (
    <div className="progress-track">
      <div 
        className={`progress-fill ${colorClass}`} 
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};
