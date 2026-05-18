import Link from 'next/link';
import { Container } from './layout';

const NAV_LINKS = ['Shop', 'Categories', 'About', 'Contact'];
const LEGAL_LINKS = ['Privacy', 'Terms'];

export function Footer() {
  return (
    <footer className="border-t border-[#e8e0d5] mt-24">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <span className="text-xs tracking-[0.25em] uppercase font-medium text-charcoal">
              Web Store
            </span>
            <p className="mt-5 text-xs text-stone-400 leading-relaxed max-w-[200px]">
              A curated selection of thoughtfully made objects.
            </p>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-300 mb-6">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3.5">
              {NAV_LINKS.map((label) => (
                <Link
                  key={label}
                  href="/"
                  className="text-xs tracking-[0.1em] text-stone-400 hover:text-charcoal transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-300 mb-6">
              Newsletter
            </h3>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              Occasional updates on new arrivals and curated finds.
            </p>
            <div className="flex border border-[#e8e0d5]">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-xs text-charcoal placeholder:text-stone-300 bg-transparent outline-none"
              />
              <button className="px-4 py-3 text-xs tracking-[0.1em] uppercase text-charcoal border-l border-[#e8e0d5] hover:bg-[#e8e0d5] transition-colors duration-200 whitespace-nowrap">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e8e0d5] py-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-stone-300 tracking-wide">
            © {new Date().getFullYear()} Web Store. All rights reserved.
          </p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((label) => (
              <Link
                key={label}
                href="/"
                className="text-xs text-stone-300 hover:text-stone-500 transition-colors duration-200 tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
