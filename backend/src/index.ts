import Fastify, { FastifyInstance } from 'fastify';
import db, { setup_db } from './database/db';
import {healthRoutes} from './routes/health.routes';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';



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


const start = async () =>
{
	try
	{
		await server.register(fastifyEnv, options);
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
