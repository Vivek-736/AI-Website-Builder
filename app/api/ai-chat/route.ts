import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();

    try {
        const result = await chatSession.sendMessage(prompt);
        const AIres = await result.response.text();

        return NextResponse.json({ result: AIres });
    } catch (error) {
        console.error("Error in AI chat:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}