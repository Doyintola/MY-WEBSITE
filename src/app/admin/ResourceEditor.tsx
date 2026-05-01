"use client";
import { useEffect, useState } from "react";

export type ResourceField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url" | "number" | "tags";
  rows?: number;
  placeholder?: string;
};

export type ResourceConfig = {
  endpoint: string; // e.g. /api/admin/projects
  title: string;
  subtitle: string;
  fields: ResourceField[];
  blank: Record<string, unknown>;
  preview?: (item: Record<string, unknown>) => string; // text shown as row title
};

type Item = Record<string, unknown> & { id: string };

export default function ResourceEditor({ config }: { config: ResourceConfig }) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, Record<string, string>>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    const res = await fetch(config.endpoint, { cache: "no-store" });
    const data = (await res.json()) as Item[];
    setItems(data);
    // initialise edit state from server values
    const next: Record<string, Record<string, string>> = {};
    for (const it of data) {
      const row: Record<string, string> = {};
      for (const f of config.fields) {
        const v = it[f.key];
        if (f.type === "tags") {
          // tags stored as JSON array string
          try {
            const arr = typeof v === "string" ? JSON.parse(v) : v;
            row[f.key] = Array.isArray(arr) ? arr.join(", ") : "";
          } catch {
            row[f.key] = "";
          }
        } else {
          row[f.key] = v == null ? "" : String(v);
        }
      }
      next[it.id] = row;
    }
    setEdits(next);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.endpoint]);

  function buildPayload(row: Record<string, string>) {
    const payload: Record<string, unknown> = {};
    for (const f of config.fields) {
      const raw = row[f.key] ?? "";
      if (f.type === "number") payload[f.key] = Number(raw) || 0;
      else if (f.type === "tags") {
        payload[f.key] = raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } else {
        payload[f.key] = raw;
      }
    }
    return payload;
  }

  async function handleSave(id: string) {
    setSavingId(id);
    const row = edits[id] ?? {};
    await fetch(`${config.endpoint}/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildPayload(row)),
    });
    setSavingId(null);
    await load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`${config.endpoint}/${id}`, { method: "DELETE" });
    await load();
  }

  async function handleCreate() {
    setCreating(true);
    await fetch(config.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...config.blank, order: items.length }),
    });
    setCreating(false);
    await load();
  }

  if (loading) return <p className="font-mono text-sm text-ink/60">Loading…</p>;

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
        Editorial CMS / {config.title}
      </p>
      <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
        <h1 className="font-display text-5xl text-ink md:text-6xl">{config.title}.</h1>
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating}
          className="rounded-md bg-ink px-5 py-3 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50 hover:bg-ink/85 disabled:opacity-50"
        >
          {creating ? "Adding…" : "+ New"}
        </button>
      </div>
      <p className="mt-3 max-w-2xl text-ink/70">{config.subtitle}</p>

      <div className="mt-10 space-y-3">
        {items.length === 0 && (
          <p className="rounded-md border border-dashed border-ink/20 p-6 text-center font-mono text-sm text-ink/50">
            No items yet — click &ldquo;+ New&rdquo; to add one.
          </p>
        )}
        {items.map((item) => {
          const isOpen = openId === item.id;
          const row = edits[item.id] ?? {};
          const title =
            (config.preview && config.preview(item)) ||
            String(row[config.fields[0].key] ?? "Untitled");
          return (
            <div
              key={item.id}
              className="rounded-xl border border-ink/15 bg-cream-100"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="truncate font-display text-lg text-ink">
                  {title || "(empty)"}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/50">
                  {isOpen ? "▲ Close" : "▼ Edit"}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-ink/10 px-5 py-5 space-y-5">
                  {config.fields.map((f) => (
                    <label key={f.key} className="block">
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/60">
                        {f.label}
                      </span>
                      {f.type === "textarea" ? (
                        <textarea
                          rows={f.rows ?? 3}
                          value={row[f.key] ?? ""}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [item.id]: { ...row, [f.key]: e.target.value },
                            })
                          }
                          placeholder={f.placeholder}
                          className="mt-2 block w-full rounded-md border border-ink/20 bg-cream-50 px-4 py-3 text-ink outline-none focus:border-gold"
                        />
                      ) : (
                        <input
                          type={
                            f.type === "url"
                              ? "url"
                              : f.type === "number"
                                ? "number"
                                : "text"
                          }
                          value={row[f.key] ?? ""}
                          onChange={(e) =>
                            setEdits({
                              ...edits,
                              [item.id]: { ...row, [f.key]: e.target.value },
                            })
                          }
                          placeholder={f.placeholder}
                          className="mt-2 block w-full rounded-md border border-ink/20 bg-cream-50 px-4 py-3 text-ink outline-none focus:border-gold"
                        />
                      )}
                    </label>
                  ))}

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="rounded-md border border-rust/40 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider2 text-rust hover:bg-rust/10"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSave(item.id)}
                      disabled={savingId === item.id}
                      className="rounded-md bg-gold px-6 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50 hover:bg-gold-dark disabled:opacity-50"
                    >
                      {savingId === item.id ? "Saving…" : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
