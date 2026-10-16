'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { money, type Product } from '@/lib/products';
import { useCart } from './cart-context';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const add = () => {
    addItem(product, { color: product.colors[0]?.name, size: product.sizes?.[0] });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-card__visual">
        <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" priority={priority} />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`heart-button ${liked ? 'is-liked' : ''}`} onClick={() => setLiked(!liked)} aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button className={`quick-add ${added ? 'is-added' : ''}`} onClick={add}>
          {added ? 'Added!' : <><Plus size={17} /> Quick add</>}
        </button>
      </div>
      <div className="product-card__content">
        <div className="product-card__meta"><span>{product.category}</span><span><Star size={12} fill="currentColor" /> {product.rating} <i>({product.reviews.toLocaleString()})</i></span></div>
        <Link className="product-card__name" href={`/products/${product.id}`}>{product.name}</Link>
        <div className="product-card__price"><b>{money(product.price)}</b>{product.originalPrice && <s>{money(product.originalPrice)}</s>}<span>{product.sold} sold</span></div>
      </div>
    </article>
  );
}
