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
	},

	getProductById: (id: number) =>
	{
		const product = ProductRepository.findById(id);
		if (!product)
		{
			throw new Error("Product not found");
		}
		return product;
	},

	updateProduct: (productId: number, userId: number, updateData: Partial<Product>) =>
	{
		const existingProduct = ProductRepository.findById(productId);
		if (!existingProduct)
		{
			throw new Error("NOT_FOUND");
		}

		if (existingProduct.user_id !== userId)
		{
			throw new Error("FORBIDDEN");
		}
		ProductRepository.update(productId, updateData);
		return { message: "Product updated successfully" };
	},

	deleteProduct: (productId: number, userId: number) =>
	{
		const existingProduct = ProductRepository.findById(productId);

		if (!existingProduct)
		{
			throw new Error("NOT_FOUND");
		}

		if (existingProduct.user_id !== userId)
		{
			throw new Error("FORBIDDEN");
		}

		ProductRepository.delete(productId);
		return { message: "Product deleted successfully" };
	}
};
