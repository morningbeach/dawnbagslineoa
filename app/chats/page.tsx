// app/chats/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ChatThread = {
  line_user_id: string;
  last_ts: number;
  last_message: string;
};

export default function ChatsPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/chats");
        const data = await res.json();
        setThreads(data);
      } catch (e) {
        console.error("Failed to load chats", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Chats</h2>
        <p className="text-sm text-zinc-600">
          這裡顯示 LINE OA 進來的對話（依客戶分組）。
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-zinc-500">載入中…</p>
      ) : threads.length === 0 ? (
        <p className="text-sm text-zinc-500">
          目前還沒有任何訊息，可以先從 LINE OA 傳一則訊息測試。
        </p>
      ) : (
        <div className="admin-card divide-y">
          {threads.map((t) => (
            <Link
              key={t.line_user_id}
              href={`/chats/${encodeURIComponent(t.line_user_id)}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50"
            >
              <div>
                <p className="font-medium text-sm">
                  {t.line_user_id}
                </p>
                <p className="text-xs text-zinc-500 line-clamp-1">
                  {t.last_message}
                </p>
              </div>
              <div className="text-xs text-zinc-400">
                {t.last_ts
                  ? new Date(t.last_ts).toLocaleString()
                  : ""}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
