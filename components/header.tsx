'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { products, money } from '@/lib/products';
import { useCart } from './cart-context';
import { Logo } from './logo';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !searchOpen) {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!query.trim()) return products.slice(0, 4);
    const term = query.toLowerCase();
    return products.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(term),
    ).slice(0, 5);
  }, [query]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchOpen(false);
    router.push(`/products${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return (
    <>
      <div className="announcement">
        <span>Free shipping on orders over $40</span>
        <span className="announcement__extra">New drops every Friday · Easy 30-day returns</span>
      </div>
      <header className="site-header">
        <div className="site-header__inner shell">
          <button className="icon-button mobile-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link className={pathname === '/' ? 'active' : ''} href="/">Discover</Link>
            <Link className={pathname.startsWith('/products') ? 'active' : ''} href="/products">Shop all</Link>
            <Link href="/products?category=Fashion">Fashion</Link>
            <Link href="/products?category=Beauty">Beauty</Link>
            <Link href="/products?category=Tech">Tech</Link>
            <Link href="/products?sort=popular">Trending</Link>
          </nav>
          <div className="header-actions">
            <button className="header-search" onClick={() => setSearchOpen(true)} aria-label="Search products">
              <Search size={18} />
              <span>Search</span>
              <kbd>/</kbd>
            </button>
            <button className="icon-button hide-mobile" aria-label="Account"><UserRound size={21} /></button>
            <button className="icon-button bag-button" onClick={openCart} aria-label={`Shopping bag with ${count} items`}>
              <ShoppingBag size={21} />
              {count > 0 && <span className="bag-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-backdrop ${menuOpen ? 'is-open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-nav__top"><Logo /><button className="icon-button" onClick={() => setMenuOpen(false)}><X /></button></div>
        <nav>
          {[
            ['Discover', '/'], ['Shop all', '/products'], ['Fashion', '/products?category=Fashion'],
            ['Beauty', '/products?category=Beauty'], ['Tech', '/products?category=Tech'], ['Home', '/products?category=Home'],
          ].map(([label, href]) => <Link key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></Link>)}
        </nav>
        <p>Curated things worth talking about.</p>
      </aside>

      {searchOpen && (
        <div className="search-modal" role="dialog" aria-modal="true" aria-label="Product search">
          <button className="search-modal__backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />
          <div className="search-panel">
            <form className="search-panel__form" onSubmit={submit}>
              <Search size={23} />
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" />
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)}><X size={20} /></button>
            </form>
            <div className="search-panel__body">
              <div className="search-label">{query ? `Results for “${query}”` : 'Popular right now'}</div>
              {results.length ? results.map((product) => (
                <Link className="search-result" href={`/products/${product.id}`} key={product.id} onClick={() => setSearchOpen(false)}>
                  <img src={product.image} alt="" />
                  <span><b>{product.name}</b><small>{product.category} · {money(product.price)}</small></span>
                  <span className="search-result__arrow">↗</span>
                </Link>
              )) : <div className="search-empty">No matches yet. Try a broader search.</div>}
              <button className="view-all-search" onClick={() => { setSearchOpen(false); router.push(`/products?q=${encodeURIComponent(query)}`); }}>
                View all products <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
