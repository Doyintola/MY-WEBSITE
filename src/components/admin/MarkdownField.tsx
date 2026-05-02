"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  rows?: number;
  hint?: string;
}

export default function MarkdownField({
  value,
  onChange,
  label = "Body (Markdown)",
  rows = 8,
  hint,
}: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="block font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
          {label}
        </label>
        <div className="flex overflow-hidden rounded-sm border border-ink/15 text-[0.65rem] font-mono uppercase">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-3 py-1 transition ${
                tab === t
                  ? "bg-ink text-cream-50"
                  : "bg-cream-50 text-ink/60 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === "write" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full rounded-sm border border-ink/15 bg-white p-3 font-mono text-sm leading-relaxed"
        />
      ) : (
        <div className="prose prose-sm max-w-none rounded-sm border border-ink/15 bg-cream-50 p-4">
          {value ? (
            <ReactMarkdown>{value}</ReactMarkdown>
          ) : (
            <p className="text-ink/40">Nothing to preview.</p>
          )}
        </div>
      )}

      {hint && <p className="text-[0.7rem] text-ink/50">{hint}</p>}
    </div>
  );
}
