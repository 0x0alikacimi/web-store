import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { registerUserHandler, loginHandler } from "../controllers/user.controller";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) =>
{
	try
	{
		await request.jwtVerify();
	}
	catch(err: any)
	{
		reply.status(401).send({ status: 'error', message: 'Unauthorized: Invalid or missing token'});
	}
};

export async function userRoutes(server: FastifyInstance)
{
	server.post('/register', registerUserHandler);
	server.post('/login', loginHandler);
}

