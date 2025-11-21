# LINEOA AI Admin – Setup 指南（v1 / v1.1）

本專案為 DawnBags / 明日島嶼的 LINE OA AI 管理後台骨架。

## 1. 安裝依賴

```bash
npm install
```

## 2. 開發環境啟動

```bash
npm run dev
```

## 3. Cloudflare D1 建立資料表

```bash
wrangler d1 execute lineoa_db --file=schema.sql
```

## 4. Cloudflare Pages / Workers / KV / R2

- 在 wrangler.toml 中填入你的 D1 / KV / R2 設定
- 在 Cloudflare Dashboard 新增對應的 binding
