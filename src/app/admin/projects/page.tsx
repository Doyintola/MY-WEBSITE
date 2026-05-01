"use client";
import ResourceEditor from "../ResourceEditor";

export default function ProjectsAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/projects",
        title: "Projects",
        subtitle:
          "Research projects shown on the Research/Portfolio page. Drag order via the order field. Tags are comma-separated.",
        preview: (it) => `${it.n ?? ""} · ${it.title ?? ""}`,
        fields: [
          { key: "n", label: "Number (e.g. 01)" },
          { key: "year", label: "Year" },
          { key: "title", label: "Title", type: "textarea", rows: 2 },
          { key: "desc", label: "Description", type: "textarea", rows: 5 },
          { key: "tags", label: "Tags (comma-separated)", type: "tags" },
          { key: "venue", label: "Venue / Journal" },
          { key: "role", label: "Role / contribution" },
          { key: "href", label: "DOI / URL", type: "url" },
          { key: "image", label: "Image path (e.g. /portraits/doyin-research.jpg)" },
          { key: "order", label: "Display order", type: "number" },
        ],
        blank: {
          n: "00",
          year: new Date().getFullYear().toString(),
          title: "",
          desc: "",
          tags: [],
          venue: "",
          role: "",
          href: "",
          image: "",
        },
      }}
    />
  );
}
