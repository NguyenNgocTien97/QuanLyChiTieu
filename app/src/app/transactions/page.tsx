import { getDefaultUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { TransactionList } from './TransactionList';
import './Transactions.css';

export default async function Transactions() {
  const user = await getDefaultUser();
  const cookieStore = await cookies();
  const lang = cookieStore.get('locale')?.value || 'vi';

  const transactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { date: 'desc' },
    include: { category: true }
  });

  const categories = await prisma.category.findMany({
    where: { userId: user.id }
  });

  return (
    <main className="transactions-page">
      <TransactionList transactions={transactions} categories={categories} lang={lang} />
    </main>
  );
}
