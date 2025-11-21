// app/api/chats/[userId]/summary/route.ts
import { getRequestContext } from "@cloudflare/next-on-pages";
import OpenAI from "openai";

export const runtime = "edge";

type Params = {
  params: { userId: string };
};

export async function POST(_request: Request, { params }: Params) {
  const { env } = getRequestContext();
  const db = (env as any).LINEOA_DB as D1Database;
  const openai = new OpenAI({ apiKey: (env as any).OPENAI_API_KEY });

  const userId = params.userId;

  // 抓該客戶最近 30 則對話
  const sql = `
    SELECT direction, message, timestamp
    FROM chat_messages
    WHERE line_user_id = ?1
    ORDER BY timestamp ASC
    LIMIT 30;
  `;
  const rs = await db.prepare(sql).bind(userId).all();
  const messages = (rs.results ?? []) as {
    direction: string;
    message: string;
    timestamp: number;
  }[];

  const textConversation = messages
    .map(
      (m) =>
        `${m.direction === "user" ? "客戶" : "客服"}: ${m.message}`
    )
    .join("\n");

  const systemPrompt = `
你是一位專門協助「包裝 / 提袋 / 客製商品」客服的 AI 業務助理。
請閱讀以下 LINE 對話紀錄，產出三個區塊：

【任務提醒】
- 用條列式列出人工客服現在需要做的事
- 每一點都要具體，例如：
  - 「請至後台建立正式報價單 PDF」
  - 「依照客戶提供的尺寸與材質計算成本並回覆報價」
  - 「客戶已確認訂單，請建立正式訂單並安排生產」

【原因分析】
- 用 1–2 句話說明為什麼需要這些動作（基於對話中的關鍵訊息）。

【必要追問】
- 若資訊不足，列出需要問客戶的問題（例如尺寸、材質、數量、預算、到貨時間等）。

請使用繁體中文回覆。
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `以下是客戶與客服的對話紀錄：\n\n${textConversation}`,
      },
    ],
  });

  const summary =
    completion.choices[0]?.message?.content ??
    "（AI 沒有產出內容）";

  return new Response(
    JSON.stringify({
      userId,
      summary,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
