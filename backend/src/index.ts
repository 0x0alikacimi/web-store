import Fastify, { FastifyInstance } from 'fastify';
import db, { setup_db } from './database/db';
import { healthRoutes } from './routes/health.routes';
import { productRoutes } from './routes/product.routes';
import { categoryRoutes } from './routes/category.routes';
import { userRoutes } from './routes/user.routes';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';
import rateLimit from '@fastify/rate-limit';
import { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { AppError } from './errors/AppError';


const server: FastifyInstance = Fastify(
{
	logger:
	{
		level: 'info',
		serializers:
		{
			// only log full error details for 5xx; suppress 4xx noise
			res(reply)
			{
				return { statusCode: reply.statusCode };
			}
		}
	},
	routerOptions: { ignoreTrailingSlash: true },
	ajv:
	{
		customOptions: { formats: { email: true } }
	}
});

/**********************/
setup_db();
/**********************/

const envSchema =
{
	type: 'object',
	required: ['PORT', 'JWT_SECRET'],
	properties:
	{
		PORT: { type: 'string', default: '3000' },
		JWT_SECRET: { type: 'string' },
		CORS_ORIGIN: { type: 'string', default: 'http://localhost:5173' }
	}
};

const envOptions =
{
	confKey: 'config',
	schema: envSchema,
	dotenv: true
};

server.setErrorHandler((error: any, request: FastifyRequest, reply: FastifyReply) =>
{
	if (error.statusCode && error.statusCode >= 500)
		server.log.error(error);

	if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER' || error.statusCode === 401)
		return reply.status(401).send({ status: 'error', errorCode: 'UNAUTHORIZED', message: 'Unauthorized: Invalid or missing token' });

	if (error.validation)
		return reply.status(400).send({ status: 'error', errorCode: 'VALIDATION_ERROR', message: 'Validation Failed', details: error.validation });

	if (error instanceof AppError)
		return reply.status(error.statusCode).send({ status: 'error', errorCode: error.errorCode, message: error.message });

	return reply.status(500).send({ status: 'error', errorCode: 'INTERNAL_ERROR', message: 'Internal Server Error' });
});

const start = async () =>
{
	try
	{
		await server.register(fastifyEnv, envOptions);

		await server.register(cors,
		{
			origin: server.config.CORS_ORIGIN,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization']
		});

		await server.register(rateLimit,
		{
			global: false // opt-in per route, not global
		});

		server.register(fastifyJwt,
		{
			secret: server.config.JWT_SECRET,
			sign: { expiresIn: '7d' }
		});

		server.register(healthRoutes);
		server.register(productRoutes);
		server.register(categoryRoutes);
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
