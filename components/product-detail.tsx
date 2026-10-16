'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { BadgeCheck, ChevronDown, ChevronRight, Heart, Minus, Plus, RotateCcw, Share2, ShieldCheck, ShoppingBag, Star, Store, Truck } from 'lucide-react';
import { money, products, type Product } from '@/lib/products';
import { useCart } from './cart-context';
import { ProductCard } from './product-card';

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name || 'Default');
  const [size, setSize] = useState(product.sizes?.[1] || product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [openSection, setOpenSection] = useState('details');
  const [notice, setNotice] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const related = useMemo(() => products.filter((item) => item.id !== product.id).slice(0, 4), [product.id]);

  const add = () => {
    addItem(product, { color, size, quantity });
    setNotice(true);
    window.setTimeout(() => setNotice(false), 1800);
  };

  return (
    <div className="product-page">
      <div className={`added-toast ${notice ? 'is-visible' : ''}`}><BadgeCheck /> Added to your bag</div>
      <div className="shell product-breadcrumb"><Link href="/">Home</Link><ChevronRight /><Link href="/products">Shop</Link><ChevronRight /><Link href={`/products?category=${product.category}`}>{product.category}</Link><ChevronRight /><span>{product.name}</span></div>
      <section className="shell product-detail">
        <div className="product-gallery">
          <div className="product-gallery__thumbs">
            {product.images.map((image, index) => <button key={image} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)}><Image src={image} alt={`${product.name} view ${index + 1}`} fill sizes="80px" /></button>)}
          </div>
          <div className="product-gallery__main">
            <Image src={product.images[activeImage]} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 50vw" />
            {product.badge && <span className="detail-badge">{product.badge}</span>}
            <button className={`detail-heart ${liked ? 'active' : ''}`} onClick={() => setLiked(!liked)} aria-label="Save product"><Heart fill={liked ? 'currentColor' : 'none'} /></button>
            <span className="image-hint">Hover to zoom</span>
          </div>
          <div className="gallery-dots">{product.images.map((_, index) => <button aria-label={`View image ${index + 1}`} key={index} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)} />)}</div>
        </div>

        <div className="product-info">
          <div className="product-info__top"><span className="eyebrow">{product.category} · {product.sold} sold</span><button aria-label="Share"><Share2 size={19} /></button></div>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span className="rating-stars"><Star fill="currentColor" /> {product.rating}</span><a href="#reviews">{product.reviews.toLocaleString()} verified reviews</a><span>•</span><span>98% recommend</span></div>
          <div className="detail-price"><strong>{money(product.price)}</strong>{product.originalPrice && <><s>{money(product.originalPrice)}</s><span>Save {discount}%</span></>}</div>
          <p className="pay-note">or 4 interest-free payments of <b>{money(product.price / 4)}</b> with <span>afterpay</span></p>

          <div className="variant-section">
            <div className="variant-label"><b>Color</b><span>{color}</span></div>
            <div className="color-options">{product.colors.map((option) => <button key={option.name} className={color === option.name ? 'active' : ''} onClick={() => setColor(option.name)} title={option.name}><i style={{ background: option.value }} /></button>)}</div>
          </div>
          {product.sizes && <div className="variant-section">
            <div className="variant-label"><b>Select size</b><button>Size guide</button></div>
            <div className="size-options">{product.sizes.map((option) => <button key={option} className={size === option ? 'active' : ''} onClick={() => setSize(option)}>{option}</button>)}</div>
          </div>}

          <div className="purchase-row">
            <div className="quantity-control"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus /></button></div>
            <button className="primary-button add-to-bag" onClick={add}><ShoppingBag size={19} /> Add to bag · {money(product.price * quantity)}</button>
          </div>
          <button className="buy-now">Buy it now</button>

          <div className="fulfilment-card">
            <div><Truck /><span><b>{product.delivery}</b><small>Order today · Tracked delivery</small></span></div>
            <div><RotateCcw /><span><b>Easy 30-day returns</b><small>Changed your mind? No problem.</small></span></div>
            <div><ShieldCheck /><span><b>Shop confidently</b><small>Secure payment and purchase protection</small></span></div>
          </div>

          <div className="seller-card"><span className="seller-avatar">{product.seller.slice(0, 1)}</span><div><small>Sold by</small><b>{product.seller} <BadgeCheck size={15} /></b><span><Star fill="currentColor" /> {product.sellerRating} seller rating</span></div><button>Visit shop <ChevronRight /></button></div>

          <div className="product-accordions">
            <div className={openSection === 'details' ? 'open' : ''}><button onClick={() => setOpenSection(openSection === 'details' ? '' : 'details')}><b>Product details</b><Plus /></button><div><p>{product.description}</p><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></div>
            <div className={openSection === 'shipping' ? 'open' : ''}><button onClick={() => setOpenSection(openSection === 'shipping' ? '' : 'shipping')}><b>Shipping & returns</b><Plus /></button><div><p>Orders are processed within one business day. Enjoy free tracked shipping over $40 and easy returns within 30 days of delivery.</p></div></div>
            <div className={openSection === 'care' ? 'open' : ''}><button onClick={() => setOpenSection(openSection === 'care' ? '' : 'care')}><b>Care guide</b><Plus /></button><div><p>Follow the care instructions on the product label. Store in a cool, dry place away from direct sunlight.</p></div></div>
          </div>
        </div>
      </section>

      <section className="shell reviews-section" id="reviews">
        <div className="section-heading"><div><span className="eyebrow">The real talk</span><h2>Reviews that say it all.</h2></div><button className="secondary-button">Write a review</button></div>
        <div className="review-summary-grid">
          <div className="review-big-score"><strong>{product.rating}</strong><div>★★★★★</div><p>Based on {product.reviews.toLocaleString()} reviews</p><span><BadgeCheck /> 100% verified purchases</span></div>
          <div className="rating-bars">{[5, 4, 3, 2, 1].map((value, index) => <div key={value}><span>{value}</span><Star fill="currentColor" /><i><b style={{ width: `${[82, 13, 3, 1, 1][index]}%` }} /></i><small>{[82, 13, 3, 1, 1][index]}%</small></div>)}</div>
          <blockquote><div>★★★★★</div><h3>“Instant favorite.”</h3><p>The quality is so much better than I expected. It arrived fast and looks exactly like the videos.</p><span>Jamie R. · Verified buyer</span></blockquote>
        </div>
      </section>

      <section className="section shell related-section">
        <div className="section-heading"><div><span className="eyebrow">Keep scrolling</span><h2>You might also like.</h2></div><Link className="arrow-link" href="/products">View all <ChevronRight /></Link></div>
        <div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.id} />)}</div>
      </section>

      <div className="mobile-buy-bar"><div><small>{product.name}</small><b>{money(product.price)}</b></div><button className="primary-button" onClick={add}>Add to bag</button></div>
    </div>
  );
}
