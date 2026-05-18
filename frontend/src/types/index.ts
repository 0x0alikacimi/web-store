
export interface Product
{
	id: number;
	name: string;
	description: string | null;
	price_cents: number;
	stock_quantity: number;
	image_url: string | null;
	category_id: number | null;
	is_featured: 0 | 1;
	vendor_email?: string;
	updated_at: string | null;
	user_id: number;
}

export interface ProductsApiResponse
{
	status: "success" | "error";
	data: Product[];
}

export interface ApiError
{
	status: "error";
	message: string;
	details?: unknown[];
}
