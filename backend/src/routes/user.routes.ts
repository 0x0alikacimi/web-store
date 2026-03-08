import fastify, { FastifyInstance } from "fastify";
import { registerUserHandler, loginHandler } from "../controllers/user.controller";


export async function userRoutes(server: FastifyInstance)
{
	server.post('/register', registerUserHandler);
	server.post('/login', loginHandler);
}
