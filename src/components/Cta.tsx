import { mapsUrl, site, whatsappUrl } from "@/lib/site";
import { Highlight } from "./Highlight";
import { Icon } from "./Icon";

type Props = { title?: string; highlight?: string; text?: string; label?: string; message?: string };

export function Cta({
  title = "Venha conhecer o Hub e trabalhe do seu jeito",
  highlight = "trabalhe do seu jeito",
  text,
  label = "Agendar visita",
  message,
}: Props) {
  return (
    <section className="cta-section">
      <div className="container narrow cta-inner">
        <h2 className="serif"><Highlight text={title} highlight={highlight} /></h2>
        <p>{text ?? `Marque um horário e conheça os espaços pessoalmente. Respondemos pelo WhatsApp ${site.whatsapp.display}.`}</p>
        <div className="cta-actions">
          <a className="btn btn-primary btn-lg" href={whatsappUrl(message)} target="_blank" rel="noopener">
            {label} <Icon name="arrow" size={18} />
          </a>
          <a className="btn btn-ghost btn-lg" href={mapsUrl} target="_blank" rel="noopener">
            <Icon name="pin" size={18} /> Ver no mapa
          </a>
        </div>
      </div>
    </section>
  );
}
