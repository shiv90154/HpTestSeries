import { ogCard, ogSize } from "@/lib/og-card";
import { getSite } from "@/sites";
import { examLabel, getExamPage } from "@/modules/catalog/queries";

export const alt = "Exam mock tests";
export const size = ogSize;
export const contentType = "image/png";

export default async function ExamOgImage({ params }: { params: Promise<{ site: string; body: string; exam: string }> }) {
  const { site: code, body, exam } = await params;
  const site = getSite(code);
  const data = await getExamPage(site.code, body, exam);
  const name = data ? examLabel(data.body.slug, data.name) : `${site.stateAdj} Govt Exams`;
  return ogCard(site, {
    kicker: data?.body.name ?? site.stateName,
    title: `${name} Mock Test ${new Date().getFullYear()}`,
    footer: `Real CBT interface · Hindi & English · Free tests · ${site.logo.initials} rank`,
  });
}
