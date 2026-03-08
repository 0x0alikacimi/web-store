import fastify, { FastifyInstance } from "fastify";
import { registerUserHandler } from "../controllers/user.controller";


export async function userRoutes(server: FastifyInstance)
{
	server.post('/register', registerUserHandler);
}
