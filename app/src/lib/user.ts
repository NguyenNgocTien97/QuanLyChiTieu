import { prisma } from './prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';

async function seedDefaultCategories(userId: string) {
  await prisma.category.createMany({
    data: [
      { name: 'Ăn uống', icon: 'utensils', color: '#f59e0b', type: 'EXPENSE', userId },
      { name: 'Đi lại', icon: 'car', color: '#3b82f6', type: 'EXPENSE', userId },
      { name: 'Mua sắm', icon: 'shopping-bag', color: '#ec4899', type: 'EXPENSE', userId },
      { name: 'Lương', icon: 'banknote', color: '#10b981', type: 'INCOME', userId },
    ]
  });
}

export async function getDefaultUser() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  
  if (session && session.user && (session.user as any).id) {
    const userId = (session.user as any).id;
    let user = await prisma.user.findUnique({ where: { id: userId } });
    
    // Seed default categories for new users if they have none
    if (user) {
      const categoryCount = await prisma.category.count({ where: { userId: user.id } });
      if (categoryCount === 0) {
        await seedDefaultCategories(user.id);
      }
    }
    
    // Check if we need to migrate guest data from their specific guest cookie
    const guestId = cookieStore.get('guest_id')?.value;
    
    if (guestId && guestId !== userId) {
      const guestUser = await prisma.user.findUnique({ where: { id: guestId } });
      if (guestUser && guestUser.name === 'Guest User') {
        // Migrate categories
        await prisma.category.updateMany({
          where: { userId: guestId },
          data: { userId: userId }
        });
        // Migrate transactions
        await prisma.transaction.updateMany({
          where: { userId: guestId },
          data: { userId: userId }
        });
        // Delete guest user
        await prisma.user.delete({ where: { id: guestId } });
      }
    }
    
    if (user) return user;
  }
  
  // Fallback to Guest User if not logged in
  let guestId = cookieStore.get('guest_id')?.value;
  
  if (!guestId) {
    // This shouldn't normally happen since middleware assigns it, 
    // but we provide a fallback just in case we are in a context without middleware
    guestId = 'fallback-guest-id-' + Math.random().toString(36).substring(7);
  }
  
  let user = await prisma.user.findUnique({ where: { id: guestId } });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        id: guestId,
        name: 'Guest User',
        weeklyBudget: 5000000,
      }
    });
    
    await seedDefaultCategories(user.id);
  } else {
    // Also make sure existing guest users without categories get them seeded
    const categoryCount = await prisma.category.count({ where: { userId: user.id } });
    if (categoryCount === 0) {
      await seedDefaultCategories(user.id);
    }
  }
  
  return user;
}
