import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, BadgeCheck, Play, Sparkles, Star, Truck } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { SaleTimer } from '@/components/sale-timer';
import { products } from '@/lib/products';

const categoryTiles = [
  { name: 'Fashion', caption: 'Wear it your way', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85', className: 'tile-fashion' },
  { name: 'Beauty', caption: 'Glow, bottled', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85', className: 'tile-beauty' },
  { name: 'Tech', caption: 'Made to connect', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85', className: 'tile-tech' },
  { name: 'Home', caption: 'Good space, good mood', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85', className: 'tile-home' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90" alt="Curated fashion collection" fill priority sizes="100vw" />
          <div className="hero__wash" />
        </div>
        <div className="shell hero__content">
          <div className="hero__copy">
            <div className="hero-kicker"><Sparkles size={14} /> The internet&apos;s best finds</div>
            <h1>Find what&apos;s<br /><em>next.</em></h1>
            <p>Fresh drops. Real reviews. Things you&apos;ll want<br className="hide-mobile" /> before everyone else has them.</p>
            <div className="hero__actions">
              <Link className="primary-button" href="/products">Shop the drop <ArrowRight size={18} /></Link>
              <a className="text-button" href="#trending"><span><Play size={13} fill="currentColor" /></span> See what&apos;s trending</a>
            </div>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack"><span>A</span><span>M</span><span>K</span><span>J</span></div>
            <div><div className="stars">★★★★★</div><p>Loved by 2M+ shoppers</p></div>
          </div>
          <a className="scroll-cue" href="#trending"><span>Scroll to explore</span><ArrowDown size={17} /></a>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell">
          <div><BadgeCheck /><span><b>Verified reviews</b><small>From real purchases</small></span></div>
          <div><Truck /><span><b>Free shipping $40+</b><small>Fast, tracked delivery</small></span></div>
          <div><Sparkles /><span><b>Fresh every week</b><small>The latest, curated</small></span></div>
        </div>
      </section>

      <section className="section shell" id="trending">
        <div className="section-heading">
          <div><span className="eyebrow">Trending now</span><h2>The feed can&apos;t<br />stop talking about.</h2></div>
          <Link className="arrow-link" href="/products?sort=popular">Shop all trending <ArrowRight /></Link>
        </div>
        <div className="product-grid home-products">
          {products.slice(0, 4).map((product, index) => <ProductCard product={product} key={product.id} priority={index < 2} />)}
        </div>
      </section>

      <section className="category-section">
        <div className="shell">
          <div className="center-heading"><span className="eyebrow">Shop your mood</span><h2>There&apos;s a find for that.</h2><p>Your feed, but you can add it to cart.</p></div>
          <div className="category-grid">
            {categoryTiles.map((tile) => (
              <Link className={`category-tile ${tile.className}`} href={`/products?category=${tile.name}`} key={tile.name}>
                <Image src={tile.image} alt={tile.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                <div className="category-tile__overlay" />
                <div><span>{tile.caption}</span><h3>{tile.name}</h3><i>Explore <ArrowRight /></i></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="campaign shell">
        <div className="campaign__content">
          <span className="campaign__tag">48-hour event</span>
          <span className="eyebrow">The main character sale</span>
          <h2>Up to <em>40% off</em><br />your saved list.</h2>
          <p>Go on, you&apos;ve been thinking about it long enough.</p>
          <SaleTimer />
          <Link className="light-button" href="/products?sort=discount">Shop the sale <ArrowRight /></Link>
        </div>
        <div className="campaign__image"><Image src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1100&q=88" alt="Fashion sale edit" fill sizes="50vw" /></div>
        <div className="campaign__sticker"><b>40</b><span>%<br />OFF</span></div>
      </section>

      <section className="section shell creator-section">
        <div className="section-heading">
          <div><span className="eyebrow">Creator-approved</span><h2>Spotted on your FYP.</h2></div>
          <Link className="arrow-link" href="/products">Explore all <ArrowRight /></Link>
        </div>
        <div className="creator-layout">
          <div className="creator-story">
            <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=88" alt="Creator holding a beauty product" fill sizes="(max-width: 800px) 100vw, 40vw" />
            <button aria-label="Play creator story"><Play fill="currentColor" /></button>
            <div className="creator-story__caption"><span>@amelia.edit</span><p>“Okay, this glow is actually unreal.”</p></div>
          </div>
          <div className="creator-products">
            {products.slice(4, 8).map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
        </div>
      </section>

      <section className="review-banner">
        <div className="shell">
          <div className="review-score"><strong>4.8</strong><div><div>★★★★★</div><p>Based on 48,000+ verified reviews</p></div></div>
          <blockquote>“Finally, a shop that feels like my feed —<br />but somehow even better curated.”</blockquote>
          <span className="review-author">— Maya L. <BadgeCheck size={15} /> Verified buyer</span>
        </div>
      </section>

      <section className="app-banner shell">
        <div className="app-banner__graphic"><span className="phone-card phone-card--one" /><span className="phone-card phone-card--two" /><div className="phone"><div className="phone__notch" /><div className="phone__image" /></div></div>
        <div className="app-banner__copy"><span className="eyebrow">Shop anywhere</span><h2>Your next obsession<br />is one tap away.</h2><p>Scan to open TikTok Shop and discover more<br className="hide-mobile" /> creator-loved finds.</p><div className="qr-row"><div className="fake-qr">▦</div><span>Scan with<br />your camera</span></div></div>
      </section>
    </>
  );
}
