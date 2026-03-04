import Fastify, { FastifyInstance } from 'fastify';
import {healthRoutes} from './routes/health.routes';
import db from './database/db';

const server: FastifyInstance = Fastify({ logger: true });

const setup_db = () => {
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
  };

setup_db();

server.register(healthRoutes);

const start = async () =>
{
	try
	{
		await server.listen({ port: 3000, host: '0.0.0.0' });
		console.log('Server is running at http://localhost:3000');
	}
	catch (err)
	{
		server.log.error(err);
		process.exit(1);
	}
};

start();
