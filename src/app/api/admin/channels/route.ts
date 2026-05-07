import { makeCollectionRoutes } from "../_lib/crud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = makeCollectionRoutes({
  model: "contactChannel",
  fields: ["label", "value", "href", "icon", "order", "published"],
  defaults: { label: "", value: "", href: "", icon: null, order: 0, published: true },
});
