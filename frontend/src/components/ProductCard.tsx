import Link from "next/link";
import { Product } from "@/types";

function formatCents(cents: number): string
{
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

interface Props
{
	product: Product;
}

export function ProductCard({ product }: Props)
{
	return (
		<Link href={`/products/${product.id}`} className="group bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] transition-shadow duration-300">
			<div className="overflow-hidden aspect-[3/4] bg-stone-50">
				{product.image_url ? (
					<img
						src={product.image_url}
						alt={product.name}
						className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
					/>
				) : (
					<div className="w-full h-full bg-stone-100" />
				)}
			</div>
			<div className="px-5 py-4">
				<h2 className="text-sm font-medium text-charcoal tracking-wide leading-snug">
					{product.name}
				</h2>
				<p className="text-sm text-stone-400 mt-1.5">
					{formatCents(product.price_cents)}
				</p>
			</div>
		</Link>
	);
}
