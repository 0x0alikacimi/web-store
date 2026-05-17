import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service';
import { Product } from '../repositories/product.repository';

interface ProductParams
{
	id: number;
}

interface GetProductsQuery
{
	limit: number;
	offset: number;
	category_id?: number;
	featured?: boolean;
}

export const createProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const productData = request.body as Product;
	productData.user_id = request.user.id;
	const data = ProductService.createProduct(productData);
	return reply.status(201).send({ status: 'success', data });
};

export const getProductsHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { limit, offset, category_id, featured } = request.query as GetProductsQuery;
	const data = ProductService.getAllProducts({
		limit,
		offset,
		category_id: category_id ?? null,
		featured: featured ?? null
	});
	return reply.status(200).send({ status: 'success', data });
};

export const getProductByIdHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as ProductParams;
	const data = ProductService.getProductById(id);
	return reply.status(200).send({ status: 'success', data });
};

export const updateProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as ProductParams;
	const userId = request.user.id;
	const updateData = request.body as Partial<Product>;
	const data = ProductService.updateProduct(id, userId, updateData);
	return reply.status(200).send({ status: 'success', data });
};

export const deleteProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as ProductParams;
	const userId = request.user.id;
	ProductService.deleteProduct(id, userId);
	return reply.status(204).send();
};
