import Link from 'next/link';
import { Facebook, Instagram, Music2, Twitter } from 'lucide-react';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Logo light />
          <p>Curated things worth talking about.<br />Fresh finds, real reviews, zero boring.</p>
          <div className="socials"><a href="#" aria-label="TikTok"><Music2 /></a><a href="#" aria-label="Instagram"><Instagram /></a><a href="#" aria-label="Twitter"><Twitter /></a><a href="#" aria-label="Facebook"><Facebook /></a></div>
        </div>
        <div className="footer-links"><h4>Shop</h4><Link href="/products">New & trending</Link><Link href="/products?category=Fashion">Fashion</Link><Link href="/products?category=Beauty">Beauty</Link><Link href="/products?category=Tech">Tech</Link></div>
        <div className="footer-links"><h4>Help</h4><a href="#">Track order</a><a href="#">Shipping & returns</a><a href="#">Contact us</a><a href="#">FAQs</a></div>
        <div className="footer-newsletter"><h4>Fresh finds, straight to you.</h4><p>Join for weekly drops and private offers.</p><form><input type="email" placeholder="Email address" aria-label="Email address" /><button type="submit" aria-label="Subscribe">→</button></form><small>By subscribing, you agree to our terms and privacy policy.</small></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 TikTok Shop Concept</span><div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Cookies</a></div><span>USD · English</span></div>
    </footer>
  );
}
