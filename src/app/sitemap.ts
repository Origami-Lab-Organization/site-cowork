import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, SITE_URL, spaces } from "@/lib/site";

/** Apenas URLs canônicas e indexáveis. `lastModified` = última revisão real do conteúdo. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    ...spaces.map((s) => ({ url: `${SITE_URL}/${s.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${SITE_URL}/perguntas-frequentes`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sobre`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
