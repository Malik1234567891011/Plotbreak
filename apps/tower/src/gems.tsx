import type { ReactNode } from 'react';
import crystal from './assets/crystal.png';

/** Design v3: the crystal picture is the only currency mark, never the ◆ glyph. */
export function Gem() { return <img className="gem" src={crystal} alt="" aria-hidden="true" />; }

/** A sentence with ◆ in it, each ◆ drawn as the crystal. */
export function gems(text: string): ReactNode {
  return text.split('◆').flatMap((part, i) => (i === 0 ? [part] : [<Gem key={i} />, part]));
}
