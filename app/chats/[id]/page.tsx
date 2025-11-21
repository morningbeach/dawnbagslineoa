// app/chats/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type ChatMessage = {
  id: string;
  line_user_id: string;
  direction: string;
  message: string;
  timestamp: number;
};

export default function ChatDetailPage() {
  const params = useParams<{ id: string }>();
  const userId = decodeURIComponent(params.id);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/chats/${encodeURIComponent(userId)}`);
        const data = await res.json();
        setMessages(data);
      } catch (e) {
        console.error("Failed to load chat messages", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  async function handleGenerateAI() {
    setAiLoading(true);
    try {
      const res = await fetch(
        `/api/chats/${encodeURIComponent(userId)}/summary`,
        { method: "POST" }
      );
      const data = await res.json();
      setAiSummary(data.summary || "");
    } catch (e) {
      console.error("Failed to generate AI summary", e);
      setAiSummary("產生失敗，請稍後再試。");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Chat Detail
          </h2>
          <p className="text-sm text-zinc-600">
            LINE 使用者：{userId}
          </p>
        </div>
        <button
          onClick={handleGenerateAI}
          disabled={aiLoading}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
        >
          {aiLoading ? "AI 分析中…" : "產生 AI 摘要 / 待辦"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* 對話紀錄 */}
        <div className="admin-card col-span-2 max-h-[480px] overflow-auto">
          <div className="px-4 py-3 border-b">
            <p className="text-xs font-semibold text-zinc-500">
              對話紀錄
            </p>
          </div>
          <div className="space-y-3 p-4">
            {loading ? (
              <p className="text-sm text-zinc-500">載入中…</p>
            ) : messages.length === 0 ? (
              <p className="text-sm text-zinc-500">
                尚無訊息。
              </p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-600">
                      {m.direction === "user" ? "客戶" : "客服"}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {new Date(m.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
                    {m.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI 摘要 / 待辦 */}
        <div className="admin-card">
          <div className="px-4 py-3 border-b">
            <p className="text-xs font-semibold text-zinc-500">
              AI 摘要與客服待辦
            </p>
          </div>
          <div className="p-4 text-sm whitespace-pre-wrap text-zinc-800">
            {aiSummary ? (
              aiSummary
            ) : (
              <span className="text-zinc-500">
                點右上角「產生 AI 摘要 / 待辦」按鈕，AI
                會根據目前對話內容給出人工客服下一步建議。
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
