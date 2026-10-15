import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { QuickFacts } from "@/components/QuickFacts";
import { SpaceCard } from "@/components/SpaceCard";
import { graph, webPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, generalFaq, mapsUrl, site, spaces, whatsappUrl } from "@/lib/site";

const title = "Origami Hub — Coworking e sala de reunião em Formiga (MG)";

export const metadata: Metadata = pageMetadata({ path: "/", title, description: site.description });

const steps = [
  { t: "Chame no WhatsApp", d: "Conte se precisa de estação de trabalho, sala de reunião ou sala grande." },
  { t: "Agende a visita", d: "Conheça o espaço pessoalmente e tire suas dúvidas com a equipe." },
  { t: "Reserve e use", d: "Confirmamos disponibilidade e valores, e o espaço fica pronto para você." },
];

export default function Home() {
  return (
    <>
      <JsonLd data={graph(webPage("/", title, site.description))} />

      <section className="hero hero-home">
        <div className="container hero-grid">
          <div>
            <p className="pill"><i aria-hidden="true" /> Coworking em Formiga · MG</p>
            <h1 className="serif">
              Coworking em Formiga para <em>trabalhar, reunir e cooperar</em>.
            </h1>
            <p className="lead">
              O <strong>Origami Hub</strong> é um coworking no Centro de Formiga (MG) com estrutura completa para trabalho e
              reuniões: estações de trabalho, sala de reunião para receber clientes e sala grande para treinamentos e workshops.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href={whatsappUrl()} target="_blank" rel="noopener">
                Agendar visita <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost btn-lg" href="#espacos">Ver os espaços</a>
            </div>
            <p className="hero-note">
              <Icon name="pin" size={16} /> {site.address.district} de {site.address.city} · WhatsApp {site.whatsapp.display}
            </p>
          </div>
          <Logo className="hero-art" width={440} id="hero-logo" animated />
        </div>
        <a className="scroll-hint" href="#espacos" aria-label="Rolar para os espaços">Role<span aria-hidden="true" /></a>
      </section>

      <div className="over">
        <Marquee />

        <section className="section" id="espacos" aria-labelledby="espacos-titulo">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Espaços</p>
                <h2 id="espacos-titulo">Três formatos para o jeito que você trabalha</h2>
              </div>
              <a className="link-arrow" href={whatsappUrl()} target="_blank" rel="noopener">
                Falar com a equipe <Icon name="arrow" size={16} />
              </a>
            </div>
            <div className="space-stack">
              {spaces.map((s, i) => (
                <SpaceCard key={s.slug} space={s} index={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-white" aria-labelledby="estrutura">
          <div className="container">
            <p className="eyebrow">Estrutura</p>
            <h2 id="estrutura">Chegue e trabalhe. O resto é com a gente.</h2>
            <ul className="amenities">
              {site.amenities.map((a) => (
                <li key={a.name}><span className="tile-icon"><Icon name={a.icon} size={20} /></span> {a.name}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-dark rounded-top" aria-labelledby="como-funciona">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Como funciona</p>
                <h2 id="como-funciona" className="serif">Da primeira mensagem <em>ao primeiro dia</em></h2>
              </div>
            </div>
            <ol className="steps-grid">
              {steps.map((s, i) => (
                <li key={s.t}>
                  <span className="step-num">0{i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-green" aria-labelledby="localizacao">
          <div className="container two-col">
            <div>
              <p className="eyebrow">Localização</p>
              <h2 id="localizacao" className="serif">No Centro de Formiga, <em>perto de tudo</em></h2>
              <p className="lead-sm">
                O Origami Hub fica em <strong>{fullAddress}</strong>. Fácil de chegar para quem é de Formiga e para quem vem de{" "}
                {site.nearbyCities.slice(0, 4).join(", ")} e outras cidades do {site.region}.
              </p>
              <p className="lead-sm">
                O Hub é um espaço da <a href={site.parent.url}>{site.parent.name}</a>, empresa de tecnologia de Formiga que
                desenvolve software, automação e inteligência artificial para a indústria. A gente trabalha aqui também.
              </p>
              <div className="hero-actions">
                <a className="btn btn-ghost" href={mapsUrl} target="_blank" rel="noopener"><Icon name="pin" size={18} /> Abrir no Google Maps</a>
                <Link className="link-arrow" href="/sobre">Conheça a história <Icon name="arrow" size={16} /></Link>
              </div>
            </div>
            <QuickFacts type="Coworking, sala de reunião e sala grande" idealFor="Autônomos, equipes remotas, pequenas empresas, treinamentos e reuniões com clientes" />
          </div>
        </section>

        <Faq items={generalFaq} />
        <Cta />
      </div>
    </>
  );
}
