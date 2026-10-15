import { CONTENT_UPDATED, SITE_URL, fullAddress, generalFaq, site, spaces } from "@/lib/site";

/**
 * llms.txt (opcional, sem garantia de ranking ou citação): resumo em Markdown do
 * conteúdo PÚBLICO, gerado da mesma fonte das páginas para nunca divergir.
 * Gerado no build (estático).
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.description}

- Tipo: coworking (espaço de trabalho compartilhado), sala de reunião e sala para treinamentos
- Cidade: ${site.address.city}, ${site.address.regionName}, Brasil (${site.region})
- Endereço: ${fullAddress}
- Contato e reservas: WhatsApp ${site.whatsapp.display} — https://wa.me/${site.whatsapp.number}
- Instagram: ${site.instagram}
- Operado por: ${site.parent.name} (${site.parent.url}), empresa de tecnologia de Formiga (MG)
- Também conhecido como: ${site.alternateNames.join(", ")}
- Preços: sob consulta pelo WhatsApp (variam por espaço e período)

## Espaços

${spaces.map((s) => `- [${s.name}](${SITE_URL}/${s.slug}): ${s.answer}`).join("\n")}

## Páginas

- [Início](${SITE_URL}/)
- [Sobre o Origami Hub](${SITE_URL}/sobre)
- [Perguntas frequentes](${SITE_URL}/perguntas-frequentes)

## Perguntas frequentes

${generalFaq.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

Atualizado em ${CONTENT_UPDATED}.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
