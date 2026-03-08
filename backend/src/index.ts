import Fastify, { FastifyInstance } from 'fastify';
import db from './database/db';
import {healthRoutes} from './routes/health.routes';
import { productRoutes } from './routes/product.routes';
import { userRoutes } from './routes/user.routes';
import fastifyJwt from '@fastify/jwt';
import fastifyEnv from '@fastify/env';
import './types/fastify.d.ts';


const server: FastifyInstance = Fastify({ logger: true, ignoreTrailingSlash: true});

/**********************/
const setup_db = () =>
{
	db.exec(`
		CREATE TABLE IF NOT EXISTS products (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		description TEXT,
		price_cents INTEGER NOT NULL,
		stock_quantity INTEGER NOT NULL DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`);
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`);
};

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


server.register(healthRoutes);
server.register(productRoutes);
server.register(userRoutes);

const start = async () =>
{
	try
	{
		await server.register(fastifyEnv, options);
		server.register(fastifyJwt, {secret: server.config.JWT_SECRET});//this plugin adds a jwt.sign() method to the reply object.
		await server.listen({ port: Number(server.config.PORT), host: '0.0.0.0' });
	}
	catch (err)
	{
		server.log.error(err);
		process.exit(1);
	}
};

start();
