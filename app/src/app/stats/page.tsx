import { getDefaultUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';
import TrendChart from './StatsChart'; // Now exports TrendChart
import { ArrowLeft, MapPin, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import './Stats.css';

export default async function Stats() {
  const user = await getDefaultUser();
  const cookieStore = await cookies();
  const lang = cookieStore.get('locale')?.value || 'vi';

  // Get start of week
  const curr = new Date();
  const first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1); // Monday
  const startOfWeek = new Date(curr);
  startOfWeek.setDate(first);
  startOfWeek.setHours(0, 0, 0, 0);

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  // Fetch 2 weeks of transactions
  const allTransactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
      date: { gte: startOfLastWeek, lt: endOfWeek }
    },
    include: {
      category: true
    },
    orderBy: {
      date: 'desc'
    }
  });

  const thisWeekTransactions = allTransactions.filter(t => new Date(t.date) >= startOfWeek);
  const lastWeekTransactions = allTransactions.filter(t => new Date(t.date) >= startOfLastWeek && new Date(t.date) < startOfWeek);

  const totalExpense = thisWeekTransactions.filter(t => t.category.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const lastWeekExpense = lastWeekTransactions.filter(t => t.category.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = thisWeekTransactions.filter(t => t.category.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0);

  // Aggregate by category for THIS week
  const categoryMap = new Map<string, { name: string; color: string; total: number; type: string }>();
  thisWeekTransactions.forEach(t => {
    const existing = categoryMap.get(t.categoryId) || { name: t.category.name, color: t.category.color, total: 0, type: t.category.type };
    existing.total += t.amount;
    categoryMap.set(t.categoryId, existing);
  });

  const chartData = Array.from(categoryMap.values()).map(c => ({
    name: c.name,
    value: c.total,
    color: c.color,
    type: c.type
  })).sort((a, b) => b.value - a.value);

  // Real trend data
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const engDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const trendData = days.map((day, idx) => {
    const targetDay = idx === 6 ? 0 : idx + 1; // 0 is Sunday
    const thisWeekExpense = thisWeekTransactions
      .filter(t => t.category.type === 'EXPENSE' && new Date(t.date).getDay() === targetDay)
      .reduce((s, t) => s + t.amount, 0);
    const thisWeekIncome = thisWeekTransactions
      .filter(t => t.category.type === 'INCOME' && new Date(t.date).getDay() === targetDay)
      .reduce((s, t) => s + t.amount, 0);
    const lastWeekExpense = lastWeekTransactions
      .filter(t => t.category.type === 'EXPENSE' && new Date(t.date).getDay() === targetDay)
      .reduce((s, t) => s + t.amount, 0);
    const lastWeekIncome = lastWeekTransactions
      .filter(t => t.category.type === 'INCOME' && new Date(t.date).getDay() === targetDay)
      .reduce((s, t) => s + t.amount, 0);
      
    return { 
      day: lang === 'vi' ? day : engDays[idx], 
      expenseThisWeek: thisWeekExpense, 
      incomeThisWeek: thisWeekIncome,
      expenseLastWeek: lastWeekExpense,
      incomeLastWeek: lastWeekIncome
    };
  });

  const topTransactions = thisWeekTransactions.filter(t => t.category.type === 'EXPENSE').sort((a, b) => b.amount - a.amount).slice(0, 3);
  const expenseDiff = lastWeekExpense > 0 ? ((totalExpense - lastWeekExpense) / lastWeekExpense) * 100 : 0;
  const isGood = totalExpense <= lastWeekExpense;

  return (
    <main className="stats-page">
      <header className="page-header sticky-header">
        <Link href="/"><ArrowLeft size={24} className="icon-btn" /></Link>
        <h1 className="title-center">{lang === 'vi' ? 'Phân Tích Chi Tiêu' : 'Spending Analysis'}</h1>
        <div style={{ width: 24 }}></div>
      </header>

      <Card className="summary-card">
        <p className="label-sm">{lang === 'vi' ? 'Tổng chi tiêu' : 'Total Expenses'}</p>
        <h2 className="amount-huge">{formatCurrency(totalExpense)}</h2>
        <div className={`trend-badge ${isGood ? 'success' : 'expense'}`}>
          {isGood ? <TrendingDown size={14} /> : <TrendingUp size={14} />} 
          {lang === 'vi' ? (isGood ? 'Giảm' : 'Tăng') : (isGood ? 'Down' : 'Up')} {Math.abs(expenseDiff).toFixed(1)}% {lang === 'vi' ? 'so với tuần trước' : 'vs last week'}
        </div>
        <div className="insight-box">
          <MapPin size={18} className="insight-icon" />
          <p>{lang === 'vi' ? (isGood ? 'Chi tiêu tốt! Bạn đang đi đúng hướng để đạt mục tiêu tiết kiệm tuần.' : 'Chú ý! Chi tiêu tuần này của bạn cao hơn tuần trước.') : (isGood ? 'Good spending! You are on track to reach your savings goal this week.' : 'Attention! Your spending this week is higher than last week.')}</p>
        </div>
      </Card>

      <section className="category-breakdown">
        <h3 className="section-title">{lang === 'vi' ? 'Giao dịch theo danh mục' : 'Transactions by Category'}</h3>
        <Card className="breakdown-card">
          {chartData.length > 0 ? (
            <div className="category-list">
              {chartData.map((item, idx) => {
                const isExpense = item.type === 'EXPENSE';
                const baseTotal = isExpense ? totalExpense : totalIncome;
                const percent = baseTotal > 0 ? ((item.value / baseTotal) * 100).toFixed(1) : '0.0';
                
                return (
                  <div key={idx} className="cat-progress-item">
                    <div className="cat-progress-header">
                      <div className="cat-info">
                        <div className="category-icon-small" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                          {item.name.charAt(0)}
                        </div>
                        <span className="cat-name">{item.name}</span>
                      </div>
                      <div className="cat-amount">
                        <span className={`amount-val ${!isExpense ? 'text-green' : ''}`}>
                          {!isExpense ? '+' : '-'}{formatCurrency(item.value)}
                        </span>
                        <span className="percent-val">{percent}%</span>
                      </div>
                    </div>
                    <div className="cat-progress-bar-bg">
                      <div className="cat-progress-bar-fill" style={{ width: `${percent}%`, backgroundColor: item.color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="empty-text">{lang === 'vi' ? 'Chưa có giao dịch nào.' : 'No transactions.'}</p>
          )}
        </Card>
      </section>

      <section className="trend-section">
        <h3 className="section-title">{lang === 'vi' ? 'Xu hướng chi tiêu' : 'Spending Trend'}</h3>
        <Card className="trend-card">
          <TrendChart data={trendData} lang={lang} />
        </Card>
      </section>

      <section className="top-expenses">
        <h3 className="section-title">{lang === 'vi' ? 'Khoản chi lớn nhất' : 'Top Expenses'}</h3>
        <Card className="top-card">
          {topTransactions.map((t) => (
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
                  {new Date(t.date).toLocaleDateString('vi-VN')} • {new Date(t.date).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
              <div className="transaction-amount expense">
                -{formatCurrency(t.amount)}
              </div>
            </div>
          ))}
        </Card>
      </section>
    </main>
  );
}
