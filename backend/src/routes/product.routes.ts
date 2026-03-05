import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler } from "../controllers/product.controller";

export async function productRoutes(server: FastifyInstance)
{
	server.post('/products', createProductHandler);
	server.get('/products', getProductsHandler);
}
