"use client";

import { THEME_KEY as KEY } from "@/lib/theme";

/**
 * Alterna entre claro e escuro. Sem escolha salva, o site segue o sistema
 * (CSS `prefers-color-scheme`). A escolha fica em localStorage, só neste navegador.
 * Os dois ícones vêm no HTML e o CSS mostra o certo, então não há flash na hidratação.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* navegação privada ou storage bloqueado: vale só para esta visita */
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label="Alternar entre modo claro e escuro" title="Modo claro/escuro">
      <svg className="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      </svg>
      <svg className="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
