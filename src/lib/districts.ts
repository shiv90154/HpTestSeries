import { SITES } from "@/sites";
import type { SiteConfig } from "@/sites/types";

/** The "not from this state" choice in a site's district list: "Outside HP", "Outside PB". */
export const outsideDistrict = (site: SiteConfig) => `Outside ${site.logo.initials}`;

/** A site's district choices, "Outside …" last. */
export const districtOptions = (site: SiteConfig): string[] => [...site.districts, outsideDistrict(site)];

/** Every value any site's form can send; one account works on every site, so any of them is valid. */
export const ALL_DISTRICTS = [...new Set(Object.values(SITES).flatMap(districtOptions))] as [string, ...string[]];

/** Shown on result cards and leaderboards; "Outside …" says nothing useful there. */
export const isRealDistrict = (d: string | null): d is string => !!d && !d.startsWith("Outside ");
