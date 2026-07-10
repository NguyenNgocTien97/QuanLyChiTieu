'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronRight, Wallet, LayoutGrid, Globe, Moon, Download, Trash2, LogOut } from 'lucide-react';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import './Profile.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState('vi');
  const { data: session } = useSession();

  useEffect(() => {
    Promise.resolve().then(() => {
      setIsDarkMode(document.body.classList.contains('dark') || localStorage.getItem('theme') === 'dark');
      const cookieLang = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'vi';
      setLang(cookieLang);
    });
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setName(data.name || 'Người Dùng');
        setEmail(data.email || 'user@example.com'); // Mock email since schema doesn't have it
        setLoading(false);
      });
  }, []);

  const handleExportData = async () => {
    try {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      if (Array.isArray(data)) {
        const csvRows = ['Date,Amount,Category,PaymentMethod,Note'];
        data.forEach(t => {
          csvRows.push(`${new Date(t.date).toISOString().split('T')[0]},${t.amount},${t.category?.name || ''},${t.paymentMethod},${t.note || ''}`);
        });
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
      }
    } catch (error) {
      console.error('Failed to export data', error);
      alert(lang === 'vi' ? 'Lỗi khi xuất dữ liệu' : 'Error exporting data');
    }
  };

  const handleDeleteData = async () => {
    if (confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa toàn bộ dữ liệu không?' : 'Are you sure you want to delete all data?')) {
      try {
        await fetch('/api/user/data', { method: 'DELETE' });
        alert(lang === 'vi' ? 'Đã xóa dữ liệu' : 'Data deleted');
      } catch (error) {
        alert(lang === 'vi' ? 'Lỗi khi xóa dữ liệu' : 'Error deleting data');
      }
    }
  };

  if (loading) return <main className="profile-page"><div className="loading-state">{lang === 'vi' ? 'Đang tải...' : 'Loading...'}</div></main>;

  return (
    <main className="profile-page">
      <header className="page-header center-header">
        <h1 className="title-center">{lang === 'vi' ? 'Cá Nhân' : 'Profile'}</h1>
      </header>

      <section className="user-profile-section">
        {session?.user?.image ? (
          <img src={session.user.image} alt="Avatar" className="avatar-large" style={{ borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div className="avatar-large">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="user-info-large">
          <h2 className="user-name">{session?.user?.name || name}</h2>
          <p className="user-email">{session?.user?.email || email}</p>
        </div>
      </section>

      <div className="settings-list">
        <div className="settings-group">
          <h3 className="settings-group-title">{lang === 'vi' ? 'TÀI KHOẢN' : 'ACCOUNT'}</h3>
          <Card className="settings-card">
            <Link href="/budget" className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-blue-light">
                  <Wallet size={18} className="text-blue" />
                </div>
                <span className="settings-label">{lang === 'vi' ? 'Quản lý ngân sách' : 'Budget Management'}</span>
              </div>
              <ChevronRight size={20} className="text-tertiary" />
            </Link>
            <div className="settings-divider"></div>
            <Link href="/categories" className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-orange-light">
                  <LayoutGrid size={18} className="text-orange" />
                </div>
                <span className="settings-label">{lang === 'vi' ? 'Tùy chỉnh danh mục' : 'Categories Customization'}</span>
              </div>
              <ChevronRight size={20} className="text-tertiary" />
            </Link>
          </Card>
        </div>

        <div className="settings-group">
          <h3 className="settings-group-title">{lang === 'vi' ? 'ĐỒNG BỘ ĐÁM MÂY' : 'CLOUD SYNC'}</h3>
          <Card className="settings-card">
            {session ? (
              <div className="settings-item cursor-pointer" onClick={() => signOut()}>
                <div className="settings-item-left">
                  <div className="settings-icon-wrapper bg-red-light">
                    <LogOut size={18} className="text-expense" />
                  </div>
                  <span className="settings-label text-expense">{lang === 'vi' ? 'Đăng xuất' : 'Sign Out'}</span>
                </div>
              </div>
            ) : (
              <div className="settings-item cursor-pointer" onClick={() => signIn('google')}>
                <div className="settings-item-left">
                  <div className="settings-icon-wrapper bg-white" style={{ border: '1px solid var(--color-border)' }}>
                    <GoogleIcon size={18} />
                  </div>
                  <span className="settings-label text-blue">{lang === 'vi' ? 'Đăng nhập Google để đồng bộ' : 'Sign in with Google to sync'}</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="settings-group">
          <h3 className="settings-group-title">{lang === 'vi' ? 'TÙY CHỈNH' : 'PREFERENCES'}</h3>
          <Card className="settings-card">
            <div className="settings-item cursor-pointer" onClick={() => {
              const nextLang = lang === 'vi' ? 'en' : 'vi';
              setLang(nextLang);
              document.cookie = `locale=${nextLang}; path=/`;
              window.location.reload();
            }}>
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-gray-light">
                  <Globe size={18} className="text-gray" />
                </div>
                <span className="settings-label">{lang === 'vi' ? 'Ngôn ngữ' : 'Language'}</span>
              </div>
              <div className="settings-item-right">
                <span className="settings-value">{lang === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                <ChevronRight size={20} className="text-tertiary" />
              </div>
            </div>
            <div className="settings-divider"></div>
            <div className="settings-item">
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-purple-light">
                  <Moon size={18} className="text-purple" />
                </div>
                <span className="settings-label">{lang === 'vi' ? 'Chế độ tối' : 'Dark Mode'}</span>
              </div>
              <div className="settings-item-right">
                <label className="toggle-switch">
                  <input type="checkbox" checked={isDarkMode} onChange={() => {
                    const next = !isDarkMode;
                    setIsDarkMode(next);
                    if (next) {
                      document.body.classList.add('dark');
                      localStorage.setItem('theme', 'dark');
                    } else {
                      document.body.classList.remove('dark');
                      localStorage.setItem('theme', 'light');
                    }
                  }} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </Card>
        </div>

        <div className="settings-group">
          <h3 className="settings-group-title">{lang === 'vi' ? 'DỮ LIỆU' : 'DATA'}</h3>
          <Card className="settings-card">
            <div className="settings-item cursor-pointer" onClick={handleExportData}>
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-green-light">
                  <Download size={18} className="text-green" />
                </div>
                <span className="settings-label">{lang === 'vi' ? 'Xuất dữ liệu (CSV)' : 'Export Data (CSV)'}</span>
              </div>
              <ChevronRight size={20} className="text-tertiary" />
            </div>
            <div className="settings-divider"></div>
            <div className="settings-item cursor-pointer" onClick={handleDeleteData}>
              <div className="settings-item-left">
                <div className="settings-icon-wrapper bg-red-light">
                  <Trash2 size={18} className="text-expense" />
                </div>
                <span className="settings-label text-expense">{lang === 'vi' ? 'Xóa toàn bộ dữ liệu' : 'Delete All Data'}</span>
              </div>
              <ChevronRight size={20} className="text-tertiary" />
            </div>
          </Card>
        </div>
      </div>
      
      <div className="app-version text-center">
        <p className="help-text">{lang === 'vi' ? 'Phiên bản 1.0.0' : 'Version 1.0.0'}</p>
      </div>
    </main>
  );
}
