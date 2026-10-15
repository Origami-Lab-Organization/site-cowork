import Link from "next/link";
import { site, spaces, whatsappUrl } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  ...spaces.map((s) => ({ href: `/${s.slug}`, label: s.name })),
  { href: "/sobre", label: "Sobre" },
  { href: "/perguntas-frequentes", label: "Dúvidas" },
];

export function Wordmark() {
  return (
    <span className="wordmark">
      origami<small>.hub</small>
    </span>
  );
}

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} — página inicial`}>
          <Logo width={34} id="header-logo" />
          <Wordmark />
        </Link>
        <nav aria-label="Principal" className="nav-desktop">
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="btn btn-primary btn-sm" href={whatsappUrl()} target="_blank" rel="noopener">Agendar visita</a>
          <details className="nav-mobile">
            <summary aria-label="Abrir menu">Menu</summary>
            <nav aria-label="Menu móvel">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
      <span className="nav-progress" aria-hidden="true" />
    </header>
  );
}
