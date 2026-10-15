import { SITE_URL, mapsUrl, site, type Space } from "./site";

/**
 * Grafo de entidades com @id estáveis: buscadores e IAs ligam Organization →
 * LocalBusiness → Service → WebPage. Tudo aqui precisa corresponder ao
 * conteúdo visível da página. Sem FAQPage (rich result descontinuado pelo Google)
 * e sem reviews/preços inventados.
 */

export const ids = {
  org: `${site.parent.url}/#organization`,
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
};

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const areaServed = [
  { "@type": "City", name: `${site.address.city}, ${site.address.regionName}` },
  ...site.nearbyCities.map((name) => ({ "@type": "City", name: `${name}, ${site.address.regionName}` })),
];

export function organization() {
  return {
    "@type": "Organization",
    "@id": ids.org,
    name: site.parent.name,
    url: site.parent.url,
    sameAs: site.parent.sameAs,
    email: site.email,
  };
}

export function localBusiness() {
  return {
    "@type": "LocalBusiness",
    "@id": ids.business,
    name: site.name,
    alternateName: site.alternateNames,
    description: site.description,
    slogan: site.tagline,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icon.svg`,
    telephone: site.whatsapp.e164,
    email: site.email,
    address: postalAddress,
    hasMap: mapsUrl,
    areaServed,
    knowsAbout: ["coworking", "sala de reunião", "aluguel de sala para treinamento", "espaço para workshop", "escritório compartilhado"],
    parentOrganization: { "@id": ids.org },
    sameAs: [site.instagram],
    amenityFeature: site.amenities.map((a) => ({ "@type": "LocationFeatureSpecification", name: a.name, value: true })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.whatsapp.e164,
      availableLanguage: "Portuguese",
      url: `https://wa.me/${site.whatsapp.number}`,
    },
    ...(site.geo && { geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng } }),
    ...(site.hours && {
      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@id": `${SITE_URL}/coworking#service` } },
      { "@type": "Offer", itemOffered: { "@id": `${SITE_URL}/sala-de-reuniao#service` } },
      { "@type": "Offer", itemOffered: { "@id": `${SITE_URL}/sala-grande#service` } },
    ],
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: SITE_URL,
    name: site.name,
    alternateName: site.alternateNames,
    inLanguage: site.lang,
    publisher: { "@id": ids.business },
  };
}

export function webPage(path: string, name: string, description: string) {
  const url = `${SITE_URL}${path}`;
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: site.lang,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
  };
}

export function breadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Início", path: "" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path || "/"}`,
    })),
  };
}

export function service(space: Space) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/${space.slug}#service`,
    name: `${space.name} em ${site.address.city} (${site.address.region})`,
    serviceType: space.name,
    description: space.answer,
    url: `${SITE_URL}/${space.slug}`,
    provider: { "@id": ids.business },
    areaServed,
    audience: { "@type": "Audience", audienceType: space.idealFor.join("; ") },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: site.whatsapp.e164,
      serviceUrl: `https://wa.me/${site.whatsapp.number}`,
      serviceLocation: { "@type": "Place", name: site.name, address: postalAddress },
    },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
