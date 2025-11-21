// app/api/chats/[userId]/route.ts
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

type Params = {
  params: { userId: string };
};

export async function GET(_request: Request, { params }: Params) {
  const { env } = getRequestContext();
  const db = (env as any).LINEOA_DB as D1Database;

  const userId = params.userId;

  const sql = `
    SELECT id, line_user_id, direction, message, timestamp
    FROM chat_messages
    WHERE line_user_id = ?1
    ORDER BY timestamp ASC
    LIMIT 200;
  `;

  const result = await db.prepare(sql).bind(userId).all();

  return new Response(JSON.stringify(result.results ?? []), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
