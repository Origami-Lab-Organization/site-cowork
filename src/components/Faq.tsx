import type { Faq as FaqItem } from "@/lib/site";
import { whatsappUrl } from "@/lib/site";

type Props = { items: FaqItem[]; title?: string; id?: string; eyebrow?: string };

/** FAQ editorial visível e rastreável (details/summary: o texto está no HTML, sem JS). */
export function Faq({ items, title = "Perguntas frequentes", id = "duvidas", eyebrow = "Dúvidas" }: Props) {
  return (
    <section className="section section-white" aria-labelledby={id}>
      <div className="container faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id}>{title}</h2>
          <p className="muted">
            Ficou alguma dúvida que não está aqui?{" "}
            <a href={whatsappUrl("Olá! Tenho uma dúvida sobre o Origami Hub.")} target="_blank" rel="noopener">Fale com a gente</a>.
          </p>
        </div>
        <div className="faq">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary><h3>{item.q}</h3></summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
