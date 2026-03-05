import { Product, ProductRepository } from "../repositories/product.repository";

export const ProductService =
{
	createProduct: (data: Product) =>
	{
		if (data.price_cents < 0)
		{
			throw new Error("Price cannot be negative");
		}
		if (!data.name || data.name.trim() === "")
		{
			throw new Error("Product name is required");
		}
		const res = ProductRepository.create(data);
		return {
			message: "Product created successfully",
			// sqlite returns 'lastInsertRowid' when insert a new row
			productId: res.lastInsertRowid
		};
	},

	getAllProducts: () =>
	{
		const products = ProductRepository.findAll();
		return products;
	}
};
