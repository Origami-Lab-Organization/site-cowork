import { audiences } from "@/lib/site";

/** Faixa infinita (CSS puro). A segunda cópia é decorativa e fica oculta para leitores de tela. */
export function Marquee() {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {audiences.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-label="Para quem é o Origami Hub">
      <div className="marquee-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
