const paths: Record<string, string> = {
  wifi: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  coffee: "M4 8h13v5a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6V8Zm13 1h1.5a2.5 2.5 0 0 1 0 5H17M8 2v3M12 2v3",
  air: "M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h8",
  screen: "M3 4h18v12H3zM8 20h8M12 16v4",
  pin: "M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  hand: "M7 11V6a1.5 1.5 0 0 1 3 0v4m0-5a1.5 1.5 0 0 1 3 0v5m0-4a1.5 1.5 0 0 1 3 0v5m0-2a1.5 1.5 0 0 1 3 0v4a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L4 13a1.5 1.5 0 0 1 2.6-1.5L7 12",
  check: "M5 12.5l4.5 4.5L19 7.5",
  ring: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z",
  whatsapp: "M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3l-4.5 1.2ZM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1c-1-.5-2.5-2-3-3l1-1-1-2L9 8.5Z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  desk: "M3 10h18M5 10v9M19 10v9M8 10V6h8v4",
  door: "M6 21V4h12v17M3 21h18M14 12h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  users: "M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19v-1a4 4 0 0 0-3-3.9M15.5 3.1a3.5 3.5 0 0 1 0 6.8",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5-9.5h.01",
};

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] ?? paths.check} />
    </svg>
  );
}

/** Escolhe um ícone pelo texto do item ("Internet Wi-Fi…" → wifi). */
export function iconFor(text: string) {
  const t = text.toLowerCase();
  if (t.includes("mesa") || t.includes("estação")) return "desk";
  if (t.includes("wi-fi") || t.includes("internet")) return "wifi";
  if (t.includes("café")) return "coffee";
  if (t.includes("tela") || t.includes("tv")) return "screen";
  if (t.includes("climatiz")) return "air";
  if (t.includes("endereço") || t.includes("centro")) return "pin";
  if (t.includes("layout") || t.includes("amplo")) return "grid";
  if (t.includes("reunião")) return "door";
  return "check";
}
