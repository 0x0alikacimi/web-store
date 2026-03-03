import { FastifyInstance } from 'fastify';
import { getHealthStatus } from '../controllers/health.controller';

export async function healthRoutes(server:FastifyInstance)
{
	server.get('/ping', getHealthStatus);
}
