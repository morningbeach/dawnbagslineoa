export default function AISettingsPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">AI Settings</h2>
      <p className="text-sm text-zinc-600">
        之後可以在這裡編輯各種 Prompt（summary_prompt, quote_prompt 等），存入 Supabase 或 KV。
      </p>
    </div>
  );
}
