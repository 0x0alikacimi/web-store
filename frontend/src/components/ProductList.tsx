"use client";

import { useState } from "react";
import { Product, ProductsApiResponse } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { API_BASE_URL } from "@/lib/config";

const LIMIT = 12;

interface Props {
	initialProducts: Product[];
}

export function ProductList({ initialProducts }: Props)
{
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [offset, setOffset] = useState(initialProducts.length);
	const [hasMore, setHasMore] = useState(initialProducts.length === LIMIT);
	const [loading, setLoading] = useState(false);

	async function loadMore()
	{
		setLoading(true);
		try
		{
			const res = await fetch(
				`${API_BASE_URL}/products?limit=${LIMIT}&offset=${offset}`
			);
			if (!res.ok) throw new Error("Failed to fetch");
			const json: ProductsApiResponse = await res.json();
			const next = json.data;
			setProducts((prev) => [...prev, ...next]);
			setOffset((prev) => prev + next.length);
			setHasMore(next.length === LIMIT);
		}
		finally
		{
			setLoading(false);
		}
	}

	if (products.length === 0)
		return <p className="text-sm text-gray-400">No products listed yet.</p>;

	return (
		<>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			{hasMore && (
				<div className="mt-12 flex justify-center">
					<button
						onClick={loadMore}
						disabled={loading}
						className="px-6 py-2.5 text-sm text-gray-600 border border-gray-300 hover:border-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
		</>
	);
}
