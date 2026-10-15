import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Highlight } from "@/components/Highlight";
import { Icon, iconFor } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, QuickFacts } from "@/components/QuickFacts";
import { breadcrumbs, graph, service, webPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { getSpace, site, spaces, whatsappUrl } from "@/lib/site";

type Props = { params: Promise<{ espaco: string }> };

// Só os slugs conhecidos existem; qualquer outro caminho responde 404 real.
export const dynamicParams = false;

export function generateStaticParams() {
  return spaces.map((s) => ({ espaco: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const space = getSpace((await params).espaco);
  if (!space) return {};
  return pageMetadata({ path: `/${space.slug}`, title: space.seoTitle, description: space.seoDescription });
}

export default async function SpacePage({ params }: Props) {
  const space = getSpace((await params).espaco);
  if (!space) notFound();
  const path = `/${space.slug}`;
  const others = spaces.filter((s) => s.slug !== space.slug);
  const message = `Olá! Tenho interesse em ${space.name.toLowerCase()} no Origami Hub.`;

  return (
    <>
      <JsonLd data={graph(webPage(path, space.seoTitle, space.seoDescription), service(space), breadcrumbs([{ name: space.name, path }]))} />

      <section className="hero hero-page">
        <div className="container">
          <Breadcrumbs current={space.name} />
          <p className="pill"><i aria-hidden="true" /> {space.name} · {site.address.city} (MG)</p>
          <h1 className="serif"><Highlight text={space.h1} highlight={space.h1Highlight} /></h1>
          <p className="lead">{space.answer}</p>
          <div className="hero-actions">
            <a className="btn btn-primary btn-lg" href={whatsappUrl(message)} target="_blank" rel="noopener">
              {space.cta} <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </section>

      <div className="over">
        <section className="section">
          <div className="container two-col">
            <div>
              <p className="big-text">{space.intro}</p>
              <p className="eyebrow">Para quem é</p>
              <ul className="ring-list ring-list-light">
                {space.idealFor.map((x) => <li key={x}><Icon name="ring" size={18} /> {x}</li>)}
              </ul>
            </div>
            <QuickFacts type={`${space.name} no ${site.shortName}`} idealFor={space.idealFor.slice(0, 3).join(", ")} />
          </div>
        </section>

        <section className="section section-dark rounded-top">
          <div className="container two-col">
            <div>
              <p className="eyebrow">Estrutura</p>
              <h2 className="serif">O que está <em>incluso</em></h2>
              <ul className="panel-tiles panel-tiles-dark">
                {space.includes.map((x) => (
                  <li key={x}><span className="tile-icon"><Icon name={iconFor(x)} size={18} /></span><span>{x}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Como reservar</p>
              <h2 className="serif">Simples, <em>pelo WhatsApp</em></h2>
              <ol className="steps-list">
                {space.steps.map((x, i) => (
                  <li key={x}><span className="step-num">0{i + 1}</span><span>{x}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Faq items={space.faq} title={`Dúvidas sobre ${space.name.toLowerCase()} em Formiga`} />

        <section className="section">
          <div className="container">
            <p className="eyebrow">Outros espaços</p>
            <h2>Conheça também</h2>
            <div className="cards-2">
              {others.map((o) => (
                <article className="card" key={o.slug}>
                  <h3><Link href={`/${o.slug}`}>{o.name}</Link></h3>
                  <p>{o.summary}</p>
                  <Link className="link-arrow" href={`/${o.slug}`}>Ver {o.name.toLowerCase()} <Icon name="arrow" size={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Cta message={message} label={space.cta} />
      </div>
    </>
  );
}
