import { Product, ProductsApiResponse } from "@/types";
import { ProductCard } from "@/components/ProductCard";

async function getProducts(): Promise<Product[]>
{
	const res = await fetch("http://localhost:3000/products", { cache: "no-store" });
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
			{products.length === 0 ? (
				<p className="text-sm text-gray-400">No products listed yet.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</main>
	);
}
