import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService, CreateUserInput } from '../services/user.service';

export const registerUserHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const userInput = request.body as CreateUserInput;
	const res = await UserService.registerUser(userInput);
	return reply.status(201).send(res);
}

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const credentials = request.body as CreateUserInput;
	const res = await UserService.loginUser(credentials);
	const token = await reply.jwtSign({id: res.user.id, email: res.user.email});;
	return reply.status(200).send(
	{
		message: res.message,
		token: token
	});
}
