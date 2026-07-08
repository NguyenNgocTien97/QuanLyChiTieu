import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDefaultUser } from '@/lib/user';

export async function GET() {
  try {
    const user = await getDefaultUser();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getDefaultUser();
    const body = await request.json();
    const { name, currency, language, weeklyBudget, theme } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name !== undefined ? name : undefined,
        currency: currency !== undefined ? currency : undefined,
        language: language !== undefined ? language : undefined,
        weeklyBudget: weeklyBudget !== undefined ? parseFloat(weeklyBudget) : undefined,
        theme: theme !== undefined ? theme : undefined,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
