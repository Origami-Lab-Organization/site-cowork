import Link from "next/link";
import type { Space } from "@/lib/site";
import { Icon, iconFor } from "./Icon";

/** Card escuro numerado (linguagem dos cards de serviço da Origami Lab), empilha ao rolar. */
export function SpaceCard({ space, index }: { space: Space; index: number }) {
  return (
    <article className="space-card" style={{ "--i": index } as React.CSSProperties}>
      <div className="space-card-text">
        <p className="space-num"><span>0{index + 1}</span></p>
        <h3><Link href={`/${space.slug}`}>{space.name}</Link></h3>
        <p className="space-summary">{space.summary}</p>
        <ul className="ring-list">
          {space.idealFor.slice(0, 4).map((x) => (
            <li key={x}><Icon name="ring" size={18} /> {x}</li>
          ))}
        </ul>
        <Link className="link-arrow" href={`/${space.slug}`}>
          Conhecer {space.name.toLowerCase()} <Icon name="arrow" size={16} />
        </Link>
      </div>
      <div className="panel">
        <div className="panel-head">
          <span>O que está incluso</span>
          <span className="panel-tag"><i aria-hidden="true" /> {space.name}</span>
        </div>
        <ul className="panel-tiles">
          {space.includes.slice(0, 4).map((x) => (
            <li key={x}>
              <span className="tile-icon"><Icon name={iconFor(x)} size={18} /></span>
              <span>{x}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
