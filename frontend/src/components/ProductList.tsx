"use client";

import { useState } from "react";
import { Product, ProductsApiResponse, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { Grid } from "@/components/layout";
import { API_BASE_URL } from "@/lib/config";
import { PRODUCTS_LIMIT } from "@/lib/constants";

const LIMIT = PRODUCTS_LIMIT;

interface Props {
	initialProducts: Product[];
	categories: Category[];
}

export function ProductList({ initialProducts, categories }: Props)
{
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [offset, setOffset] = useState(initialProducts.length);
	const [hasMore, setHasMore] = useState(initialProducts.length === LIMIT);
	const [loading, setLoading] = useState(false);
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

	async function fetchProducts(categoryId: number | null, currentOffset: number, append: boolean)
	{
		setLoading(true);
		try
		{
			let url = `${API_BASE_URL}/products?limit=${LIMIT}&offset=${currentOffset}`;
			if (categoryId !== null) url += `&category_id=${categoryId}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error("Failed to fetch");
			const json: ProductsApiResponse = await res.json();
			const next = json.data;
			setProducts(append ? (prev) => [...prev, ...next] : next);
			setOffset(currentOffset + next.length);
			setHasMore(next.length === LIMIT);
		}
		finally
		{
			setLoading(false);
		}
	}

	function selectCategory(categoryId: number | null)
	{
		setActiveCategoryId(categoryId);
		fetchProducts(categoryId, 0, false);
	}

	function loadMore()
	{
		fetchProducts(activeCategoryId, offset, true);
	}

	return (
		<>
			<div className="flex flex-wrap gap-2 mb-8">
				<button
					onClick={() => selectCategory(null)}
					disabled={loading}
					className={`px-3 py-1 text-xs tracking-wide border transition-colors disabled:cursor-not-allowed ${
						activeCategoryId === null
							? "bg-charcoal text-ivory border-charcoal"
							: "text-stone-500 border-stone-300 hover:border-charcoal hover:text-charcoal"
					}`}
				>
					All
				</button>
				{categories.map((cat) => (
					<button
						key={cat.id}
						onClick={() => selectCategory(cat.id)}
						disabled={loading}
						className={`px-3 py-1 text-xs tracking-wide border transition-colors disabled:cursor-not-allowed ${
							activeCategoryId === cat.id
								? "bg-charcoal text-ivory border-charcoal"
								: "text-stone-500 border-stone-300 hover:border-charcoal hover:text-charcoal"
						}`}
					>
						{cat.name}
					</button>
				))}
			</div>

			{products.length === 0 ? (
				<p className="text-sm text-stone-400">No products listed yet.</p>
			) : (
				<Grid>
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Grid>
			)}

			{hasMore && (
				<div className="mt-12 flex justify-center">
					<button
						onClick={loadMore}
						disabled={loading}
						className="px-6 py-2.5 text-xs tracking-wide text-stone-500 border border-stone-300 hover:border-charcoal hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
		</>
	);
}
