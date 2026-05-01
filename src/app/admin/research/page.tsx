"use client";
import ResourceEditor from "../ResourceEditor";

export default function ResearchAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/research",
        title: "Research papers",
        subtitle: "Papers shown in the homepage Selected Research strip.",
        preview: (it) => `${it.year ?? ""} · ${it.title ?? ""}`,
        fields: [
          { key: "year", label: "Year" },
          { key: "journal", label: "Journal / venue" },
          { key: "title", label: "Title", type: "textarea", rows: 2 },
          { key: "desc", label: "Description", type: "textarea", rows: 4 },
          { key: "tags", label: "Tags (comma-separated)", type: "tags" },
          { key: "href", label: "DOI / URL", type: "url" },
          { key: "order", label: "Display order", type: "number" },
        ],
        blank: { year: "", journal: "", title: "", desc: "", tags: [], href: "" },
      }}
    />
  );
}
