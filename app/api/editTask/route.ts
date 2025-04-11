import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
    try {
        const session = await auth();
        const userID = session?.user?.id;
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, title, date, startTime, endTime, color } = body;
        if (!id || !title || !date || !startTime || !endTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const task = await prisma.task.update({
            where: { 
                id ,
                userId: userID,
            },
            data: {
                title,
                dueDate: new Date(date),
                startTime,
                endTime,
                color,
                userId: userID,
            },
        });
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ task }, { status: 200 })
    }
    catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}