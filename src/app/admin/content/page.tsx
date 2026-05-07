"use client";
import { useEffect, useState } from "react";

type Field = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url";
  rows?: number;
};

const FIELDS: Field[] = [
  { key: "site.tagline", label: "Site tagline (small text under your name)", type: "text" },
  { key: "home.intro.title", label: "Homepage intro · title", type: "text" },
  { key: "home.intro.body", label: "Homepage intro · short body", type: "textarea", rows: 3 },
  { key: "about.bio", label: "About · biography (Markdown — use blank lines between paragraphs)", type: "textarea", rows: 12 },
  { key: "about.portrait", label: "About · portrait image path (e.g. /portraits/doyin-about.jpg)", type: "text" },
  { key: "contact.email", label: "Contact · email", type: "text" },
  { key: "contact.phone", label: "Contact · phone", type: "text" },
  { key: "contact.location", label: "Contact · location", type: "text" },
];

export default function ContentEditor() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        const v: Record<string, string> = {};
        for (const f of FIELDS) v[f.key] = String(data[f.key] ?? "");
        setValues(v);
        setLoading(false);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  if (loading) {
    return <p className="font-mono text-sm text-ink/60">Loading…</p>;
  }

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
        Editorial CMS / Site Copy
      </p>
      <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
        Site Copy.
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Edit your bio, homepage intro, and contact details. Save once you&apos;re
        done — changes appear live on the published site.
      </p>

      <div className="mt-10 space-y-6">
        {FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/60">
              {f.label}
            </span>
            {f.type === "textarea" ? (
              <textarea
                rows={f.rows ?? 3}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 block w-full rounded-md border border-ink/20 bg-cream-100 px-4 py-3 text-ink outline-none focus:border-gold"
              />
            ) : (
              <input
                type={f.type === "url" ? "url" : "text"}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 block w-full rounded-md border border-ink/20 bg-cream-100 px-4 py-3 text-ink outline-none focus:border-gold"
              />
            )}
          </label>
        ))}
      </div>

      <div className="sticky bottom-0 mt-10 flex items-center gap-4 border-t border-ink/15 bg-cream-50/95 py-4 backdrop-blur">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-gold px-6 py-3 font-mono text-sm uppercase tracking-wider2 text-cream-50 hover:bg-gold-dark disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && (
          <span className="font-mono text-xs uppercase tracking-wider2 text-moss">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  );
}
