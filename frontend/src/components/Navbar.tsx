'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Container } from './layout';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory/[0.92] backdrop-blur-md border-b border-sand'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className={`text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-500 ${scrolled ? 'text-charcoal' : 'text-white'}`}
          >
            Web Store
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${scrolled ? 'text-stone-400 hover:text-charcoal' : 'text-stone-300 hover:text-white'}`}
            >
              Shop
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className={`p-1 transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-stone-400' : 'text-white hover:text-stone-300'}`}
              aria-label="Search"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <button
              type="button"
              className={`p-1 transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-stone-400' : 'text-white hover:text-stone-300'}`}
              aria-label="Cart"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>

            <button
              type="button"
              className={`md:hidden p-1 transition-colors duration-500 ${scrolled ? 'text-charcoal hover:text-stone-400' : 'text-white hover:text-stone-300'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="md:hidden border-t border-sand bg-ivory/[0.96] backdrop-blur-md">
          <Container>
            <nav className="flex flex-col py-7 gap-6">
              <Link
                href="/shop"
                className="text-xs tracking-[0.2em] uppercase text-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
