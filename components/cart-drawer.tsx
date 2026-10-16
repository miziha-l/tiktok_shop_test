'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { money } from '@/lib/products';
import { useCart } from './cart-context';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, count } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShipping = 40;
  const remaining = Math.max(0, freeShipping - subtotal);

  return (
    <>
      <button className={`drawer-backdrop ${isOpen ? 'is-open' : ''}`} onClick={closeCart} aria-label="Close shopping bag" />
      <aside className={`cart-drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <div><span className="eyebrow">Your edit</span><h2>Shopping bag <sup>{count}</sup></h2></div>
          <button className="icon-button" onClick={closeCart}><X size={22} /></button>
        </div>
        {items.length ? (
          <>
            <div className="shipping-progress">
              <p>{remaining ? <>You&apos;re <b>{money(remaining)}</b> away from free shipping</> : <><Check size={15} /> You unlocked free shipping</>}</p>
              <div><span style={{ width: `${Math.min(100, (subtotal / freeShipping) * 100)}%` }} /></div>
            </div>
            <div className="cart-items">
              {items.map((item, index) => (
                <article className="cart-item" key={`${item.product.id}-${item.color}-${item.size}-${index}`}>
                  <Link className="cart-item__image" href={`/products/${item.product.id}`} onClick={closeCart}>
                    <Image src={item.product.image} alt={item.product.name} fill sizes="110px" />
                  </Link>
                  <div className="cart-item__info">
                    <div><Link href={`/products/${item.product.id}`} onClick={closeCart}>{item.product.name}</Link><b>{money(item.product.price)}</b></div>
                    <p>{[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(' · ')}</p>
                    <div className="cart-item__actions">
                      <div className="quantity-control small">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity"><Plus /></button>
                      </div>
                      <button className="remove-item" onClick={() => removeItem(item.product.id)} aria-label="Remove item"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><b>{money(subtotal)}</b></div>
              <p>Taxes and shipping calculated at checkout.</p>
              <button className="primary-button checkout-button">Checkout securely <span>→</span></button>
              <div className="secure-note">Secure checkout · Easy 30-day returns</div>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <span><ShoppingBag size={32} /></span>
            <h3>Your bag is ready for a glow-up.</h3>
            <p>Discover the pieces everyone&apos;s talking about.</p>
            <Link className="primary-button" href="/products" onClick={closeCart}>Start shopping</Link>
          </div>
        )}
      </aside>
    </>
  );
}
