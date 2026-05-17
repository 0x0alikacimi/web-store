import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryService } from '../services/category.service';

interface CategoryParams
{
	id: number;
}

export const getCategoriesHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const data = CategoryService.getAllCategories();
	return reply.status(200).send({ status: 'success', data });
};

export const getCategoryByIdHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const { id } = request.params as CategoryParams;
	const data = CategoryService.getCategoryById(id);
	return reply.status(200).send({ status: 'success', data });
};
