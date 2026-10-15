# Origami Hub Coworking — cowork.origamilab.com.br

Site institucional do coworking da Origami Lab em Formiga (MG). Next.js 16 (App Router), 100% estático, pensado para SEO local e para ser citado por buscadores com IA (GEO).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (falha em erro de tipo)
```

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| Dados do negócio (endereço, WhatsApp, horários, comodidades, textos dos espaços, FAQ) | `src/lib/site.ts` — **fonte única** |
| Dados estruturados (JSON-LD) | `src/lib/jsonld.ts` |
| Title/description/OG por página | `src/lib/seo.ts` + cada `page.tsx` |
| robots / sitemap / llms.txt / OG image | `src/app/robots.ts`, `sitemap.ts`, `llms.txt/route.ts`, `opengraph-image.tsx` |
| Headers, noindex de preview, redirect *.vercel.app | `next.config.ts` |

Ao mudar texto, atualize `CONTENT_UPDATED` em `site.ts` (vira o `lastmod` do sitemap).

**Nova página:** crie `src/app/<slug>/page.tsx` com `export const metadata = pageMetadata({ path: "/<slug>", ... })`, inclua `JsonLd` com `webPage` + `breadcrumbs`, e adicione a URL em `sitemap.ts`. Um espaço novo entra só adicionando um item em `spaces` (rota, sitemap, llms.txt e schema saem automaticamente).

## O que já está configurado

**SEO técnico**
- HTML 100% pré-renderizado (SSG): conteúdo e links rastreáveis sem JS.
- Canonical absoluto por página, `metadataBase` na origem canônica, 404 real (`dynamicParams = false`) com `noindex` e sem canonical.
- Sitemap só com URLs canônicas e indexáveis; `robots.txt` aponta para ele.
- Title e description específicos por intenção de busca ("coworking em Formiga", "sala de reunião para alugar em Formiga", "sala para treinamentos em Formiga"), H1 único, breadcrumbs, links internos entre os espaços.
- Open Graph/Twitter completos com imagem 1200×630 gerada no build.
- Previews da Vercel recebem `X-Robots-Tag: noindex`; em produção, `*.vercel.app` redireciona (308) para `cowork.origamilab.com.br`.
- Headers de segurança, `lang="pt-BR"`, fonte self-hosted (sem request ao Google Fonts no runtime), mobile-first, acessível (skip link, foco visível, details/summary).

**Dados estruturados (grafo com @id)**
`Organization` (Origami Lab) → `LocalBusiness` (Hub, com endereço, `hasMap`, `areaServed` = Formiga + região, comodidades, contato) → `Service` por espaço → `WebPage`/`AboutPage` + `BreadcrumbList`. Sem `FAQPage` (o Google descontinuou esse rich result) e sem preço/avaliação inventados.

**GEO (respostas de IA)**
- Cada página abre com uma resposta direta de 1–2 frases e um bloco "Resumo" com fatos objetivos: o formato que buscadores e IAs mais extraem e citam.
- FAQ editorial visível com perguntas reais ("quanto custa", "onde fica", "como reservar").
- Entidade consistente: o mesmo nome, endereço e telefone (NAP) no HTML, no schema, no `llms.txt` e no Instagram/Google Business.
- `robots.txt` separa por finalidade: busca (Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot…), acesso iniciado pelo usuário (ChatGPT-User, Claude-User…) e treinamento (GPTBot, ClaudeBot, Google-Extended…). Hoje tudo está liberado; para bloquear **só treinamento**, troque `allow` por `disallow` no último grupo de `robots.ts`. A busca não é afetada.
- `/llms.txt` gerado da mesma fonte das páginas. É opcional e não garante ranking.

## Antes de publicar: CONFIRMAR em `src/lib/site.ts`

- [ ] **Endereço do Hub.** Usei o da Origami Lab (R. Silviano Brandão, 156, 2º andar). Se o Hub for em outro lugar, troque.
- [ ] **Comodidades.** Wi-Fi, café, climatização, TV/tela. Só publique o que existe.
- [ ] **Horário de funcionamento** (`hours`). Enquanto for `null`, o site diz "atendimento com agendamento".
- [ ] **Coordenadas** (`geo`), pegas no Google Maps.
- [ ] **Fotos reais** do espaço. É o maior ganho pendente para conversão e para o Google Business. Coloque em `public/fotos/` e use `next/image`.
- [ ] Capacidade da sala grande e da sala de reunião (adicionar ao texto e ao FAQ quando houver número).

## Deploy na Vercel

1. Suba a pasta para um repositório Git e importe na Vercel (framework detectado: Next.js; nada a configurar).
2. Variável de ambiente (opcional, já é o padrão): `NEXT_PUBLIC_SITE_URL=https://cowork.origamilab.com.br`.
3. Em **Settings → Domains**, adicione `cowork.origamilab.com.br`.
4. No DNS de `origamilab.com.br`, crie o registro que a Vercel indicar (normalmente `CNAME cowork → cname.vercel-dns.com`). Não altere os outros registros do domínio.
5. Depois do deploy, valide:
   ```bash
   curl -sI https://cowork.origamilab.com.br/            # 200, sem X-Robots-Tag
   curl -s  https://cowork.origamilab.com.br/robots.txt
   curl -s  https://cowork.origamilab.com.br/sitemap.xml
   curl -sI https://cowork.origamilab.com.br/nao-existe  # 404
   curl -sI https://<projeto>.vercel.app/                # 308 → cowork.origamilab.com.br
   ```
   E rode o [Rich Results Test](https://search.google.com/test/rich-results) e o [Schema Validator](https://validator.schema.org/) na home e em `/coworking`.

## Pós-lançamento (onde está o ganho real de SEO local)

1. **Google Search Console:** a propriedade de domínio `origamilab.com.br` (verificação por DNS) já cobre o subdomínio. Envie `https://cowork.origamilab.com.br/sitemap.xml`. Opcional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` para verificar por meta tag.
2. **Bing Webmaster Tools:** importe do Search Console. O Bing alimenta o ChatGPT Search e o Copilot.
3. **Perfil da Empresa no Google (Google Business Profile):** categoria "Espaço de coworking", com o mesmo nome, endereço e WhatsApp do site, link para `cowork.origamilab.com.br`, fotos e horários. Para "coworking em Formiga" no Maps, esse é o fator nº 1.
4. **Instagram @origamihub_:** coloque `cowork.origamilab.com.br` no link da bio (hoje é só o WhatsApp) e use o mesmo nome e endereço.
5. **Citações locais:** Apple Maps (Business Connect), Bing Places e diretórios de coworking (Coworker.com, Woobox etc.), sempre com o mesmo NAP. Peça avaliações reais no Google aos clientes.
6. **Link do site da Origami Lab** para `cowork.origamilab.com.br` (rodapé ou menu). Reforça a entidade e transfere autoridade.

## Rotina de acompanhamento

| Quando | O quê |
| --- | --- |
| A cada deploy | `curl` das URLs acima; conferir que a produção não tem `noindex` |
| Semanal (1º mês) | Search Console: páginas indexadas, consultas ("coworking formiga", "sala de reunião formiga"), cliques |
| Mensal | Fazer as mesmas perguntas ao ChatGPT, Perplexity, Gemini e Google (AI Mode): "coworking em Formiga MG", "onde alugar sala de reunião em Formiga". Registrar se o Hub aparece e qual URL é citada. Atualizar textos e `CONTENT_UPDATED` |

Nenhuma configuração garante indexação, posição ou citação por IA. Ela remove barreiras e deixa os fatos claros; o resto vem de Google Business, avaliações, fotos e tempo.
