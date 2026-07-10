'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';
import { translateCategory } from '@/lib/utils';
import './AddTransaction.css';

interface Category {
  id: string;
  name: string;
  type: string;
  color: string;
}

export default function AddTransaction() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const getLocalDateString = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [date, setDate] = useState(getLocalDateString(new Date()));
  const [paymentMethod, setPaymentMethod] = useState('Tiền mặt');
  const [loading, setLoading] = useState(false);
  
  const [showCat, setShowCat] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [lang, setLang] = useState('vi');

  useEffect(() => {
    const cookieLang = document.cookie.split('; ').find(row => row.startsWith('locale='))?.split('=')[1] || 'vi';
    setLang(cookieLang);
    if (cookieLang !== 'vi') setPaymentMethod('Cash');

    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId) return;
    
    setLoading(true);
    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          note: note,
          categoryId: categoryId,
          date: date,
          paymentMethod: paymentMethod === 'Cash' ? 'Tiền mặt' : paymentMethod === 'Transfer' ? 'Chuyển khoản' : paymentMethod
        }),
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    const viDays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const enDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = lang === 'vi' ? viDays[d.getDay()] : enDays[d.getDay()];
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dayName}, ${dd}/${mm}/${yyyy}`;
  };

  const selectedCategory = categories.find(c => c.id === categoryId);

  // Calculate min and max dates
  const today = new Date();
  const maxDate = getLocalDateString(today);
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);
  const minDate = getLocalDateString(twoWeeksAgo);

  const t = {
    title: lang === 'vi' ? 'Thêm Giao Dịch' : 'Add Transaction',
    amount: lang === 'vi' ? 'Số tiền (VND)' : 'Amount (VND)',
    category: lang === 'vi' ? 'Danh mục' : 'Category',
    selectCategory: lang === 'vi' ? 'Chọn danh mục' : 'Select category',
    income: lang === 'vi' ? '(Thu)' : '(Income)',
    expense: lang === 'vi' ? '(Chi)' : '(Expense)',
    note: lang === 'vi' ? 'Ghi chú' : 'Note',
    notePlaceholder: lang === 'vi' ? 'Ví dụ: Ăn trưa' : 'e.g. Lunch',
    date: lang === 'vi' ? 'Ngày' : 'Date',
    payment: lang === 'vi' ? 'Thanh toán' : 'Payment',
    save: lang === 'vi' ? 'Lưu giao dịch' : 'Save Transaction',
    saving: lang === 'vi' ? 'Đang lưu...' : 'Saving...'
  };

  const payOptions = lang === 'vi' ? ['Tiền mặt', 'Chuyển khoản'] : ['Cash', 'Transfer'];

  return (
    <main className="add-transaction">
      <header className="page-header">
        <h1 className="title">{t.title}</h1>
      </header>

      <Card>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>{t.amount}</label>
            <input 
              type="text" 
              inputMode="numeric"
              className="input-field amount-input"
              value={amount ? Number(amount).toLocaleString('en-US') : ''}
              onChange={e => {
                const rawValue = e.target.value.replace(/[^0-9]/g, '');
                setAmount(rawValue);
              }}
              placeholder="0"
              required
            />
          </div>

          <div className="form-group">
            <label>{t.category}</label>
            <div className="custom-select-wrapper">
              <div 
                className="input-field custom-select-trigger" 
                onClick={() => setShowCat(!showCat)}
              >
                <span>
                  {selectedCategory 
                    ? `${translateCategory(selectedCategory.name, lang)} ${selectedCategory.type === 'INCOME' ? t.income : t.expense}` 
                    : t.selectCategory}
                </span>
                <ChevronDown size={20} color="var(--color-text-secondary)" />
              </div>
              {showCat && (
                <>
                  <div className="dropdown-overlay" onClick={() => setShowCat(false)}></div>
                  <div className="custom-dropdown">
                    {categories.map(c => (
                      <div 
                        key={c.id} 
                        className={`dropdown-item ${c.id === categoryId ? 'active' : ''}`}
                        onClick={() => {
                          setCategoryId(c.id);
                          setShowCat(false);
                        }}
                      >
                        {translateCategory(c.name, lang)} {c.type === 'INCOME' ? t.income : t.expense}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>{t.note}</label>
            <input 
              type="text" 
              className="input-field"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder={t.notePlaceholder}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>{t.date}</label>
              <div 
                className="input-field date-display-wrapper" 
                style={{display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative'}}
                onClick={() => (document.getElementById('dateInput') as HTMLInputElement)?.showPicker?.()}
              >
                <span style={{ fontSize: '14px' }}>{formatDateDisplay(date)}</span>
                <input 
                  id="dateInput"
                  type="date" 
                  style={{position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none'}}
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={e => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="form-group flex-1">
              <label>{t.payment}</label>
              <div className="custom-select-wrapper">
                <div 
                  className="input-field custom-select-trigger" 
                  onClick={() => setShowPay(!showPay)}
                  style={{ padding: '0 12px' }}
                >
                  <span style={{ fontSize: '14px' }}>{paymentMethod}</span>
                  <ChevronDown size={18} color="var(--color-text-secondary)" />
                </div>
                {showPay && (
                  <>
                    <div className="dropdown-overlay" onClick={() => setShowPay(false)}></div>
                    <div className="custom-dropdown">
                      {payOptions.map(p => (
                        <div 
                          key={p} 
                          className={`dropdown-item ${p === paymentMethod ? 'active' : ''}`}
                          onClick={() => {
                            setPaymentMethod(p);
                            setShowPay(false);
                          }}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={loading || !amount || !categoryId} className="submit-btn">
            {loading ? t.saving : t.save}
          </Button>
        </form>
      </Card>
    </main>
  );
}
