import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/auth"


export async function POST(req: Request) {
    try {
        const session = await auth()
        const userID = session?.user?.id
        if (!userID) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json();
        const { title, date, startTime, endTime, color } = body;
        
        if (!title || !date || !startTime || !endTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const task = await prisma.task.create({
            data: {
                title,
                dueDate: new Date(date),
                startTime,
                endTime,
                color,
                userId: userID
            }
        })

        return NextResponse.json({ task }, { status: 200 })
    }
    catch (error) {
        console.error("Error creating task: ", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}