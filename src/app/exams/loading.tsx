import { SiteHeader } from "@/components/site-header";
import { Skeleton } from "@/components/skeleton";
import { card } from "@/components/ui";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-10 px-4 py-12" aria-busy="true">
        <div className="max-w-2xl space-y-3">
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
        {[0, 1].map((s) => (
          <section key={s} className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((c) => (
                <div key={c} className={`${card} flex items-center gap-4 p-5`}>
                  <Skeleton className="size-12 shrink-0 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
