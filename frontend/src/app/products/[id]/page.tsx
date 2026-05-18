import { notFound } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types";
import { Container } from "@/components/layout";
import { API_BASE_URL } from "@/lib/config";

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

	return (
		<main>
			<Container>
				<div className="py-12">
					<Link
						href="/shop"
						className="text-xs tracking-[0.15em] uppercase text-stone-400 hover:text-charcoal transition-colors duration-200"
					>
						← Back to shop
					</Link>

					<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12">
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

						<div className="flex flex-col justify-center">
							<h1 className="text-xl font-medium text-charcoal tracking-wide leading-snug">
								{product.name}
							</h1>
							<p className="text-base text-stone-400 mt-3">
								{formatCents(product.price_cents)}
							</p>
							{product.description && (
								<p className="text-sm text-stone-500 mt-6 leading-relaxed">
									{product.description}
								</p>
							)}
							<p className="text-xs text-stone-400 mt-6">
								{product.stock_quantity > 0
									? `${product.stock_quantity} in stock`
									: "Out of stock"}
							</p>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}
