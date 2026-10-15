import Link from "next/link";
import { fullAddress, mapsUrl, site, spaces, whatsappUrl } from "@/lib/site";
import { Wordmark } from "./Header";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-brand"><Logo width={38} id="footer-logo" /> <Wordmark /></p>
            <p className="footer-desc">Coworking, sala de reunião e sala grande para treinamentos no Centro de {site.address.city} ({site.address.region}).</p>
            <a className="btn btn-ghost btn-sm" href={whatsappUrl()} target="_blank" rel="noopener">Agendar visita</a>
          </div>
          <div>
            <p className="footer-title">Espaços</p>
            <ul>
              {spaces.map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}`}>{s.name} em {site.address.city}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-title">Navegar</p>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/sobre">Sobre o Hub</Link></li>
              <li><Link href="/perguntas-frequentes">Perguntas frequentes</Link></li>
              <li><a href={site.parent.url}>{site.parent.name}</a></li>
            </ul>
          </div>
          <address>
            <p className="footer-title">Contato</p>
            <ul>
              <li><a href={whatsappUrl()} target="_blank" rel="noopener">WhatsApp · {site.whatsapp.display}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={mapsUrl} target="_blank" rel="noopener">{fullAddress}</a></li>
            </ul>
            <div className="socials">
              <a href={site.instagram} target="_blank" rel="noopener me" aria-label="Instagram do Origami Hub"><Icon name="instagram" size={18} /></a>
            </div>
          </address>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name} · Um espaço da {site.parent.name}</p>
          <p className="footer-tagline">{site.tagline}.</p>
        </div>
      </div>
      <p className="footer-watermark" aria-hidden="true">origami<span>.hub</span></p>
    </footer>
  );
}
