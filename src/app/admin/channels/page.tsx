"use client";
import ResourceEditor from "../ResourceEditor";

export default function ChannelsAdminPage() {
  return (
    <ResourceEditor
      config={{
        endpoint: "/api/admin/channels",
        title: "Contact Channels",
        subtitle:
          "Email, phone, social and press contact rows on the Contact page.",
        preview: (it) => `${it.label ?? ""} · ${it.value ?? ""}`,
        fields: [
          { key: "label", label: "Label (e.g. Email)", type: "text" },
          { key: "value", label: "Display value", type: "text" },
          { key: "href", label: "Link target", type: "text", hint: "e.g. mailto:..., tel:..., https://..." },
          {
            key: "icon",
            label: "Icon",
            type: "select",
            options: [
              { value: "", label: "None" },
              { value: "mail", label: "Mail" },
              { value: "phone", label: "Phone" },
              { value: "twitter", label: "Twitter / X" },
              { value: "instagram", label: "Instagram" },
              { value: "linkedin", label: "LinkedIn" },
              { value: "press", label: "Press" },
            ],
          },
          { key: "order", label: "Display order", type: "number" },
          { key: "published", label: "Published", type: "boolean" },
        ],
        blank: { label: "", value: "", href: "", icon: "", published: true },
      }}
    />
  );
}
