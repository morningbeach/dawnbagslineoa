// workers/webhook/index.js

export default {
  async fetch(request, env, ctx) {

    // 1) LINE verify 按鈕會用 GET / HEAD 來測試 URL → 一律回 200。
    if (request.method === "GET" || request.method === "HEAD") {
      return new Response("OK", { status: 200 });
    }

    // 2) 只處理 POST（真正的訊息事件）
    if (request.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    const textBody = await request.text();

    let payload;
    try {
      payload = JSON.parse(textBody);
    } catch (err) {
      console.error("Invalid JSON body", err);
      return new Response("OK", { status: 200 });
    }

    const events = payload.events || [];
    if (!events.length)
      return new Response("OK", { status: 200 });

    const db = env.LINEOA_DB;
    const now = Date.now();

    for (const event of events) {
      try {
        if (event.type !== "message") continue;
        if (!event.message || event.message.type !== "text") continue;

        const userId = event.source?.userId ?? "unknown";
        const text = event.message.text ?? "";
        const ts = event.timestamp ?? now;
        const id = crypto.randomUUID();

        await db.prepare(
          `
          INSERT INTO chat_messages (id, line_user_id, direction, message, timestamp)
          VALUES (?1, ?2, 'user', ?3, ?4)
        `
        )
          .bind(id, userId, text, ts)
          .run();

        console.log("Saved to D1:", userId, text);
      } catch (err) {
        console.error("D1 insert error:", err);
      }
    }

    return new Response("OK", { status: 200 });
  }
};
