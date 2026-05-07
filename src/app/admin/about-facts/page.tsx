"use client";
import ResourceEditor from "../ResourceEditor";

export default function AboutFactsAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/about-facts",
        title: "About — Sidebar Facts",
        subtitle: "Key/value facts shown in the About-page sidebar.",
        preview: (it) => `${it.k ?? ""} · ${it.v ?? ""}`,
        fields: [
          { key: "k", label: "Key (e.g. Based in)", type: "text" },
          { key: "v", label: "Value", type: "text" },
          { key: "order", label: "Display order", type: "number" },
        ],
        blank: { k: "", v: "" },
      }}
    />
  );
}
