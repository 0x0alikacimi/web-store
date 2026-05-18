import { Product, ProductsApiResponse, Category, CategoriesApiResponse } from "@/types";
import { ProductList } from "@/components/ProductList";
import { Container, Section } from "@/components/layout";
import { API_BASE_URL } from "@/lib/config";
import { PRODUCTS_LIMIT } from "@/lib/constants";

async function getProducts(): Promise<Product[]>
{
	const res = await fetch(
		`${API_BASE_URL}/products?limit=${PRODUCTS_LIMIT}&offset=0`,
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

export default async function ShopPage()
{
	const [products, categories] = await Promise.all([getProducts(), getCategories()]);

	return (
		<main>
			<Container>
				<Section>
					<h1 className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium mb-10">
						Collection
					</h1>
					<ProductList initialProducts={products} categories={categories} />
				</Section>
			</Container>
		</main>
	);
}
