import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { registerUserHandler, loginHandler } from "../controllers/user.controller";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) =>
{
		await request.jwtVerify();
};

export async function userRoutes(server: FastifyInstance)
{
	server.post('/register', registerUserHandler);
	server.post('/login', loginHandler);
}

