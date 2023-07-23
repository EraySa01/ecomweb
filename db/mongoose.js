import { connect } from "npm:mongoose@7.4.0";
import { load } from "https://deno.land/std@0.194.0/dotenv/mod.ts";
if (!Deno.env.get("MONGODB_URL")) {
  // deno-lint-ignore no-unused-vars
  const env = await load({ envPath: "./config/dev.env", export: true });
}
export default connect(Deno.env.get("MONGODB_URL"), {
  useNewUrlParser: true,
});
