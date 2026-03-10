import { FastifyInstance } from "fastify";
import { createProductHandler, getProductsHandler, getProductByIdHandler } from "../controllers/product.controller";
import { authenticate } from "./user.routes";

export async function productRoutes(server: FastifyInstance)
{
	server.post('/products', { preHandler: [authenticate] }, createProductHandler);
	server.get('/products', getProductsHandler);
	server.get('/products/:id', getProductByIdHandler);
}
