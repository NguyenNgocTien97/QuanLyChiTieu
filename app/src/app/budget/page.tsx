import { getDefaultUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { BudgetClient } from './BudgetClient';
import './Budget.css';

export default async function BudgetPage() {
  const user = await getDefaultUser();
  const categories = await prisma.category.findMany({
    where: { userId: user.id, type: 'EXPENSE' }
  });
  const cookieStore = await cookies();
  const lang = cookieStore.get('locale')?.value || 'vi';

  return (
    <main className="budget-page">
      <BudgetClient 
        initialWeeklyBudget={user.weeklyBudget}
        categories={categories}
        lang={lang}
      />
    </main>
  );
}
