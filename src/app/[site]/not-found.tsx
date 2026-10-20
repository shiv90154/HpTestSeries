import { ChevronRight, Home, LayoutGrid, SearchX } from "lucide-react";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { btn } from "@/components/ui";
import { freeMockHref } from "@/sites";
import { currentSite } from "@/sites/current";

// Root 404: unmatched URLs and every notFound() call. Next.js adds noindex automatically.
export default async function NotFound() {
  const site = await currentSite();
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <span className="grid size-16 place-items-center rounded-2xl bg-primary-soft text-primary">
          <SearchX className="size-8" />
        </span>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Error 404</p>
          <h1 className="text-2xl font-bold sm:text-3xl">Page not found</h1>
          <p className="text-muted">
            <span lang="hi">यह पेज नहीं मिला।</span> The link may be old or mistyped — the test or post may have moved.</p>
        </div>
        <div className="grid w-full gap-2.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-center">
          <Link href={freeMockHref(site)} className={btn("accent", "md", "w-full sm:w-auto")}>
            Take the free mock test <ChevronRight className="size-4" />
          </Link>
          <Link href="/exams" className={btn("outline", "md", "w-full sm:w-auto")}>
            <LayoutGrid className="size-4" /> All exams
          </Link>
          <Link href="/" className={btn("ghost", "md", "w-full sm:w-auto")}>
            <Home className="size-4" /> Home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
