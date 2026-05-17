import { FastifyInstance } from 'fastify';
import { getCategoriesHandler, getCategoryByIdHandler } from '../controllers/category.controller';
import { getCategoriesSchema, getCategoryByIdSchema } from '../schemas/category.schema';

export async function categoryRoutes(server: FastifyInstance)
{
	server.get('/categories', { schema: getCategoriesSchema }, getCategoriesHandler);
	server.get('/categories/:id', { schema: getCategoryByIdSchema }, getCategoryByIdHandler);
}
