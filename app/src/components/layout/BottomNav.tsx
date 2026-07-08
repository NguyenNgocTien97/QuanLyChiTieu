'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ReceiptText, Plus, BarChart2, User } from 'lucide-react';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const [lang, setLang] = React.useState('vi');

  React.useEffect(() => {
    Promise.resolve().then(() => {
      const cookieLang = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'vi';
      setLang(cookieLang);
    });
  }, []);

  const navItems = [
    { name: lang === 'vi' ? 'Trang chủ' : 'Home', path: '/', icon: Home },
    { name: lang === 'vi' ? 'Giao dịch' : 'Transactions', path: '/transactions', icon: ReceiptText },
    { name: lang === 'vi' ? 'Thêm' : 'Add', path: '/add', icon: Plus, isMain: true },
    { name: lang === 'vi' ? 'Thống kê' : 'Stats', path: '/stats', icon: BarChart2 },
    { name: lang === 'vi' ? 'Cá nhân' : 'Profile', path: '/profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      <ul className="bottom-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <li key={item.path} className={`bottom-nav-item ${item.isMain ? 'main-item' : ''}`}>
              <Link href={item.path} className={`bottom-nav-link ${isActive ? 'active' : ''}`}>
                <Icon className="nav-icon" size={item.isMain ? 32 : 24} />
                {!item.isMain && <span className="nav-label">{item.name}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
