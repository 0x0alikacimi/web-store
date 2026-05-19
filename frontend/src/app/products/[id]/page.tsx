import { notFound } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types";
import { API_BASE_URL } from "@/lib/config";
import { Container } from "@/components/layout";
import { FadeIn } from "@/components/motion/FadeIn";

async function getProduct(id: string): Promise<Product | null>
{
	const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: "no-store" });
	if (res.status === 404) return null;
	if (!res.ok) throw new Error(`Failed to fetch product: ${res.status}`);
	const json = await res.json();
	return json.data as Product;
}

function formatCents(cents: number): string
{
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> })
{
	const { id } = await params;
	const product = await getProduct(id);
	if (!product) notFound();

	const inStock = product.stock_quantity > 0;

	return (
		<main>
			<Container>
				<div className="py-12 md:py-16">

					<Link
						href="/shop"
						className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-stone-400 hover:text-charcoal transition-colors duration-200 group"
					>
						<span className="block w-5 h-px bg-stone-300 group-hover:w-8 group-hover:bg-charcoal transition-all duration-300" />
						Back to shop
					</Link>

					<FadeIn className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

						{/* Image */}
						<div className="aspect-[3/4] bg-stone-50 overflow-hidden">
							{product.image_url ? (
								<img
									src={product.image_url}
									alt={product.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-stone-100" />
							)}
						</div>

						{/* Info */}
						<div className="md:pt-6 flex flex-col">

							<div className="pb-7 border-b border-sand">
								<p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">
									Product
								</p>
								<h1 className="font-display text-3xl md:text-4xl italic font-light text-charcoal tracking-tight leading-snug">
									{product.name}
								</h1>
								<p className="mt-5 text-2xl font-light text-charcoal tracking-wide">
									{formatCents(product.price_cents)}
								</p>
							</div>

							{product.description && (
								<div className="pt-7 pb-7 border-b border-sand">
									<p className="text-sm text-stone-500 leading-[1.85] tracking-wide">
										{product.description}
									</p>
								</div>
							)}

							<div className="pt-7 pb-8">
								<div className="flex items-center gap-2.5">
									<span
										className={`block w-1.5 h-1.5 rounded-full ${inStock ? "bg-emerald-400" : "bg-stone-300"}`}
									/>
									<span className="text-xs tracking-[0.12em] text-stone-400">
										{inStock
											? `${product.stock_quantity} in stock`
											: "Out of stock"}
									</span>
								</div>
							</div>

							<button
								type="button"
								disabled={!inStock}
								className="w-full py-4 text-[10px] tracking-[0.3em] uppercase bg-charcoal text-ivory hover:bg-stone-800 transition-colors duration-200 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
							>
								{inStock ? "Add to Cart" : "Out of Stock"}
							</button>

						</div>
					</FadeIn>
				</div>
			</Container>
		</main>
	);
}
