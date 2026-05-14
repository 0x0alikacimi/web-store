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
import
{
	createProductSchemas,
	getProductsSchema,
	getProductByIdSchema,
	patchProductSchema,
	deleteProductSchema
} from "../schemas/product.schema";

export async function productRoutes(server: FastifyInstance)
{
	server.post('/products',
		{
			preHandler: [authenticate],
			schema: createProductSchemas
		},
		createProductHandler);

	server.get('/products', { schema: getProductsSchema }, getProductsHandler);
	server.get('/products/:id', { schema: getProductByIdSchema }, getProductByIdHandler);

	server.patch('/products/:id',
		{ preHandler: [authenticate], schema: patchProductSchema },
		updateProductHandler
	);

	server.delete('/products/:id',
		{ preHandler: [authenticate], schema: deleteProductSchema },
		deleteProductHandler
	);
}
