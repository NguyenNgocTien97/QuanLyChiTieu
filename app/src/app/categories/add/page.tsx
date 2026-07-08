'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import './AddCategory.css';

const PRESET_COLORS = [
  '#FF9F43', // Orange
  '#EE5A24', // Deep Orange
  '#EA2027', // Red
  '#ED4C67', // Pink
  '#9980FA', // Purple
  '#5758BB', // Deep Purple
  '#12CBC4', // Cyan
  '#1289A7', // Blue
  '#A3CB38', // Lime
  '#009432', // Green
];

export default function AddCategory() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState(false);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const cookieLang = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'vi';
    setLang(cookieLang);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !color) return;
    
    setLoading(true);
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          type: type,
          color: color,
          icon: name.charAt(0).toUpperCase()
        }),
      });
      router.push('/categories');
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const t = {
    title: lang === 'vi' ? 'Thêm Danh Mục' : 'Add Category',
    catName: lang === 'vi' ? 'Tên danh mục' : 'Category Name',
    catType: lang === 'vi' ? 'Loại danh mục' : 'Category Type',
    expense: lang === 'vi' ? 'Chi tiêu' : 'Expense',
    income: lang === 'vi' ? 'Thu nhập' : 'Income',
    color: lang === 'vi' ? 'Màu sắc' : 'Color',
    save: lang === 'vi' ? 'Lưu danh mục' : 'Save Category',
    saving: lang === 'vi' ? 'Đang lưu...' : 'Saving...'
  };

  return (
    <main className="add-category">
      <header className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Link href="/categories"><ArrowLeft size={24} style={{ color: 'var(--color-text-primary)' }} /></Link>
        <h1 className="title" style={{ margin: 0, fontSize: '20px', fontWeight: 600 }}>{t.title}</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <Card>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>{t.catName}</label>
            <input 
              type="text" 
              className="input-field"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ví dụ: Du lịch"
              required
            />
          </div>

          <div className="form-group">
            <label>{t.catType}</label>
            <div className="custom-select-wrapper">
              <div 
                className="input-field custom-select-trigger" 
                onClick={() => setShowType(!showType)}
              >
                <span>{type === 'EXPENSE' ? t.expense : t.income}</span>
                <ChevronDown size={20} color="var(--color-text-secondary)" />
              </div>
              {showType && (
                <>
                  <div className="dropdown-overlay" onClick={() => setShowType(false)}></div>
                  <div className="custom-dropdown">
                    <div 
                      className={`dropdown-item ${type === 'EXPENSE' ? 'active' : ''}`}
                      onClick={() => {
                        setType('EXPENSE');
                        setShowType(false);
                      }}
                    >
                      {t.expense}
                    </div>
                    <div 
                      className={`dropdown-item ${type === 'INCOME' ? 'active' : ''}`}
                      onClick={() => {
                        setType('INCOME');
                        setShowType(false);
                      }}
                    >
                      {t.income}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t.color}</label>
            <div className="color-options">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  className={`color-btn ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <Button type="submit" fullWidth disabled={loading || !name} className="submit-btn">
            {loading ? t.saving : t.save}
          </Button>
        </form>
      </Card>
    </main>
  );
}
