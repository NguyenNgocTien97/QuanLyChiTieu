import { getDefaultUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { formatCurrency, getStartAndEndOfWeek, translateCategory } from '@/lib/utils';
import { ArrowDownToLine, ArrowUpToLine, ListTodo, PieChart } from 'lucide-react';
import { NotificationBell } from '@/components/ui/NotificationBell';
import './Dashboard.css';

export default async function Dashboard() {
  const user = await getDefaultUser();
  const { start, end } = getStartAndEndOfWeek();
  const cookieStore = await cookies();
  const lang = cookieStore.get('locale')?.value || 'vi';

  // Fetch all transactions to calculate the correct all-time balance
  const allTransactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    include: { category: true },
    orderBy: { date: 'desc' },
  });

  const totalSpent = allTransactions
    .filter(t => t.category.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = allTransactions
    .filter(t => t.category.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = totalIncome - totalSpent;
  const recentTransactions = allTransactions.slice(0, 5); // Take top 5

  const weeklyTransactions = allTransactions.filter(t => 
    new Date(t.date) >= start && new Date(t.date) <= end
  );

  const categorySpending = weeklyTransactions.reduce((acc, t) => {
    if (t.category.type === 'EXPENSE') {
      acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
    }
    return acc;
  }, {} as Record<string, number>);

  const budgetedCategories = (await prisma.category.findMany({
    where: { userId: user.id, budgetLimit: { not: null } }
  })).map(cat => ({
    ...cat,
    spent: categorySpending[cat.id] || 0
  }));

  return (
    <main className="dashboard">
      <header className="app-header-new">
        <div className="header-left">
          <div className="user-avatar-small">
            {(user.name || 'U').charAt(0)}
          </div>
          <div className="greeting">
            <span className="greeting-text">{lang === 'vi' ? 'Xin chào,' : 'Hello,'}</span>
            <span className="greeting-name">{user.name}</span>
          </div>
        </div>
        <div className="header-right">
          <NotificationBell />
        </div>
      </header>

      <section className="budget-section">
        <div className="balance-card">
          <div className="balance-header">
            <span className="balance-label">{lang === 'vi' ? 'Số dư hiện tại' : 'Current Balance'}</span>
            <div className="card-type">
              <span className="visa-logo">VISA</span>
            </div>
          </div>
          <h2 className="balance-amount">{formatCurrency(remaining)}</h2>
          <div className="balance-footer">
            <span className="card-number">**** **** **** 1234</span>
            <span className="card-expiry">12/28</span>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <Link href="/add" className="action-card-new">
          <div className="action-icon-new expense-icon-new"><ArrowDownToLine size={24} /></div>
          <span className="action-label">{lang === 'vi' ? 'Thêm khoản chi' : 'Add Expense'}</span>
        </Link>
        <Link href="/add" className="action-card-new">
          <div className="action-icon-new income-icon-new"><ArrowUpToLine size={24} /></div>
          <span className="action-label">{lang === 'vi' ? 'Thêm thu nhập' : 'Add Income'}</span>
        </Link>
        <Link href="/transactions" className="action-card-new">
          <div className="action-icon-new neutral-icon-new"><ListTodo size={24} /></div>
          <span className="action-label">{lang === 'vi' ? 'Lịch sử' : 'History'}</span>
        </Link>
        <Link href="/stats" className="action-card-new">
          <div className="action-icon-new neutral-icon-new"><PieChart size={24} /></div>
          <span className="action-label">{lang === 'vi' ? 'Báo cáo' : 'Reports'}</span>
        </Link>
      </section>

      {budgetedCategories.length > 0 && (
        <section className="budget-progress-section" style={{ padding: '0 1.25rem', marginBottom: '1.5rem' }}>
          <div className="section-header">
            <h3 className="section-title">{lang === 'vi' ? 'Ngân sách danh mục (Tuần này)' : 'Category Budget (This Week)'}</h3>
          </div>
          <Card className="budget-progress-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {budgetedCategories.map(cat => {
              const progress = Math.min((cat.spent / (cat.budgetLimit || 1)) * 100, 100);
              const isOver = cat.spent > (cat.budgetLimit || 0);
              return (
                <div key={cat.id} className="category-progress-item">
                  <div className="progress-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                    <span className="category-name font-medium">{translateCategory(cat.name, lang)}</span>
                    <span className={`progress-text ${isOver ? 'text-expense font-bold' : 'text-secondary'}`}>
                      {formatCurrency(cat.spent)} / {formatCurrency(cat.budgetLimit || 0)}
                    </span>
                  </div>
                  <ProgressBar 
                    progress={progress} 
                    color={isOver ? '#ef4444' : cat.color} 
                    height={8} 
                  />
                </div>
              );
            })}
          </Card>
        </section>
      )}

      <section className="recent-transactions">
        <div className="section-header">
          <h3 className="section-title">{lang === 'vi' ? 'Giao dịch gần đây' : 'Recent Transactions'}</h3>
          <Link href="/transactions" className="view-all">{lang === 'vi' ? 'Xem tất cả' : 'View All'}</Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="transaction-list">
            {recentTransactions.map((t) => (
              <div key={t.id} className="transaction-item">
                <div 
                  className="category-icon" 
                  style={{ backgroundColor: `${t.category.color}15`, color: t.category.color }}
                >
                  {translateCategory(t.category.name, lang).charAt(0)}
                </div>
                <div className="transaction-details">
                  <p className="transaction-note">{t.note || translateCategory(t.category.name, lang)}</p>
                  <p className="transaction-date">
                    {new Date(t.date).toLocaleDateString('vi-VN')} • {new Date(t.date).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                <div className={`transaction-amount ${t.category.type === 'EXPENSE' ? 'expense' : 'income'}`}>
                  {t.category.type === 'EXPENSE' ? '-' : '+'}{formatCurrency(t.amount)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="empty-state">
            <p>{lang === 'vi' ? 'Chưa có giao dịch nào.' : 'No recent transactions.'}</p>
          </Card>
        )}
      </section>
    </main>
  );
}
