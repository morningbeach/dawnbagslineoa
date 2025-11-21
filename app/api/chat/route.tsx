// app/api/chats/route.ts
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = (env as any).LINEOA_DB as D1Database;

  const sql = `
    SELECT
      cm.line_user_id,
      MAX(cm.timestamp) AS last_ts,
      (
        SELECT message FROM chat_messages
        WHERE line_user_id = cm.line_user_id
        ORDER BY timestamp DESC
        LIMIT 1
      ) AS last_message
    FROM chat_messages cm
    GROUP BY cm.line_user_id
    ORDER BY last_ts DESC
    LIMIT 100;
  `;

  const result = await db.prepare(sql).all();

  return new Response(JSON.stringify(result.results ?? []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
