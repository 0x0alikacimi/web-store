"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Product, ProductsApiResponse, Category } from "@/types";
import { ProductCard } from "@/components/ProductCard";
import { API_BASE_URL } from "@/lib/config";
import { PRODUCTS_LIMIT } from "@/lib/constants";

const gridVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const LIMIT = PRODUCTS_LIMIT;

type LoadState = "idle" | "filtering" | "paginating";

interface Props {
	initialProducts: Product[];
	categories: Category[];
	initialCategoryId?: number | null;
}

function SkeletonCard()
{
	return (
		<div className="animate-pulse">
			<div className="aspect-[3/4] bg-stone-100" />
			<div className="px-5 pt-4 pb-5 space-y-2.5">
				<div className="h-2.5 bg-stone-200 rounded-sm w-3/4" />
				<div className="h-2 bg-stone-200 rounded-sm w-1/4" />
			</div>
		</div>
	);
}

export function ProductList({ initialProducts, categories, initialCategoryId = null }: Props)
{
	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [offset, setOffset] = useState(initialProducts.length);
	const [hasMore, setHasMore] = useState(initialProducts.length === LIMIT);
	const [loadState, setLoadState] = useState<LoadState>("idle");
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(initialCategoryId);
	const [filterError, setFilterError] = useState<string | null>(null);
	const [paginateError, setPaginateError] = useState<string | null>(null);
	const abortRef = useRef<AbortController | null>(null);

	async function fetchProducts(categoryId: number | null, currentOffset: number, append: boolean)
	{
		abortRef.current?.abort();
		const controller = new AbortController();
		abortRef.current = controller;

		setLoadState(append ? "paginating" : "filtering");
		setFilterError(null);
		setPaginateError(null);
		try
		{
			let url = `${API_BASE_URL}/products?limit=${LIMIT}&offset=${currentOffset}`;
			if (categoryId !== null) url += `&category_id=${categoryId}`;
			const res = await fetch(url, { signal: controller.signal });
			if (!res.ok) throw new Error("Failed to fetch products");
			const json: ProductsApiResponse = await res.json();
			const next = json.data;
			setProducts(append ? (prev) => [...prev, ...next] : next);
			setOffset(currentOffset + next.length);
			setHasMore(next.length === LIMIT);
		}
		catch (err)
		{
			if ((err as Error).name === "AbortError") return;
			if (append) setPaginateError("Failed to load more. Please try again.");
			else setFilterError("Failed to load products. Please try again.");
		}
		finally
		{
			if (abortRef.current === controller) setLoadState("idle");
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

	const isFiltering = loadState === "filtering";
	const isPaginating = loadState === "paginating";
	const isLoading = loadState !== "idle";

	return (
		<>
			<div className="mb-14">
				<div className="flex items-center gap-6 mb-6">
					<span className="text-[10px] tracking-[0.35em] uppercase text-stone-400 shrink-0">Filter</span>
					<div className="flex-1 h-px bg-sand" />
				</div>
				<div className="flex flex-wrap gap-2">
					<button
						onClick={() => selectCategory(null)}
						disabled={isLoading}
						className={`px-4 py-1.5 text-[11px] tracking-[0.1em] border transition-colors duration-200 disabled:cursor-not-allowed ${
							activeCategoryId === null
								? "bg-charcoal text-ivory border-charcoal"
								: "text-stone-400 border-sand hover:border-charcoal hover:text-charcoal"
						}`}
					>
						All
					</button>
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => selectCategory(cat.id)}
							disabled={isLoading}
							className={`px-4 py-1.5 text-[11px] tracking-[0.1em] border transition-colors duration-200 disabled:cursor-not-allowed ${
								activeCategoryId === cat.id
									? "bg-charcoal text-ivory border-charcoal"
									: "text-stone-400 border-sand hover:border-charcoal hover:text-charcoal"
							}`}
						>
							{cat.name}
						</button>
					))}
				</div>
			</div>

			{isFiltering ? (
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
					{Array.from({ length: 8 }).map((_, i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			) : filterError ? (
				<div className="py-28 text-center">
					<div className="w-8 h-px bg-stone-300 mx-auto mb-6" />
					<p className="text-sm text-stone-400 tracking-wide">{filterError}</p>
					<button
						onClick={() => fetchProducts(activeCategoryId, 0, false)}
						className="mt-5 text-[10px] tracking-[0.2em] uppercase text-charcoal underline underline-offset-4"
					>
						Retry
					</button>
				</div>
			) : products.length === 0 ? (
				<div className="py-28 text-center">
					<div className="w-8 h-px bg-stone-300 mx-auto mb-6" />
					<p className="text-sm text-stone-400 tracking-wide">
						{activeCategoryId !== null ? "No pieces in this collection." : "Nothing here yet."}
					</p>
				</div>
			) : (
				<motion.div
					className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10"
					variants={gridVariants}
					initial="hidden"
					animate="visible"
				>
					{products.map((product) => (
						<motion.div key={product.id} variants={cardVariants}>
							<ProductCard product={product} />
						</motion.div>
					))}
				</motion.div>
			)}

			{hasMore && !isFiltering && !filterError && (
				<div className="mt-16 flex flex-col items-center gap-3">
					<button
						onClick={loadMore}
						disabled={isPaginating}
						className="flex items-center gap-2.5 px-8 py-3 text-[10px] tracking-[0.25em] uppercase text-stone-400 border border-sand hover:border-charcoal hover:text-charcoal disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
					>
						{isPaginating && (
							<span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
						)}
						{isPaginating ? "Loading" : "Load more"}
					</button>
					{paginateError && (
						<p className="text-[11px] text-stone-400 tracking-wide">{paginateError}</p>
					)}
				</div>
			)}
		</>
	);
}
