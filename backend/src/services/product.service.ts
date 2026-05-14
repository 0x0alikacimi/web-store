import { Product, ProductRepository } from "../repositories/product.repository";
import { AppError } from "../errors/AppError";

export const ProductService =
{
	createProduct: (data: Product) =>
	{
		if (data.price_cents < 0)
			throw new AppError(400, 'VALIDATION_ERROR', 'Price cannot be negative');

		if (!data.name || data.name.trim() === "")
			throw new AppError(400, 'VALIDATION_ERROR', 'Product name is required');

		const res = ProductRepository.create(data);
		return {
			message: "Product created successfully",
			// sqlite returns 'lastInsertRowid' when insert a new row
			productId: res.lastInsertRowid
		};
	},

	getAllProducts: () =>
	{
		return ProductRepository.findAll();
	},

	getProductById: (id: number) =>
	{
		const product = ProductRepository.findById(id);
		if (!product)
			throw new AppError(400, 'NOT_FOUND', 'Product not found'); // 400 preserved — see CLAUDE.md

		return product;
	},

	updateProduct: (productId: number, userId: number, updateData: Partial<Product>) =>
	{
		const existingProduct = ProductRepository.findById(productId);
		if (!existingProduct)
			throw new AppError(404, 'NOT_FOUND', 'Resource not found');

		if (existingProduct.user_id !== userId)
			throw new AppError(403, 'FORBIDDEN', 'You do not own this resource');

		ProductRepository.update(productId, updateData);
		return { message: "Product updated successfully" };
	},

	deleteProduct: (productId: number, userId: number) =>
	{
		const existingProduct = ProductRepository.findById(productId);
		if (!existingProduct)
			throw new AppError(404, 'NOT_FOUND', 'Resource not found');

		if (existingProduct.user_id !== userId)
			throw new AppError(403, 'FORBIDDEN', 'You do not own this resource');

		ProductRepository.delete(productId);
		return { message: "Product deleted successfully" };
	}
};
