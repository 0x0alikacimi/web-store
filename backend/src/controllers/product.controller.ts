import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service';
import { Product } from '../repositories/product.repository';

interface ProductParams
{
	id: string;
}

export const createProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	try
	{
		const productData = request.body as Product;
		productData.user_id = request.user.id;
		const res = ProductService.createProduct(productData);
		return reply.status(201).send(res);
	}
	catch (error: any)
	{
		return reply.status(400).send({status: 'error', message: error.message});
	}
};

export const getProductsHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	try
	{
		const products = ProductService.getAllProducts();
		return reply.status(200).send({status: 'success', data: products});
	}
	catch(error: any)
	{
		return reply.status(500).send({status: 'error', message: "Failed to fetch products"});
	}
}

export const getProductByIdHandler = async (request: FastifyRequest, reply: FastifyReply) =>
	{
		try
		{
			const { id } = request.params as { id: string };
			const productId = parseInt(id, 10);
			if (isNaN(productId))
			{
				return reply.status(400).send({ message: "Invalid ID format" });
			}
			const product = ProductService.getProductById(productId);
			return reply.status(200).send(product);
		}
		catch (error: any)
		{
			return reply.status(404).send({ status: 'error', message: error.message });
		}
};

export const updateProductHandler = async (request: FastifyRequest, reply: FastifyReply) => {
	try
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
	}
	catch (error: any)
	{
		if (error.message === "NOT_FOUND")
			return reply.status(404).send({ error: "Product not found" });
		if (error.message === "FORBIDDEN")
			return reply.status(403).send({ error: "You do not own this product" });
		return reply.status(400).send({ error: error.message });
	}
};

export const deleteProductHandler = async (request: FastifyRequest, reply: FastifyReply) => {
	try
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
	}
	catch (error: any)
	{
		if (error.message === "NOT_FOUND")
			return reply.status(404).send({ error: "Product not found" });
		if (error.message === "FORBIDDEN")
			return reply.status(403).send({ error: "You do not own this product" });
		return reply.status(400).send({ error: error.message });
	}
};
