'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export function BudgetClient({ initialWeeklyBudget, categories: initialCategories, lang = 'vi' }: any) {
  const [weeklyBudget, setWeeklyBudget] = useState(initialWeeklyBudget.toString());
  const [categories, setCategories] = useState(initialCategories);
  const [saving, setSaving] = useState(false);

  const handleBudgetChange = (id: string, value: string) => {
    setCategories(categories.map((c: any) => 
      c.id === id ? { ...c, budgetLimit: parseFloat(value) || 0 } : c
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/budget', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weeklyBudget: parseFloat(weeklyBudget) || 0,
          categories: categories.map((c: any) => ({ id: c.id, budgetLimit: c.budgetLimit }))
        })
      });
      alert(lang === 'vi' ? 'Đã lưu thành công!' : 'Saved successfully!');
    } catch (e) {
      alert(lang === 'vi' ? 'Lỗi khi lưu.' : 'Error saving.');
    } finally {
      setSaving(false);
    }
  };

  const t = {
    title: lang === 'vi' ? 'Ngân Sách' : 'Budget',
    totalBudget: lang === 'vi' ? 'Ngân sách tổng' : 'Total Budget',
    totalHelp: lang === 'vi' ? 'Tổng số tiền bạn muốn chi tiêu trong tuần này.' : 'Total amount you want to spend this week.',
    catBudget: lang === 'vi' ? 'Ngân sách theo danh mục' : 'Category Budget',
    save: lang === 'vi' ? 'Lưu cài đặt' : 'Save Settings',
    saving: lang === 'vi' ? 'Đang lưu...' : 'Saving...'
  };

  return (
    <div className="budget-client">
      <header className="page-header sticky-header">
        <Link href="/profile"><ArrowLeft size={24} className="icon-btn" /></Link>
        <h1 className="title-center">{t.title}</h1>
        <div style={{ width: 24 }}></div> {/* spacer */}
      </header>

      <section className="total-budget-section">
        <h3 className="section-title">{t.totalBudget}</h3>
        <Card className="budget-card">
          <div className="budget-input-wrapper">
            <span className="currency-prefix">đ</span>
            <input 
              type="text" 
              inputMode="numeric"
              className="budget-input-large" 
              value={weeklyBudget ? Number(weeklyBudget).toLocaleString('en-US') : ''}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/[^0-9]/g, '');
                setWeeklyBudget(rawValue);
              }}
              placeholder="0"
            />
          </div>
          <p className="help-text">{t.totalHelp}</p>
        </Card>
      </section>

      <section className="category-budget-section">
        <h3 className="section-title">{t.catBudget}</h3>
        <Card className="budget-card">
          <div className="category-budget-list">
            {categories.map((c: any) => (
              <div key={c.id} className="cat-budget-item">
                <div className="cat-info">
                  <div className="category-icon-small" style={{ backgroundColor: `${c.color}15`, color: c.color }}>
                    {c.name.charAt(0)}
                  </div>
                  <span className="cat-name">{c.name}</span>
                </div>
                <div className="cat-input-wrapper">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    className="cat-budget-input"
                    value={c.budgetLimit ? Number(c.budgetLimit).toLocaleString('en-US') : ''}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/[^0-9]/g, '');
                      handleBudgetChange(c.id, rawValue);
                    }}
                    placeholder="0"
                  />
                  <span className="currency-suffix">đ</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
      
      <div className="save-container">
        <Button onClick={handleSave} disabled={saving} fullWidth>
          {saving ? t.saving : t.save}
        </Button>
      </div>
    </div>
  );
}
