"use client";
import ResourceEditor from "../ResourceEditor";

export default function BlogAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/blog",
        title: "Blog Posts",
        subtitle:
          "Write and publish your essays. Use Markdown for the body. The slug is the URL — leave it blank on a new post and it will be generated from the title.",
        preview: (it) => `${it.title ?? "Untitled"}`,
        fields: [
          { key: "title", label: "Title", type: "text" },
          {
            key: "slug",
            label: "Slug (URL)",
            type: "text",
            hint: "e.g. net-zero-in-nigeria  (leave blank to auto-generate)",
          },
          { key: "excerpt", label: "Excerpt / summary", type: "textarea", rows: 3 },
          { key: "coverImage", label: "Cover image", type: "image", folder: "akintola/blog" },
          { key: "body", label: "Body (Markdown)", type: "markdown", rows: 18 },
          { key: "tags", label: "Tags (comma-separated)", type: "tags" },
          { key: "published", label: "Published", type: "boolean" },
        ],
        blank: {
          title: "New post",
          slug: "",
          excerpt: "",
          coverImage: "",
          body: "Write here…",
          tags: [],
          published: true,
        },
      }}
    />
  );
}
