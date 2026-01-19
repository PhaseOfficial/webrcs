import { supabase } from "../lib/supabaseClient";
import { getVisitorId } from "./visitor";

// Register the current visitor in the `visitors` table.
// Use upsert with onConflict so we don't error when the row already exists
export const registerVisitor = async () => {
  const visitor_id = getVisitorId();

  try {
    // Prefer upsert (avoids unique-constraint errors when visitor_id is PK)
    // supabase-js v2 supports the `onConflict` option for upsert.
    const { data, error } = await supabase
      .from("visitors")
      .upsert([{ visitor_id }], { onConflict: "visitor_id" });

    if (error) {
      // If the SDK/version doesn't support upsert options or another issue occurs,
      // log the error but don't throw—visitor registration is non-critical.
      console.warn("registerVisitor: upsert returned error", error);
    }

    return data;
  } catch (err) {
    // If upsert threw, log and try a simple insert fallback that ignores duplicate-key errors (23505)
    console.warn("registerVisitor: upsert failed, falling back to insert", err);
    try {
      const { data, error } = await supabase.from("visitors").insert([{ visitor_id }]);
      if (error) {
        // If duplicate key error, ignore (visitor already registered)
        // Postgres duplicate key code is '23505'. Supabase error may expose this in `error.code` or `error.message`.
        if (String(error.code) === "23505" || /duplicate key/i.test(String(error.message))) {
          return null;
        }
        console.error("registerVisitor: insert returned error", error);
      }
      return data;
    } catch (err2) {
      console.error("registerVisitor: unexpected error", err2);
      return null;
    }
  }
};
