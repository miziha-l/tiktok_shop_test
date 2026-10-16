import Link from 'next/link';
import { Music2 } from 'lucide-react';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? 'brand--light' : ''}`} href="/" aria-label="TikTok Shop home">
      <span className="brand__mark"><Music2 size={22} strokeWidth={3} /></span>
      <span className="brand__type">TikTok <b>Shop</b></span>
    </Link>
  );
}
