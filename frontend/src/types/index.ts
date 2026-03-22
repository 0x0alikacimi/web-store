
export interface Product
{
	id: number;
	name: string;
	description: string | null;
	price_cents: number;
	stock_quantity: number;
	user_id: number;
	vendor_email: string;
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
