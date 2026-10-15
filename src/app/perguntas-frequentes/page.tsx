import type { Metadata } from "next";
import { Cta } from "@/components/Cta";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/QuickFacts";
import { breadcrumbs, graph, webPage } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { generalFaq, spaces } from "@/lib/site";

const title = "Perguntas frequentes sobre o coworking Origami Hub em Formiga (MG)";
const description =
  "Respostas sobre o Origami Hub: onde fica, quais espaços oferece, como reservar sala de reunião ou sala grande, valores e visitas ao coworking em Formiga (MG).";

export const metadata: Metadata = pageMetadata({ path: "/perguntas-frequentes", title, description });

export default function PerguntasFrequentes() {
  return (
    <>
      <JsonLd data={graph(webPage("/perguntas-frequentes", title, description), breadcrumbs([{ name: "Perguntas frequentes", path: "/perguntas-frequentes" }]))} />
      <section className="hero hero-page">
        <div className="container">
          <Breadcrumbs current="Perguntas frequentes" />
          <p className="pill"><i aria-hidden="true" /> Dúvidas</p>
          <h1 className="serif">Perguntas frequentes sobre o <em>Origami Hub</em></h1>
          <p className="lead">Tudo o que costumam nos perguntar sobre o coworking, a sala de reunião e a sala grande em Formiga (MG).</p>
        </div>
      </section>
      <div className="over">
        <Faq items={generalFaq} title="Sobre o Hub" id="geral" eyebrow="Geral" />
        {spaces.map((s) => (
          <Faq key={s.slug} items={s.faq} title={s.name} id={s.slug} eyebrow="Espaço" />
        ))}
        <Cta title="Não achou sua resposta? Pergunte direto pra gente" highlight="Pergunte direto pra gente" text="Mande sua pergunta no WhatsApp. Respondemos rápido." label="Perguntar no WhatsApp" />
      </div>
    </>
  );
}
