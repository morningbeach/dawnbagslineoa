# 系統架構簡述

- Next.js App Router 作為後台管理介面
- Cloudflare Workers:
  - webhook: 接收 LINE OA 事件
  - ai-analysis: 呼叫 OpenAI 進行分析（留白待實作）
  - pdf-generator: 生成報價單 PDF（留白待實作）
- D1: 儲存 chat_messages / ai_analysis / quotes / quote_items
- 之後可接 Supabase 作為 Auth 與設定存儲。
