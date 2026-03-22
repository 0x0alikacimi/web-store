import { Product, ProductsApiResponse } from "@/types";


async function getProducts(): Promise<Product[]>
{
	const res = await fetch("http://localhost:3000/products", {cache: "no-store",} );
	if (!res.ok)
		throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
	const json: ProductsApiResponse = await res.json();
	return json.data;
}

function formatCents(cents: number): string
{
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(cents / 100);
}


export default async function HomePage()
{
	const products = await getProducts();

	return (
		<main className="container mx-auto p-8">
		<h1 className="text-3xl font-bold mb-6">Product Feed</h1>

		{products.length === 0 ? (
			<p className="text-gray-500">No products listed yet.</p>
		) : (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.map((product) => (
				<div
				key={product.id}
				className="border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
				>
				<h2 className="text-xl font-semibold">{product.name}</h2>
				<p className="text-2xl font-bold text-green-600 mt-2">
					{formatCents(product.price_cents)}
				</p>
				<p className="text-sm text-gray-500 mt-1">
					Stock: {product.stock_quantity}
				</p>
				<p className="text-xs text-gray-400 mt-3 border-t pt-2">
					Sold by: {product.vendor_email}
				</p>
				</div>
			))}
			</div>
		)}
		</main>
	);
}
