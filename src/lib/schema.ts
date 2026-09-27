import { business } from "./business";
import { site } from "./site";

/** Social profiles for Organization.sameAs — add the Telegram/YouTube/Instagram URLs once they exist. */
export const SOCIAL_PROFILES: string[] = [];

/** schema.org Organization — the home page node and the publisher on every article. */
export function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: business.email,
    areaServed: { "@type": "State", name: "Himachal Pradesh" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: business.email,
      telephone: business.phone.replace(/\s/g, ""),
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    ...(SOCIAL_PROFILES.length > 0 && { sameAs: SOCIAL_PROFILES }),
  };
}
