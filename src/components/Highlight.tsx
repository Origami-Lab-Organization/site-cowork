/** Renderiza `text` com o trecho `highlight` em itálico verde (estilo serif da Origami Lab). */
export function Highlight({ text, highlight }: { text: string; highlight?: string }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{highlight}</em>
      {text.slice(i + highlight.length)}
    </>
  );
}
