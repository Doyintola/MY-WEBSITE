"use client";
import ResourceEditor from "../ResourceEditor";

export default function StatsAdminPage() {
  return (
    <div className="space-y-16">
      <ResourceEditor
        config={{
          endpoint: "/api/admin/stats",
          title: "Stats",
          subtitle: "Four-up stat tiles on the homepage.",
          preview: (it) => `${it.num ?? ""} · ${it.label ?? ""}`,
          fields: [
            { key: "num", label: "Number / metric (e.g. 05+, 02, SDG)" },
            { key: "label", label: "Label" },
            { key: "sub", label: "Sub-label" },
            { key: "order", label: "Display order", type: "number" },
          ],
          blank: { num: "", label: "", sub: "" },
        }}
      />

      <ResourceEditor
        config={{
          endpoint: "/api/admin/marquee",
          title: "Marquee",
          subtitle: "Items scrolled across the gold marquee strip.",
          preview: (it) => String(it.text ?? ""),
          fields: [
            { key: "text", label: "Text" },
            { key: "order", label: "Order", type: "number" },
          ],
          blank: { text: "" },
        }}
      />
    </div>
  );
}
