import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { spaces } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="hero hero-page hero-404">
      <div className="container narrow">
        <p className="pill"><i aria-hidden="true" /> Erro 404</p>
        <h1 className="serif">Essa página se desdobrou <em>e sumiu</em></h1>
        <p className="lead">O endereço pode ter mudado. Veja os espaços do Origami Hub:</p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/">Página inicial <Icon name="arrow" size={16} /></Link>
          {spaces.map((s) => (
            <Link key={s.slug} className="btn btn-ghost" href={`/${s.slug}`}>{s.name}</Link>
          ))}
        </div>
      </div>
    </section>
  );
}
