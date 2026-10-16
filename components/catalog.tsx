'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChevronDown, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { categories, products } from '@/lib/products';
import { ProductCard } from './product-card';

type SortKey = 'featured' | 'popular' | 'price-low' | 'price-high' | 'discount';

export function Catalog() {
  const params = useSearchParams();
  const paramCategory = params.get('category');
  const paramSort = (params.get('sort') || 'featured') as SortKey;
  const query = params.get('q') || '';
  const [selectedCategories, setSelectedCategories] = useState<string[]>(paramCategory ? [paramCategory] : []);
  const [maxPrice, setMaxPrice] = useState(150);
  const [minRating, setMinRating] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [sort, setSort] = useState<SortKey>(paramSort);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategories(paramCategory ? [paramCategory] : []);
  }, [paramCategory]);

  useEffect(() => {
    setSort(paramSort);
  }, [paramSort]);

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery = !term || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
      return matchesQuery
        && (!selectedCategories.length || selectedCategories.includes(product.category))
        && product.price <= maxPrice
        && product.rating >= minRating
        && (!onSale || Boolean(product.originalPrice));
    });
    return result.sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'popular') return Number(b.sold.replace(/[^0-9.]/g, '')) - Number(a.sold.replace(/[^0-9.]/g, ''));
      if (sort === 'discount') return ((b.originalPrice || b.price) - b.price) - ((a.originalPrice || a.price) - a.price);
      return products.indexOf(a) - products.indexOf(b);
    });
  }, [maxPrice, minRating, onSale, query, selectedCategories, sort]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  };

  const clear = () => {
    setSelectedCategories([]);
    setMaxPrice(150);
    setMinRating(0);
    setOnSale(false);
  };
  const activeCount = selectedCategories.length + (maxPrice < 150 ? 1 : 0) + (minRating ? 1 : 0) + (onSale ? 1 : 0);

  const filterContent = (
    <>
      <div className="filter-group">
        <h3>Category <ChevronDown /></h3>
        <div className="check-list">
          {categories.slice(1).map((category) => {
            const count = products.filter((p) => p.category === category).length;
            return <label key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} /><i /> <span>{category}</span><small>{count}</small></label>;
          })}
        </div>
      </div>
      <div className="filter-group">
        <h3>Price <ChevronDown /></h3>
        <div className="price-output"><span>$0</span><span>${maxPrice}+</span></div>
        <input className="range" type="range" min="20" max="150" step="5" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} aria-label="Maximum price" />
      </div>
      <div className="filter-group">
        <h3>Rating <ChevronDown /></h3>
        <div className="rating-options">
          {[4.8, 4.7, 4.5].map((rating) => <button className={minRating === rating ? 'active' : ''} key={rating} onClick={() => setMinRating(minRating === rating ? 0 : rating)}><span>★★★★★</span> {rating} & up</button>)}
        </div>
      </div>
      <div className="filter-group filter-switch-row">
        <span><b>On sale</b><small>Show discounted finds</small></span>
        <button className={`switch ${onSale ? 'active' : ''}`} onClick={() => setOnSale(!onSale)} aria-label="Toggle sale products"><i /></button>
      </div>
    </>
  );

  return (
    <div className="catalog-page">
      <section className="catalog-hero shell">
        <div><span className="eyebrow"><Sparkles size={13} /> Curated for you</span><h1>{query ? <>Results for<br /><em>“{query}”</em></> : <>Find your<br /><em>next thing.</em></>}</h1></div>
        <p>Fresh finds, creator favorites, and the things<br className="hide-mobile" /> everyone&apos;s about to ask you about.</p>
      </section>
      <div className="catalog-toolbar shell">
        <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /> Filters {activeCount > 0 && <b>{activeCount}</b>}</button>
        <p><b>{filtered.length}</b> finds{query && ` for “${query}”`}</p>
        <label className="sort-select"><span>Sort by:</span><select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}><option value="featured">Featured</option><option value="popular">Most popular</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="discount">Biggest discount</option></select><ChevronDown /></label>
      </div>
      <div className="catalog-layout shell">
        <aside className="filter-sidebar">
          <div className="filter-title"><b>Filters</b>{activeCount > 0 && <button onClick={clear}>Clear all</button>}</div>
          {filterContent}
        </aside>
        <section className="catalog-results">
          {activeCount > 0 && <div className="active-filters">
            {selectedCategories.map((category) => <button key={category} onClick={() => toggleCategory(category)}>{category}<X /></button>)}
            {maxPrice < 150 && <button onClick={() => setMaxPrice(150)}>Under ${maxPrice}<X /></button>}
            {minRating > 0 && <button onClick={() => setMinRating(0)}>{minRating}+ stars<X /></button>}
            {onSale && <button onClick={() => setOnSale(false)}>On sale<X /></button>}
          </div>}
          {filtered.length ? <div className="product-grid catalog-grid">{filtered.map((product, index) => <ProductCard product={product} key={product.id} priority={index < 3} />)}</div> : <div className="no-results"><span>¯\_(ツ)_/¯</span><h2>No finds in this mix.</h2><p>Try clearing a filter or widening your price range.</p><button className="primary-button" onClick={clear}>Reset filters</button></div>}
        </section>
      </div>

      <button className={`filter-drawer-backdrop ${filtersOpen ? 'is-open' : ''}`} onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
      <aside className={`filter-drawer ${filtersOpen ? 'is-open' : ''}`}>
        <div className="filter-drawer__header"><div><span className="eyebrow">Refine your edit</span><h2>Filters</h2></div><button className="icon-button" onClick={() => setFiltersOpen(false)}><X /></button></div>
        <div className="filter-drawer__body">{filterContent}</div>
        <div className="filter-drawer__footer"><button className="secondary-button" onClick={clear}>Clear all</button><button className="primary-button" onClick={() => setFiltersOpen(false)}>Show {filtered.length} finds</button></div>
      </aside>
    </div>
  );
}
