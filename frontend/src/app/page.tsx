import { Product, ProductsApiResponse } from "@/types";
import { ProductList } from "@/components/ProductList";

const LIMIT = 12;

async function getProducts(): Promise<Product[]>
{
	const res = await fetch(
		`http://localhost:3000/products?limit=${LIMIT}&offset=0`,
		{ cache: "no-store" }
	);
	if (!res.ok)
		throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
	const json: ProductsApiResponse = await res.json();
	return json.data;
}

export default async function HomePage()
{
	const products = await getProducts();

	return (
		<main className="max-w-5xl mx-auto px-8 py-16">
			<ProductList initialProducts={products} />
		</main>
	);
}
