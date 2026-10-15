import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/Cta";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, QuickFacts } from "@/components/QuickFacts";
import { breadcrumbs, graph, ids, webPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site, spaces } from "@/lib/site";

const title = "Sobre o Origami Hub, coworking da Origami Lab em Formiga (MG)";
const description =
  "Conheça o Origami Hub: o coworking da Origami Lab no Centro de Formiga (MG), criado para profissionais e empresas que precisam de estrutura para trabalhar, reunir e cooperar.";

export const metadata: Metadata = pageMetadata({ path: "/sobre", title, description });

export default function Sobre() {
  const page = { ...webPage("/sobre", title, description), "@type": "AboutPage", mainEntity: { "@id": ids.business } };
  return (
    <>
      <JsonLd data={graph(page, breadcrumbs([{ name: "Sobre", path: "/sobre" }]))} />
      <section className="hero hero-page">
        <div className="container">
          <Breadcrumbs current="Sobre" />
          <p className="pill"><i aria-hidden="true" /> Sobre o Hub</p>
          <h1 className="serif">Um espaço para dobrar ideias <em>em projetos</em></h1>
          <p className="lead">
            O Origami Hub é o coworking da <a href={site.parent.url}>{site.parent.name}</a> no Centro de Formiga (MG): um
            lugar com estrutura completa para trabalho e reuniões, aberto a profissionais e empresas da cidade e da região.
          </p>
        </div>
      </section>

      <div className="over">
        <section className="section">
          <div className="container two-col">
            <div className="prose">
              <h2>Por que criamos o Hub</h2>
              <p>
                A {site.parent.name} é uma empresa de tecnologia de Formiga que desenvolve software sob medida, integrações,
                automação e inteligência artificial para a indústria. No dia a dia, vimos que muita gente boa da região não
                tinha onde trabalhar com foco, receber um cliente com tranquilidade ou reunir uma turma para um treinamento.
              </p>
              <p>
                O Origami Hub nasceu para resolver isso: abrimos nosso espaço para que autônomos, equipes remotas, pequenas
                empresas e quem está de passagem pelo {site.region} tenham uma estrutura profissional sem precisar montar um
                escritório.
              </p>
              <h2>O nome</h2>
              <p>
                Origami é a arte de transformar uma folha simples em algo novo, dobra a dobra. É assim que vemos o trabalho:
                ideias ganham forma com espaço, foco e as pessoas certas por perto.
              </p>
            </div>
            <QuickFacts type="Coworking operado pela Origami Lab" idealFor="Profissionais e empresas de Formiga e região" />
          </div>
        </section>

        <section className="section section-dark rounded-top">
          <div className="container">
            <p className="eyebrow">O que você encontra aqui</p>
            <h2 className="serif">Três espaços, <em>uma estrutura</em></h2>
            <div className="cards-3">
              {spaces.map((s, i) => (
                <article className="card card-dark" key={s.slug}>
                  <span className="step-num">0{i + 1}</span>
                  <h3><Link href={`/${s.slug}`}>{s.name}</Link></h3>
                  <p>{s.summary}</p>
                  <Link className="link-arrow" href={`/${s.slug}`}>Conhecer <Icon name="arrow" size={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Cta />
      </div>
    </>
  );
}
