import { makeCollectionRoutes } from "../_lib/crud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST } = makeCollectionRoutes({
  model: "aboutFact",
  fields: ["k", "v", "order"],
  defaults: { k: "", v: "", order: 0 },
});
