import { Product, ProductsApiResponse, Category, CategoriesApiResponse } from "@/types";
import { ProductList } from "@/components/ProductList";
import { Container } from "@/components/layout";
import { API_BASE_URL } from "@/lib/config";
import { PRODUCTS_LIMIT } from "@/lib/constants";
import { FadeIn } from "@/components/motion/FadeIn";

async function getProducts(categoryId: number | null): Promise<Product[]>
{
	let url = `${API_BASE_URL}/products?limit=${PRODUCTS_LIMIT}&offset=0`;
	if (categoryId !== null) url += `&category_id=${categoryId}`;
	const res = await fetch(url, { cache: "no-store" });
	if (!res.ok)
		throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
	const json: ProductsApiResponse = await res.json();
	return json.data;
}

async function getCategories(): Promise<Category[]>
{
	const res = await fetch(`${API_BASE_URL}/categories`, { cache: "no-store" });
	if (!res.ok)
		throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
	const json: CategoriesApiResponse = await res.json();
	return json.data;
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> })
{
	const params = await searchParams;
	const raw = params.category ? parseInt(params.category, 10) : null;
	const initialCategoryId = raw !== null && !isNaN(raw) ? raw : null;

	const [products, categories] = await Promise.all([
		getProducts(initialCategoryId),
		getCategories(),
	]);

	return (
		<main>
			<div className="border-b border-sand">
				<Container>
					<FadeIn className="py-16 md:py-20">
						<span className="text-[10px] tracking-[0.45em] uppercase text-stone-400">Collection</span>
						<h1 className="font-display text-5xl md:text-6xl italic font-light text-charcoal tracking-tight mt-3 mb-4">
							Shop All
						</h1>
						<p className="text-sm text-stone-500 tracking-wide leading-relaxed max-w-xs">
							Carefully selected pieces, made to last.
						</p>
					</FadeIn>
				</Container>
			</div>

			<Container>
				<div className="py-16 md:py-20">
					<ProductList
						initialProducts={products}
						categories={categories}
						initialCategoryId={initialCategoryId}
					/>
				</div>
			</Container>
		</main>
	);
}
