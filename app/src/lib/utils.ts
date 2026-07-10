export function formatCurrency(amount: number, currency: string = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function getStartAndEndOfWeek(date = new Date()) {
  const curr = new Date(date);
  const first = curr.getDate() - curr.getDay() + 1; // Monday
  const last = first + 6; // Sunday

  const start = new Date(curr.setDate(first));
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(curr.setDate(last));
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function translateCategory(name: string, lang: string): string {
  if (lang === 'vi') return name;
  const translations: Record<string, string> = {
    'Ăn uống': 'Food & Dining',
    'Đi lại': 'Transport',
    'Mua sắm': 'Shopping',
    'Lương': 'Salary',
    'Giải trí': 'Entertainment',
    'Sức khỏe': 'Health',
    'Hóa đơn': 'Bills',
    'Giáo dục': 'Education',
    'Khác': 'Others'
  };
  return translations[name] || name;
}
