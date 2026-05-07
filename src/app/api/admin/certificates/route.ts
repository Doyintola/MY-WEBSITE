import { makeCollectionRoutes } from "../_lib/crud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = makeCollectionRoutes({
  model: "certificate",
  fields: ["title", "issuer", "year", "image", "href", "order", "published"],
  defaults: {
    title: "New certificate",
    issuer: "",
    year: "",
    image: null,
    href: null,
    order: 0,
    published: true,
  },
});
