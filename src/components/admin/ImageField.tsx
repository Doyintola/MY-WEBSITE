"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  hint?: string;
}

export default function ImageField({
  value,
  onChange,
  label = "Image",
  folder = "akintola",
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const sigRes = await fetch("/api/admin/upload-sign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      if (!sigRes.ok) throw new Error("Signature request failed");
      const { timestamp, signature, apiKey, cloudName, folder: ff } =
        await sigRes.json();

      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", apiKey);
      fd.append("timestamp", String(timestamp));
      fd.append("signature", signature);
      fd.append("folder", ff);

      const upRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        { method: "POST", body: fd },
      );
      const data = await upRes.json();
      if (!upRes.ok || !data.secure_url) {
        throw new Error(data.error?.message ?? "Upload failed");
      }
      onChange(data.secure_url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
        {label}
      </label>

      {value && (
        <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-sm border border-ink/15 bg-cream-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="rounded-sm border border-ink/20 bg-cream-50 px-3 py-1.5 text-xs font-medium text-ink transition hover:bg-ink hover:text-cream-50 disabled:opacity-60"
        >
          {busy ? "Uploading…" : value ? "Replace" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-sm border border-ink/20 px-3 py-1.5 text-xs text-ink/70 hover:text-rust"
          >
            Remove
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /portraits/foo.jpg"
          className="flex-1 min-w-[14rem] rounded-sm border border-ink/15 bg-white px-2 py-1.5 font-mono text-xs"
        />
      </div>

      {err && <p className="text-xs text-rust">{err}</p>}
      {hint && <p className="text-[0.7rem] text-ink/50">{hint}</p>}
    </div>
  );
}
