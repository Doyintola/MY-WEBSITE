"use client";
import ResourceEditor from "../ResourceEditor";

export default function ExpertiseAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/expertise",
        title: "Expertise",
        subtitle:
          "Six expertise tiles on the home page. Icon name must match a lucide-react icon (e.g. Building2, Leaf, Brain, Calculator, Handshake, CircleDashed).",
        preview: (it) => `${it.n ?? ""} · ${it.title ?? ""}`,
        fields: [
          { key: "n", label: "Number" },
          { key: "title", label: "Title" },
          { key: "desc", label: "Description", type: "textarea", rows: 4 },
          { key: "icon", label: "Lucide icon name" },
          { key: "order", label: "Display order", type: "number" },
        ],
        blank: { n: "00", title: "", desc: "", icon: "Building2" },
      }}
    />
  );
}
