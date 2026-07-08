'use client';

import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  const handleClick = () => {
    alert('Không có thông báo mới');
  };

  return (
    <div className="bell-icon-wrapper cursor-pointer" onClick={handleClick}>
      <Bell size={20} className="text-primary" />
      <span className="notification-dot"></span>
    </div>
  );
}
