import type { SiteConfig } from "@/sites/types";
import { business } from "./business";

/** Social profiles for Organization.sameAs: the site's own, never another site's. */
export function socialProfiles(site: SiteConfig): string[] {
  return [site.social.youtube, site.social.instagram, site.social.telegram].filter((u): u is string => !!u);
}

/** schema.org Organization — the home page node and the publisher on every article. */
export function organizationNode(site: SiteConfig) {
  const sameAs = socialProfiles(site);
  return {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    email: business.email,
    areaServed: { "@type": "State", name: site.stateName },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: business.email,
      telephone: business.phone.replace(/\s/g, ""),
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
}
