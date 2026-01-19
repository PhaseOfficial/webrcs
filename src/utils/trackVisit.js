import { supabase } from "../lib/supabaseClient";
// import { getVisitorId } from "./visitor";
import { hashString } from "./hash";

export const trackVisit = async () => {
  try {
    // const visitor_id = getVisitorId();

    // Get IP
    const ip = await fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(d => d.ip);

    const ip_hash = await hashString(ip);

    // ✅ Country lookup (GDPR safe – country only)
    const country = await fetch(`https://ipapi.co/${ip}/country_name/`)
      .then(res => res.text())
      .catch(() => "Unknown");

    // Save to Supabase
    await supabase.from("website_visits").insert({
      ip_hash,
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      country
    });

    console.log("✅ GDPR visit logged with country:", country);

  } catch (err) {
    console.error("❌ Visit logging error:", err);
  }
};
