import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function GET() {
  try {
    const user = await getDefaultUser();
    const categories = await prisma.category.findMany({
      where: { userId: user.id },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getDefaultUser();
    const body = await request.json();
    const { name, icon, color, type, budgetLimit } = body;

    const category = await prisma.category.create({
      data: {
        name,
        icon,
        color,
        type,
        budgetLimit: budgetLimit ? parseFloat(budgetLimit) : null,
        userId: user.id,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
