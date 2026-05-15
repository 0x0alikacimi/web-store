import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService, CreateUserInput } from '../services/user.service';

export const registerUserHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const userInput = request.body as CreateUserInput;
	const data = await UserService.registerUser(userInput);
	return reply.status(201).send({ status: 'success', data });
};

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) =>
{
	const credentials = request.body as CreateUserInput;
	const user = await UserService.loginUser(credentials);
	const token = await reply.jwtSign({ id: user.id, email: user.email });
	return reply.status(200).send({ status: 'success', data: { token, user } });
};
