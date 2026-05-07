import { makeItemRoutes } from "../../_lib/crud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { PATCH, DELETE } = makeItemRoutes({
  model: "aboutFact",
  fields: ["k", "v", "order"],
});
