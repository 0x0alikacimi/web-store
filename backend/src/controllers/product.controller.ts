import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service';
import { Product } from '../repositories/product.repository';

interface ProductParams
{
	id: string;
}

export const createProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const productData = request.body as Product;
	productData.user_id = request.user.id;
	const res = ProductService.createProduct(productData);
	return reply.status(201).send(res);
};

export const getProductsHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const products = ProductService.getAllProducts();
	return reply.status(200).send({status: 'success', data: products});
}

export const getProductByIdHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as { id: string };
	const productId = parseInt(id, 10);
	if (isNaN(productId))
	{
		return reply.status(400).send({ message: "Invalid ID format" });
	}
	const product = ProductService.getProductById(productId);
	return reply.status(200).send(product);
};

export const updateProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as { id: string };
	const productId = parseInt(id, 10);

	if (isNaN(productId))
	{
		return reply.status(400).send({ message: "Invalid ID format" });
	}

	const userId = request.user.id;
	const updateData = request.body as Partial<Product>;

	const res = ProductService.updateProduct(productId, userId, updateData);
	return reply.status(200).send(res);
};

export const deleteProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as { id: string };
	const productId = parseInt(id, 10);

	if (isNaN(productId))
	{
		return reply.status(400).send({ message: "Invalid ID format" });
	}

	const userId = request.user.id;

	const res = ProductService.deleteProduct(productId, userId);
	return reply.status(200).send(res);
};
