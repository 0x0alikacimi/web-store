import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService, CreateUserInput } from '../services/user.service';

export const registerUserHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	try
	{
		const userInput = request.body as CreateUserInput;
		const res = await UserService.registerUser(userInput);
		return reply.status(201).send(res);
	}
	catch (error: any)
	{
		return reply.status(400).send(
		{
			status: 'error',
			message: error.message
		});
	}
}
