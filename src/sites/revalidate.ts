import "server-only";
import { revalidatePath } from "next/cache";
import { SITE_CODES } from ".";

/** revalidatePath for a public path ("/admin/tests") on every site: pages live under app/[site] (see src/proxy.ts). */
export function revalidateSitePath(path: string, type?: "page" | "layout") {
  for (const code of SITE_CODES) revalidatePath(`/${code}${path === "/" ? "" : path}`, type);
}
