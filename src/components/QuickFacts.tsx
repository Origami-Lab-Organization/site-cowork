import Link from "next/link";
import { fullAddress, site } from "@/lib/site";

/** Resumo com fatos objetivos: fácil de ler por pessoas, buscadores e IAs. */
export function QuickFacts({ type, idealFor }: { type: string; idealFor: string }) {
  const rows: Array<[string, string]> = [
    ["Espaço", type],
    ["Cidade", `${site.address.city} (${site.address.region}), bairro ${site.address.district}`],
    ["Endereço", fullAddress],
    ["Ideal para", idealFor],
    ["Reservas e visitas", `WhatsApp ${site.whatsapp.display}`],
    ["Horário", site.hours ? site.hours.map((h) => h.label).join(" · ") : "Atendimento com agendamento pelo WhatsApp"],
  ];
  return (
    <aside className="facts" aria-label="Resumo">
      <p className="facts-title">Resumo</p>
      <dl>
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Trilha de navegação" className="breadcrumbs">
      <Link href="/">Início</Link> <span aria-hidden="true">/</span> <span aria-current="page">{current}</span>
    </nav>
  );
}
