// app/api/chats/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 從 Cloudflare Worker 取得聊天列表
    const workerUrl = process.env.CLOUDFLARE_WORKER_URL || "https://lineoa-ai-admin.tomorrowtww.workers.dev";
    
    const response = await fetch(`${workerUrl}/api/chat-threads`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Worker responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch chats:", error);
    return NextResponse.json([], { status: 500 });
  }
}
