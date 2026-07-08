import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getDefaultUser();
    
    // Check if category belongs to user
    const category = await prisma.category.findUnique({
      where: { id: id }
    });
    
    if (!category || category.userId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Move existing transactions to a default "Khác" category
    const transactionCount = await prisma.transaction.count({
      where: { categoryId: id }
    });

    if (transactionCount > 0) {
      let otherCategory = await prisma.category.findFirst({
        where: { userId: user.id, name: 'Khác', type: category.type }
      });

      if (!otherCategory) {
        otherCategory = await prisma.category.create({
          data: {
            name: 'Khác',
            type: category.type,
            icon: '📦',
            color: '#94a3b8',
            userId: user.id
          }
        });
      }

      await prisma.transaction.updateMany({
        where: { categoryId: id },
        data: { categoryId: otherCategory.id }
      });
    }

    await prisma.category.delete({
      where: { id: id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
