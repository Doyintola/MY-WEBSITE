"use client";
import ResourceEditor from "../ResourceEditor";

export default function CertificatesAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/certificates",
        title: "Certificates",
        subtitle:
          "Awards, qualifications and credentials shown on the About page. Optionally attach an image (e.g. a scan) and a verification link.",
        preview: (it) => `${it.title ?? ""}${it.year ? ` · ${it.year}` : ""}`,
        fields: [
          { key: "title", label: "Title", type: "text" },
          { key: "issuer", label: "Issuer / institution", type: "text" },
          { key: "year", label: "Year", type: "text" },
          { key: "image", label: "Image (optional)", type: "image", folder: "akintola/certs" },
          { key: "href", label: "Verification / link (optional)", type: "url" },
          { key: "order", label: "Display order", type: "number" },
          { key: "published", label: "Published", type: "boolean" },
        ],
        blank: {
          title: "",
          issuer: "",
          year: "",
          image: "",
          href: "",
          published: true,
        },
      }}
    />
  );
}
