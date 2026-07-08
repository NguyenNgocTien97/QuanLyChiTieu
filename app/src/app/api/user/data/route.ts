import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function DELETE() {
  try {
    const user = await getDefaultUser();
    
    // Delete all transactions for the user
    await prisma.transaction.deleteMany({
      where: { userId: user.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data' }, { status: 500 });
  }
}
