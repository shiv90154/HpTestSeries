import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";
import { site } from "@/lib/site";
import { getResultCard } from "@/modules/assessment/service";
import { getCurrentUser } from "@/modules/identity/session";

const SIZE = 1080; // square: fits WhatsApp status and Instagram as well as chats

/** The default image font has no Devanagari, so non-Latin text is left out rather than drawn as boxes. */
const latin = (s: string | null) => (s && /^[\x20-\x7E]+$/.test(s) ? s : null);

/** Shareable result image for the student who took the attempt (their result pages are private). */
export async function GET(_req: Request, ctx: RouteContext<"/results/[attemptId]/card">) {
  const { attemptId } = await ctx.params;
  const user = await getCurrentUser();
  const card = user && (await getResultCard(user.id, attemptId));
  if (!card) return new Response("Not found", { status: 404 });

  const who = [latin(card.name), latin(card.district)].filter(Boolean).join(" · ");
  const titleSize = card.testTitle.length > 60 ? 46 : 56;
  const host = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0b1f5c 0%, #133a9e 55%, #1e4fd8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={brandMarkDataUri()} width={72} height={72} alt="" />
          <div style={{ fontSize: 40, fontWeight: 700, display: "flex" }}>
            HP&nbsp;<span style={{ color: "#f59e0b" }}>Test Series</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#f59e0b", letterSpacing: 2 }}>MY RESULT</div>
          <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.15 }}>{card.testTitle}</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1 }}>{card.score}</div>
            <div style={{ display: "flex", fontSize: 56, opacity: 0.75, paddingBottom: 14 }}>/ {card.maxScore}</div>
          </div>
          <div style={{ display: "flex", gap: 24, fontSize: 36 }}>
            {card.rank && (
              <div style={{ display: "flex", padding: "12px 24px", borderRadius: 20, background: "rgba(255,255,255,0.14)" }}>
                HP Rank #{card.rank.rank} of {card.rank.total}
              </div>
            )}
            <div style={{ display: "flex", padding: "12px 24px", borderRadius: 20, background: "rgba(255,255,255,0.14)" }}>{card.accuracy}% accuracy</div>
          </div>
          {card.rank && <div style={{ display: "flex", fontSize: 34, opacity: 0.9 }}>Better than {card.rank.percentile}% of Himachal aspirants</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 32 }}>
          <div style={{ display: "flex", opacity: 0.9 }}>{who}</div>
          <div style={{ display: "flex", color: "#f59e0b", fontWeight: 700 }}>Try it free · {host}</div>
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE, headers: { "Cache-Control": "private, no-store" } },
  );
}
