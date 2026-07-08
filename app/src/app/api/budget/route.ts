import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function PUT(request: Request) {
  try {
    const user = await getDefaultUser();
    const data = await request.json();
    
    if (data.weeklyBudget !== undefined) {
      await prisma.user.update({
        where: { id: user.id },
        data: { weeklyBudget: data.weeklyBudget }
      });
    }

    if (data.categories && Array.isArray(data.categories)) {
      for (const cat of data.categories) {
        await prisma.category.update({
          where: { id: cat.id },
          data: { budgetLimit: cat.budgetLimit }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update budgets' }, { status: 500 });
  }
}
