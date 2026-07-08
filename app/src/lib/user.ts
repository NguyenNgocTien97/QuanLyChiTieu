import { prisma } from './prisma';

// Helper to get or create a default user since we don't have auth yet
export async function getDefaultUser() {
  let user = await prisma.user.findFirst();
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Guest User',
        weeklyBudget: 5000000, // 5M VND default
      }
    });
    
    // Seed some default categories
    await prisma.category.createMany({
      data: [
        { name: 'Ăn uống', icon: 'utensils', color: '#f59e0b', type: 'EXPENSE', userId: user.id },
        { name: 'Đi lại', icon: 'car', color: '#3b82f6', type: 'EXPENSE', userId: user.id },
        { name: 'Mua sắm', icon: 'shopping-bag', color: '#ec4899', type: 'EXPENSE', userId: user.id },
        { name: 'Lương', icon: 'banknote', color: '#10b981', type: 'INCOME', userId: user.id },
      ]
    });
  }
  
  return user;
}
