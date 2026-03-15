import Fastify, { FastifyInstance } from 'fastify';
import db, { setup_db } from './database/db';
import {healthRoutes} from './routes/health.routes';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';
import { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';


const server: FastifyInstance = Fastify(
{
	logger: true,
	routerOptions: { ignoreTrailingSlash: true },
	ajv:
	{
		customOptions:{ formats: { email: true }}//enables the 'email' format check
	}
});

/**********************/
setup_db();
/**********************/

const schema =
{
	type: 'object',
	required: ['PORT', 'JWT_SECRET'],
	properties:
	{
		PORT: { type: 'string', default: '3000' },
		JWT_SECRET: { type: 'string' }
	}
};

const options =
{
	confKey: 'config', // puts the variables in server.config
	schema: schema,
	dotenv: true//read from the .env file
};

server.setErrorHandler((error: any , request: FastifyRequest, reply: FastifyReply) =>
{
		server.log.error(error);

		// JWT Authentication Errors (from request.jwtVerify)
		if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER' || error.statusCode === 401)
		{
			return reply.status(401).send({ status: 'error', message: 'Unauthorized: Invalid or missing token' });
		}

		switch (error.message)
		{
			case "NOT_FOUND":
				return reply.status(404).send({ status: 'error', message: "Resource not found" });
			case "FORBIDDEN":
				return reply.status(403).send({ status: 'error', message: "You do not own this resource" });
			case "INVALID_ID":
				return reply.status(400).send({ status: 'error', message: "Invalid ID format" });
		}

		if (error.validation)
		{
			return reply.status(400).send({ status: 'error', message: "Validation Failed", details: error.validation });
		}

		// catch expected user/product service errors ("Price cannot be negative" or "User already exists")
		if (error.statusCode === 400 || !error.statusCode)
		{
			return reply.status(400).send({ status: 'error', message: error.message });
		}

		// the Catch-All for real crashes (500)
		return reply.status(500).send({ status: 'error', message: "Internal Server Error" });
});
// ----------------------------

const start = async () =>
{
	try
	{
		await server.register(fastifyEnv, options);

		await server.register(cors,
		{
			origin: 'http://localhost:5173', // Only allow your specific frontend URL
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allowed methods
			allowedHeaders: ['Content-Type', 'Authorization']   // Allowed headers
		});

		server.register(fastifyJwt, {secret: server.config.JWT_SECRET});//this plugin adds a jwt.sign() method to the reply object.
		server.register(healthRoutes);
		server.register(productRoutes);
		server.register(userRoutes);

		await server.listen({ port: Number(server.config.PORT), host: '0.0.0.0' });
	}
	catch (err)
	{
		server.log.error(err);
		process.exit(1);
	}
};

start();
