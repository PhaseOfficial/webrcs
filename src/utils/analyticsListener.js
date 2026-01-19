import { trackEvent } from "./trackEvent";

export const setupAnalyticsListeners = () => {
  // Track ALL button clicks
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button");

    if (target) {
      const name =
        target.getAttribute("data-track") ||
        target.innerText.trim() ||
        target.id ||
        "unknown_button";

      trackEvent("click", name);
    }
  });

  // Track ALL form submissions
  document.addEventListener("submit", (e) => {
    const formName =
      e.target.getAttribute("data-track") ||
      e.target.name ||
      e.target.id ||
      "unknown_form";

    trackEvent("form_submit", formName);
  });

  document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (link) {
    const href = link.href || "";

    if (href.includes("wa.me") || href.includes("whatsapp")) {
      trackEvent("click", "whatsapp_link");
    }

    if (href.startsWith("tel:")) {
      trackEvent("click", "phone_call");
    }

    if (href.startsWith("mailto:")) {
      trackEvent("click", "email_click");
    }
  }
});

};
