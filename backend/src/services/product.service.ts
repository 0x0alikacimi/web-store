import { Product, ProductRepository, PaginationParams } from "../repositories/product.repository";
import { AppError } from "../errors/AppError";

export const ProductService =
{
	createProduct: (data: Product) =>
	{
		const res = ProductRepository.create(data);
		return { productId: Number(res.lastInsertRowid) };
	},

	getAllProducts: (pagination: PaginationParams) =>
	{
		return ProductRepository.findAll(pagination);
	},

	getProductById: (id: number) =>
	{
		const product = ProductRepository.findById(id);
		if (!product)
			throw new AppError(404, 'NOT_FOUND', 'Product not found');

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
	}
};
