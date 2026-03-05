import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductService } from '../services/product.service';
import { Product } from '../repositories/product.repository';

export const createProductHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	try
	{
		const productData = request.body as Product;
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

