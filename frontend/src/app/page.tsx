import { Product, ProductsApiResponse, Category, CategoriesApiResponse } from "@/types";
import { ProductList } from "@/components/ProductList";
import { API_BASE_URL } from "@/lib/config";

const LIMIT = 12;

async function getProducts(): Promise<Product[]>
{
	const res = await fetch(
		`${API_BASE_URL}/products?limit=${LIMIT}&offset=0`,
		{ cache: "no-store" }
	);
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

export default async function HomePage()
{
	const [products, categories] = await Promise.all([getProducts(), getCategories()]);

	return (
		<main className="max-w-5xl mx-auto px-8 py-16">
			<ProductList initialProducts={products} categories={categories} />
		</main>
	);
}
