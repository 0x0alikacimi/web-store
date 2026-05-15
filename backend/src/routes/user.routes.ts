import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { registerUserHandler, loginHandler } from "../controllers/user.controller";
import { registerSchema, loginSchema } from "../schemas/user.scema";

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) =>
{
		await request.jwtVerify();
};

export async function userRoutes(server: FastifyInstance)
{
	server.post('/register', { schema: registerSchema }, registerUserHandler);
	server.post('/login',
		{
			schema: loginSchema,
			config: { rateLimit: { max: 5, timeWindow: '1 minute' } }
		},
		loginHandler
	);
}

