import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt } = await req.json();
    try {
        const result = await GenAiCode.sendMessage(prompt);
        const res = result.response.text();
        return NextResponse.json(JSON.parse(res));
    } catch (error) {
        console.error("Error in POST request:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}