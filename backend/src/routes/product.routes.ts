import { FastifyInstance } from "fastify";
import
{
	createProductHandler,
	getProductsHandler,
	getProductByIdHandler,
	updateProductHandler,
	deleteProductHandler
} from "../controllers/product.controller";
import { authenticate } from "./user.routes";
import { createProductSchemas } from "../schemas/product.schema";

export async function productRoutes(server: FastifyInstance)
{
	server.post('/products',
		{
			preHandler: [authenticate],
			schema: createProductSchemas
		},
		createProductHandler);

	server.get('/products', getProductsHandler);
	server.get('/products/:id', getProductByIdHandler);

	server.patch('/products/:id',
		{ preHandler: [authenticate] },
		updateProductHandler
	);

	server.delete('/products/:id',
		{ preHandler: [authenticate] },
		deleteProductHandler
	);
}
