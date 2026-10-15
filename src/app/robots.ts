import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Decisão de rastreamento por finalidade (o site é 100% público e de marketing):
 * - Busca tradicional e busca de IA: liberadas — queremos ser encontrados e citados.
 * - Acesso iniciado por usuário (ChatGPT-User, Claude-User, Perplexity-User): liberado.
 * - Treinamento de modelos (GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended):
 *   LIBERADO por decisão de negócio — para um negócio local, estar no conhecimento dos
 *   modelos ajuda a marca. Para bloquear só treinamento, mude `allow` para `disallow`
 *   no grupo "treinamento"; isso NÃO afeta a busca.
 * Previews da Vercel recebem `X-Robots-Tag: noindex` em next.config.ts (não aqui:
 * bloquear em robots impediria o crawler de ler o noindex).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Busca e respostas com IA
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Applebot", "DuckDuckBot"], allow: "/" },
      // Acesso sob demanda iniciado pelo usuário
      { userAgent: ["ChatGPT-User", "Claude-User", "Perplexity-User"], allow: "/" },
      // Treinamento de modelos (decisão independente da busca)
      { userAgent: ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
