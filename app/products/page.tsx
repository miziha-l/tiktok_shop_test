import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Catalog } from '@/components/catalog';

export const metadata: Metadata = {
  title: 'Shop all',
  description: 'Explore creator-loved fashion, beauty, tech, and home finds.',
};

export default function ProductsPage() {
  return <Suspense fallback={<div className="catalog-loading shell">Loading the good stuff…</div>}><Catalog /></Suspense>;
}
