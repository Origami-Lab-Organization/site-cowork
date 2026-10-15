/** Marca oficial da Origami Lab (origamilab.com.br/assets/logo-mark-color.svg). */
export const LOGO_PATHS = {
  main: "M1083 0L1373 491L1276 763H889L796 491L1083 0ZM669 491H0L870 1555L1083 1424L1296 1555L2166 491H1497L1305.31 923H860.691L669 491Z",
  shades: [
    "M1305 923H860L1083 1424L1305 923Z",
    "M222.521 763L0.0214844 491H669.021L222.521 763Z",
    "M2166.02 491H1497.02L1943.52 763L2166.02 491Z",
    "M1230 249L1081.52 493.5L937.5 249L1083.02 0L1230 249Z",
  ],
  dark: "#2D4A4C",
  from: "#00AF69",
  to: "#284D4B",
};

/** SVG como string — usado no favicon e na imagem de Open Graph. */
export function logoSvg(viewBox = "0 0 2167 1555") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none"><defs><linearGradient id="g" x1="1084.5" y1="0" x2="1083" y2="1759.5" gradientUnits="userSpaceOnUse"><stop stop-color="${LOGO_PATHS.from}"/><stop offset="1" stop-color="${LOGO_PATHS.to}"/></linearGradient></defs><path fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_PATHS.main}" fill="url(#g)"/>${LOGO_PATHS.shades.map((d) => `<path d="${d}" fill="${LOGO_PATHS.dark}"/>`).join("")}</svg>`;
}

/** Ordem de `shades`: centro, asa esquerda, asa direita, topo — cada dobra entra de um lado. */
const FOLD_CLASSES = ["fold-up", "fold-left", "fold-right", "fold-down"];

export function Logo({ width = 40, id = "logo", className, animated = false }: { width?: number; id?: string; className?: string; animated?: boolean }) {
  const gradient = `${id}-g`;
  const svgClass = [className, animated && "logo-animated"].filter(Boolean).join(" ") || undefined;
  return (
    <svg className={svgClass} width={width} height={Math.round((width * 1555) / 2167)} viewBox="0 0 2167 1555" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="1084.5" y1="0" x2="1083" y2="1759.5" gradientUnits="userSpaceOnUse">
          <stop stopColor={LOGO_PATHS.from} />
          <stop offset="1" stopColor={LOGO_PATHS.to} />
        </linearGradient>
      </defs>
      <g className={animated ? "logo-float" : undefined}>
        <path className={animated ? "fold-main" : undefined} fillRule="evenodd" clipRule="evenodd" d={LOGO_PATHS.main} fill={`url(#${gradient})`} />
        {LOGO_PATHS.shades.map((d, i) => (
          <path key={d} className={animated ? FOLD_CLASSES[i] : undefined} d={d} fill={LOGO_PATHS.dark} />
        ))}
      </g>
    </svg>
  );
}
