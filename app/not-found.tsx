import Link from 'next/link';

export default function NotFound() {
  return <div className="not-found shell"><span>404</span><h1>That find got away.</h1><p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p><Link className="primary-button" href="/products">Explore the shop</Link></div>;
}
