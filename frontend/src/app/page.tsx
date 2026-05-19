import Link from "next/link";
import { Container } from "@/components/layout";
import { Product, Category, ProductsApiResponse, CategoriesApiResponse } from "@/types";
import { API_BASE_URL } from "@/lib/config";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedProductGrid } from "@/components/motion/AnimatedProductGrid";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?featured=1&limit=4`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: ProductsApiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getNewArrivals(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=4`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: ProductsApiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    const json: CategoriesApiResponse = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [featuredProducts, newArrivals, categories] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getCategories(),
  ]);

  return (
    <main className="-mt-16">

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-stone-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_30%,rgba(100,80,55,0.18),transparent)]" />

        <div className="relative z-10 w-full pb-20 px-8 md:px-16 lg:px-24">
          <p
            className="hero-animate text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-6"
            style={{ animationDelay: "100ms" }}
          >
            Spring / Summer 2026
          </p>
          <h1
            className="hero-animate font-display text-5xl md:text-6xl lg:text-7xl italic font-light text-white leading-[1.08] tracking-tight mb-10 max-w-2xl"
            style={{ animationDelay: "260ms" }}
          >
            Thoughtfully<br />curated goods.
          </h1>
          <Link
            href="/shop"
            className="hero-animate inline-block px-8 py-3.5 text-[10px] tracking-[0.3em] uppercase bg-white text-stone-950 hover:bg-stone-100 transition-colors duration-300"
            style={{ animationDelay: "420ms" }}
          >
            Shop Collection
          </Link>
        </div>

        <div className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4">
          <div className="h-14 w-px bg-stone-700" />
          <span className="text-[9px] tracking-[0.4em] uppercase text-stone-600 [writing-mode:vertical-rl]">
            New Season
          </span>
          <div className="h-14 w-px bg-stone-700" />
        </div>
      </section>

      {/* ── Categories ── */}
      {categories.length > 0 && (
        <section className="border-b border-sand">
          <Container>
            <FadeIn className="py-16 md:py-20">
              <div className="flex items-center gap-8 mb-10">
                <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400 shrink-0">
                  01 — Shop by Category
                </span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.id}`}
                    className="group relative px-7 py-3 text-xs tracking-[0.15em] uppercase border border-sand overflow-hidden transition-colors duration-300 hover:border-charcoal"
                  >
                    <span className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative text-charcoal group-hover:text-ivory transition-colors duration-300">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </Container>
        </section>
      )}

      {/* ── Featured Products ── */}
      {featuredProducts.length > 0 && (
        <section className="border-b border-sand">
          <Container>
            <div className="py-24 md:py-28">
              <FadeIn className="flex items-end justify-between mb-14">
                <div>
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400">
                      02 — Featured
                    </span>
                    <div className="w-10 h-px bg-stone-300" />
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl italic font-light text-charcoal tracking-tight">
                    Featured Pieces
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-charcoal transition-colors duration-200 group"
                >
                  View all
                  <span className="block w-7 h-px bg-stone-300 group-hover:w-12 group-hover:bg-charcoal transition-all duration-300" />
                </Link>
              </FadeIn>
              <AnimatedProductGrid products={featuredProducts} />
            </div>
          </Container>
        </section>
      )}

      {/* ── New Arrivals ── */}
      <section className="border-b border-sand">
        <Container>
          <div className="py-24 md:py-28">
            <FadeIn className="flex items-end justify-between mb-14">
              <div>
                <div className="flex items-center gap-6 mb-4">
                  <span className="text-[10px] tracking-[0.35em] uppercase text-stone-400">
                    03 — New In
                  </span>
                  <div className="w-10 h-px bg-stone-300" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl italic font-light text-charcoal tracking-tight">
                  New Arrivals
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-charcoal transition-colors duration-200 group"
              >
                View all
                <span className="block w-7 h-px bg-stone-300 group-hover:w-12 group-hover:bg-charcoal transition-all duration-300" />
              </Link>
            </FadeIn>
            {newArrivals.length > 0 ? (
              <AnimatedProductGrid products={newArrivals} />
            ) : (
              <p className="text-sm text-stone-400 tracking-wide">Check back soon.</p>
            )}
          </div>
        </Container>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-32 md:py-36">
        <Container>
          <FadeIn className="max-w-md mx-auto text-center">
            <span className="text-[10px] tracking-[0.45em] uppercase text-stone-400 block mb-5">
              The Edit
            </span>
            <h2 className="font-display text-4xl md:text-5xl italic font-light text-charcoal tracking-tight leading-tight mb-5">
              Stay in the know.
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed tracking-wide mb-10">
              New arrivals, seasonal edits, and quiet recommendations —{" "}
              <br className="hidden md:block" />
              delivered infrequently.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 min-w-0 px-5 py-3.5 text-sm border border-sand border-r-0 bg-transparent text-charcoal placeholder:text-stone-400 focus:outline-none focus:border-charcoal transition-colors duration-200"
              />
              <button type="button" className="px-7 py-3.5 text-[10px] tracking-[0.25em] uppercase bg-charcoal text-ivory hover:bg-stone-800 transition-colors duration-200 whitespace-nowrap shrink-0">
                Subscribe
              </button>
            </div>
          </FadeIn>
        </Container>
      </section>

    </main>
  );
}
