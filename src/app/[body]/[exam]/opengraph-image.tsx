import { ogCard, ogSize } from "@/lib/og-card";
import { site } from "@/lib/site";
import { examLabel, getExamPage } from "@/modules/catalog/queries";

export const alt = `${site.name} — exam mock tests`;
export const size = ogSize;
export const contentType = "image/png";

export default async function ExamOgImage({ params }: { params: Promise<{ body: string; exam: string }> }) {
  const { body, exam } = await params;
  const data = await getExamPage(body, exam);
  const name = data ? examLabel(data.body.slug, data.name) : "Himachal Govt Exams";
  return ogCard({
    kicker: data?.body.name ?? "Himachal Pradesh",
    title: `${name} Mock Test ${new Date().getFullYear()}`,
    footer: "Real CBT interface · Hindi & English · Free tests · HP rank",
  });
}
