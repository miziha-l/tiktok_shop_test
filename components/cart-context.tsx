'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from '@/lib/products';

type CartItem = { product: Product; quantity: number; color?: string; size?: string };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, options?: { color?: string; size?: string; quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CartContextValue>(() => ({
    items,
    isOpen,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (product, options = {}) => {
      const quantity = options.quantity ?? 1;
      setItems((current) => {
        const found = current.find((item) =>
          item.product.id === product.id && item.color === options.color && item.size === options.size,
        );
        if (found) {
          return current.map((item) =>
            item === found ? { ...item, quantity: item.quantity + quantity } : item,
          );
        }
        return [...current, { product, quantity, color: options.color, size: options.size }];
      });
      setIsOpen(true);
    },
    removeItem: (id) => setItems((current) => current.filter((item) => item.product.id !== id)),
    updateQuantity: (id, quantity) =>
      setItems((current) =>
        current.map((item) => item.product.id === id ? { ...item, quantity: Math.max(1, quantity) } : item),
      ),
  }), [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
