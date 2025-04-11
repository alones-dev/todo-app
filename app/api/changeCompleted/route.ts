import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PUT(req: Request) {
    try {
        const session = await auth();
        const userID = session?.user?.id;
        if (!userID) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id, completed } = await req.json();
        if (typeof completed !== 'boolean' || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const task = await prisma.task.update({
            where: {
                id,
                userId: userID,
            },
            data: {
                completed,
            },
        });
        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json({ task }, { status: 200 });
    }
    catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}