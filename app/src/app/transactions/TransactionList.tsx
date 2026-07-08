'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import { Search, ArrowLeft, MoreVertical, Trash2 } from 'lucide-react';
import Link from 'next/link';
import './Transactions.css';

type TransactionListProps = {
  transactions: any[];
  categories: any[];
  lang?: string;
};

export function TransactionList({ transactions: initialTransactions, categories, lang = 'vi' }: TransactionListProps) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmMessage = lang === 'vi' 
      ? 'Bạn có chắc chắn muốn xóa giao dịch này không?' 
      : 'Are you sure you want to delete this transaction?';
      
    if (!window.confirm(confirmMessage)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTransactions(prev => prev.filter(t => t.id !== id));
      } else {
        alert(lang === 'vi' ? 'Xóa thất bại' : 'Failed to delete');
      }
    } catch (error) {
      console.error(error);
      alert(lang === 'vi' ? 'Lỗi hệ thống' : 'System error');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = (t.note || t.category.name).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || t.categoryId === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [transactions, searchTerm, activeFilter]);

  // Group by date
  const grouped = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    filteredTransactions.forEach(t => {
      const dateStr = new Date(t.date).toLocaleDateString('vi-VN');
      // Format logic for "Hôm nay", "Hôm qua" could be added here, keep it simple for now
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(t);
    });
    return groups;
  }, [filteredTransactions]);

  const uniqueCategories = useMemo(() => {
    const catIds = new Set(transactions.map(t => t.categoryId));
    return categories.filter(c => catIds.has(c.id));
  }, [transactions, categories]);

  return (
    <div className="transactions-client">
      <header className="page-header sticky-header">
        <Link href="/"><ArrowLeft size={24} className="icon-btn" /></Link>
        <h1 className="title-center">{lang === 'vi' ? 'Lịch Sử Giao Dịch' : 'Transaction History'}</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder={lang === 'vi' ? 'Tìm kiếm giao dịch...' : 'Search transactions...'}
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-chips">
        <button 
          className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          {lang === 'vi' ? 'Tất cả' : 'All'}
        </button>
        {uniqueCategories.map(c => (
          <button 
            key={c.id} 
            className={`chip ${activeFilter === c.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="transaction-groups">
        {Object.keys(grouped).length > 0 ? (
          Object.keys(grouped).map(date => (
            <div key={date} className="date-group">
              <h3 className="date-header">{date}</h3>
              <Card className="group-card">
                {grouped[date].map((t: any) => (
                  <div key={t.id} className="transaction-item">
                    <div 
                      className="category-icon" 
                      style={{ backgroundColor: `${t.category.color}15`, color: t.category.color }}
                    >
                      {t.category.name.charAt(0)}
                    </div>
                    <div className="transaction-details">
                      <p className="transaction-note">{t.note || t.category.name}</p>
                      <p className="transaction-date">
                        {new Date(t.date).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})} • {t.paymentMethod}
                      </p>
                    </div>
                    <div className={`transaction-amount ${t.category.type === 'EXPENSE' ? 'expense' : 'income'}`}>
                      {t.category.type === 'EXPENSE' ? '-' : '+'}{formatCurrency(t.amount)}
                      <button 
                        className="delete-transaction-btn"
                        onClick={() => handleDelete(t.id)}
                        disabled={deletingId === t.id}
                        title={lang === 'vi' ? 'Xóa giao dịch' : 'Delete transaction'}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>{lang === 'vi' ? 'Không tìm thấy giao dịch nào.' : 'No transactions found.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
