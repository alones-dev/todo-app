import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth"

export async function GET() {
    try {
        const session = await auth();
        const userID = session?.user?.id;
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId: userID,
            },
            orderBy: {
                startTime: 'asc',
            },
        });
        return NextResponse.json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}