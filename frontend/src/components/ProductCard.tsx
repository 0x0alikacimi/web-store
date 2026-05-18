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
		<Link
			href={`/products/${product.id}`}
			className="group block bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(0,0,0,0.10)]"
		>
			<div className="overflow-hidden aspect-[3/4] bg-stone-100">
				{product.image_url ? (
					<img
						src={product.image_url}
						alt={product.name}
						className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
					/>
				) : (
					<div className="w-full h-full bg-stone-100" />
				)}
			</div>
			<div className="px-5 pt-4 pb-5">
				<h2 className="text-[13px] font-medium text-charcoal tracking-[0.02em] leading-snug">
					{product.name}
				</h2>
				<p className="mt-2 text-[11px] tracking-[0.07em] text-stone-400">
					{formatCents(product.price_cents)}
				</p>
			</div>
		</Link>
	);
}
