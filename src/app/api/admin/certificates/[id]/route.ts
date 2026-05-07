import { makeItemRoutes } from "../../_lib/crud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { PATCH, DELETE } = makeItemRoutes({
  model: "certificate",
  fields: ["title", "issuer", "year", "image", "href", "order", "published"],
});
