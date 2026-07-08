import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function GET(request: Request) {
  try {
    const user = await getDefaultUser();
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: 'desc' },
      take: limit,
      include: {
        category: true,
      }
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getDefaultUser();
    const body = await request.json();
    const { amount, date, note, paymentMethod, categoryId } = body;

    const transaction = await prisma.transaction.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        note,
        paymentMethod,
        categoryId,
        userId: user.id,
      },
      include: {
        category: true
      }
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}
