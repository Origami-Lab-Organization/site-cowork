/**
 * Fonte única dos dados do negócio. Metadata, JSON-LD, sitemap, llms.txt e
 * páginas leem daqui — altere aqui e tudo fica consistente.
 *
 * Itens marcados com CONFIRMAR precisam ser validados com a operação antes
 * do lançamento: o que está publicado vira fato para Google e para IAs.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cowork.origamilab.com.br").replace(/\/$/, "");

/** Data da última revisão real do conteúdo (usada no sitemap). Atualize ao mudar textos. */
export const CONTENT_UPDATED = "2026-10-15";

type Hours = { days: Array<"Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday">; opens: string; closes: string; label: string };

export const site = {
  name: "Origami Hub Coworking",
  shortName: "Origami Hub",
  alternateNames: ["Origami Cowork", "Origami Hub", "Origami Hub Formiga"],
  tagline: "Estrutura completa para trabalho e reuniões",
  description:
    "Coworking no Centro de Formiga (MG) com estações de trabalho, sala de reunião e sala grande para treinamentos e workshops. Estrutura completa para trabalhar e receber clientes. Agende uma visita pelo WhatsApp.",
  locale: "pt_BR",
  lang: "pt-BR",
  whatsapp: { number: "5537999317586", display: "(37) 99931-7586", e164: "+55-37-99931-7586" },
  email: "contato@origamilab.com.br",
  // CONFIRMAR: endereço do Hub (usado o da Origami Lab, publicado em origamilab.com.br).
  address: {
    street: "Rua Silviano Brandão, 156, 2º andar",
    district: "Centro",
    city: "Formiga",
    region: "MG",
    regionName: "Minas Gerais",
    postalCode: "35570-112",
    country: "BR",
  },
  // CONFIRMAR: preencha lat/lng reais (Google Maps → clique no pin) para ativar `geo` no schema.
  geo: null as null | { lat: number; lng: number },
  // CONFIRMAR: preencha os horários reais. Enquanto for null, nada é publicado no schema.
  hours: null as null | Hours[],
  instagram: "https://www.instagram.com/origamihub_/",
  region: "Centro-Oeste de Minas",
  nearbyCities: ["Arcos", "Pimenta", "Candeias", "Córrego Fundo", "Pains", "Bambuí", "Divinópolis"],
  parent: {
    name: "Origami Lab",
    url: "https://origamilab.com.br",
    sameAs: ["https://www.linkedin.com/company/origamilab-br/", "https://www.instagram.com/origamilab_br/"],
  },
  // CONFIRMAR: comodidades reais do espaço. Só publique o que existe.
  amenities: [
    { name: "Internet Wi-Fi de alta velocidade", icon: "wifi" },
    { name: "Café e água à vontade", icon: "coffee" },
    { name: "Ambiente climatizado", icon: "air" },
    { name: "TV/tela para apresentações", icon: "screen" },
    { name: "Localização no Centro de Formiga", icon: "pin" },
    { name: "Atendimento de quem opera o espaço", icon: "hand" },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.region}, ${site.address.postalCode}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;

export function whatsappUrl(message = "Olá! Vim pelo site e quero agendar uma visita ao Origami Hub.") {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export type Faq = { q: string; a: string };

export type Space = {
  slug: string;
  name: string;
  /** <title> — intenção de busca principal + cidade. */
  seoTitle: string;
  seoDescription: string;
  h1: string;
  /** Trecho do h1 exibido em itálico verde (precisa existir dentro do h1). */
  h1Highlight: string;
  /** Resposta direta em 1–2 frases: o trecho que buscadores e IAs tendem a extrair. */
  answer: string;
  /** Uma linha para os cards da home. */
  summary: string;
  intro: string;
  idealFor: string[];
  includes: string[];
  steps: string[];
  faq: Faq[];
  cta: string;
};

export const spaces: Space[] = [
  {
    slug: "coworking",
    name: "Coworking",
    seoTitle: "Coworking em Formiga (MG) — estações de trabalho no Centro",
    seoDescription:
      "Trabalhe em um coworking no Centro de Formiga (MG): estação de trabalho, internet rápida, café e sala de reunião no mesmo lugar. Agende uma visita ao Origami Hub.",
    h1: "Coworking em Formiga para trabalhar com foco",
    h1Highlight: "trabalhar com foco",
    answer:
      "O Origami Hub é um coworking no Centro de Formiga (MG) com estações de trabalho prontas para usar, internet rápida, café e acesso a salas de reunião, para quem quer sair de casa sem montar um escritório.",
    summary: "Estações de trabalho prontas, internet rápida e café para trabalhar com foco fora de casa.",
    intro:
      "Trocar a mesa da cozinha por um ambiente profissional muda o ritmo do dia. No coworking do Origami Hub você chega, abre o notebook e trabalha — a estrutura, a limpeza e a manutenção ficam por nossa conta.",
    idealFor: [
      "Profissionais autônomos e freelancers",
      "Quem trabalha remoto para empresas de outras cidades",
      "Pequenas equipes e startups em fase inicial",
      "Profissionais de passagem pelo Centro-Oeste de Minas",
    ],
    includes: [
      "Estação de trabalho em ambiente silencioso e climatizado",
      "Internet Wi-Fi de alta velocidade",
      "Café e água",
      "Acesso facilitado à sala de reunião para receber clientes",
      "Endereço central, fácil de chegar",
    ],
    steps: [
      "Chame no WhatsApp e conte como você trabalha",
      "Agende uma visita para conhecer o espaço",
      "Escolha o formato que faz sentido e comece a usar",
    ],
    faq: [
      {
        q: "Quanto custa o coworking em Formiga no Origami Hub?",
        a: "Os valores dependem do formato e do período de uso. Envie uma mensagem no WhatsApp contando sua rotina e mandamos as opções atualizadas.",
      },
      {
        q: "Posso conhecer o coworking antes de fechar?",
        a: "Sim. Recomendamos agendar uma visita pelo WhatsApp para conhecer as estações, as salas e tirar dúvidas pessoalmente.",
      },
      {
        q: "Consigo receber clientes estando no coworking?",
        a: "Sim. O Origami Hub tem sala de reunião no mesmo espaço, então você recebe clientes em um ambiente reservado e profissional.",
      },
    ],
    cta: "Quero conhecer o coworking",
  },
  {
    slug: "sala-de-reuniao",
    name: "Sala de reunião",
    seoTitle: "Sala de reunião para alugar em Formiga (MG) — Origami Hub",
    seoDescription:
      "Alugue uma sala de reunião no Centro de Formiga (MG) para receber clientes, fazer entrevistas e reuniões de equipe, com tela para apresentação e internet rápida.",
    h1: "Sala de reunião em Formiga para receber bem quem importa",
    h1Highlight: "receber bem quem importa",
    answer:
      "O Origami Hub aluga sala de reunião no Centro de Formiga (MG) para reuniões com clientes, entrevistas, negociações e reuniões de equipe, com tela para apresentações, internet rápida e café.",
    summary: "Ambiente reservado com tela para apresentação para receber clientes, entrevistar e alinhar a equipe.",
    intro:
      "Reunião importante pede lugar à altura: reservado, confortável e com tudo funcionando na hora. Você chega, conecta o notebook e foca na conversa.",
    idealFor: [
      "Reuniões com clientes e fornecedores",
      "Entrevistas e processos seletivos",
      "Negociações e assinaturas de contrato",
      "Reuniões de equipe e alinhamentos",
      "Atendimentos de profissionais liberais",
    ],
    includes: [
      "Mesa de reunião em ambiente reservado",
      "TV/tela para apresentações",
      "Internet Wi-Fi de alta velocidade",
      "Café e água para você e seus convidados",
      "Ambiente climatizado",
    ],
    steps: [
      "Envie no WhatsApp a data, o horário e o número de pessoas",
      "Confirmamos a disponibilidade e o valor",
      "No dia, é só chegar com seus convidados",
    ],
    faq: [
      {
        q: "Preciso ser cliente do coworking para alugar a sala de reunião?",
        a: "Fale com a gente pelo WhatsApp informando data, horário e número de pessoas. Indicamos o formato de reserva disponível para o seu caso.",
      },
      {
        q: "Como reservar a sala de reunião?",
        a: "A reserva é feita pelo WhatsApp (37) 99931-7586. Confirmamos disponibilidade, valor e detalhes antes do dia.",
      },
      {
        q: "A sala tem tela para apresentação?",
        a: "Sim, a sala de reunião conta com TV/tela para você conectar o notebook e apresentar.",
      },
    ],
    cta: "Quero reservar a sala de reunião",
  },
  {
    slug: "sala-grande",
    name: "Sala grande",
    seoTitle: "Sala para treinamentos, workshops e eventos em Formiga (MG)",
    seoDescription:
      "Sala grande no Centro de Formiga (MG) para treinamentos, workshops, palestras, aulas e encontros de equipe. Estrutura pronta, internet e tela. Consulte datas no WhatsApp.",
    h1: "Sala grande para treinamentos, workshops e encontros",
    h1Highlight: "workshops e encontros",
    answer:
      "A sala grande do Origami Hub, no Centro de Formiga (MG), recebe treinamentos, workshops, palestras, aulas e encontros de equipe com tela, internet rápida e estrutura pronta para o seu evento.",
    summary: "Espaço amplo e flexível para treinamentos, workshops, aulas, palestras e encontros de equipe.",
    intro:
      "Quando o grupo não cabe numa sala de reunião, a sala grande resolve. Um espaço amplo e flexível para ensinar, apresentar e reunir pessoas sem precisar de auditório.",
    idealFor: [
      "Treinamentos corporativos e integração de equipes",
      "Workshops, cursos e aulas presenciais",
      "Palestras e apresentações",
      "Planejamento estratégico e dinâmicas em grupo",
      "Encontros de comunidades e networking",
    ],
    includes: [
      "Espaço amplo com layout flexível",
      "TV/tela para apresentações",
      "Internet Wi-Fi de alta velocidade",
      "Café e água",
      "Ambiente climatizado no Centro da cidade",
    ],
    steps: [
      "Conte no WhatsApp o tipo de evento, a data e o número de participantes",
      "Montamos a proposta com disponibilidade e valor",
      "Você confirma e a sala fica pronta no dia",
    ],
    faq: [
      {
        q: "Quantas pessoas cabem na sala grande?",
        a: "A capacidade depende do formato (auditório, mesas, roda de conversa). Informe o número de participantes no WhatsApp e confirmamos o melhor arranjo.",
      },
      {
        q: "Posso fazer um curso ou workshop com várias datas?",
        a: "Sim. Envie o cronograma completo pelo WhatsApp que verificamos a disponibilidade de todas as datas de uma vez.",
      },
      {
        q: "A sala grande serve para treinamento de empresa?",
        a: "Sim. É usada para treinamentos, integração de novos colaboradores, planejamento e reuniões ampliadas de equipe.",
      },
    ],
    cta: "Quero reservar a sala grande",
  },
];

export const generalFaq: Faq[] = [
  {
    q: "O que é o Origami Hub?",
    a: "O Origami Hub é um coworking em Formiga (MG) com estações de trabalho, sala de reunião e sala grande para treinamentos e workshops. É operado pela Origami Lab, empresa de tecnologia da cidade.",
  },
  {
    q: "Onde fica o coworking Origami Hub?",
    a: `No Centro de Formiga (MG): ${fullAddress}.`,
  },
  {
    q: "Quais espaços o Origami Hub oferece?",
    a: "Três formatos: coworking (estações de trabalho), sala de reunião para receber clientes e equipe, e sala grande para treinamentos, workshops, aulas e palestras.",
  },
  {
    q: "Quanto custa usar o Origami Hub?",
    a: "Os valores variam conforme o espaço e o período de uso. Mande uma mensagem no WhatsApp (37) 99931-7586 e enviamos as opções atualizadas.",
  },
  {
    q: "Preciso agendar para conhecer o espaço?",
    a: "Sim, recomendamos agendar a visita pelo WhatsApp para garantir que alguém da equipe te receba e mostre todos os espaços.",
  },
  {
    q: "Qual a relação entre o Origami Hub e a Origami Lab?",
    a: "O Origami Hub é o espaço de coworking da Origami Lab, empresa de tecnologia de Formiga que desenvolve software, automação e inteligência artificial para a indústria.",
  },
  {
    q: "Atendem profissionais de outras cidades da região?",
    a: "Sim. Profissionais de Arcos, Pimenta, Candeias, Pains, Bambuí, Divinópolis e outras cidades do Centro-Oeste de Minas usam o Hub quando precisam de estrutura em Formiga.",
  },
];

/** Faixa de rolagem abaixo do hero: para quem o Hub é feito. */
export const audiences = [
  "Freelancers",
  "Equipes remotas",
  "Reuniões com clientes",
  "Workshops",
  "Entrevistas",
  "Startups",
  "Profissionais liberais",
  "Palestras",
];

export function getSpace(slug: string) {
  return spaces.find((s) => s.slug === slug);
}
