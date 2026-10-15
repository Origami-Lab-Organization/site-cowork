import type { Metadata } from "next";
import { site } from "./site";

const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} em Formiga (MG)` };

/**
 * Metadata completa por página. O Next substitui (não mescla) `openGraph` e
 * `twitter` do layout, então toda página monta o objeto inteiro por aqui.
 */
export function pageMetadata({ path, title, description, absolute = true }: { path: string; title: string; description: string; absolute?: boolean }): Metadata {
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  };
}
