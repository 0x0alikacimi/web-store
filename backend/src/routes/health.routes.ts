import { FastifyInstance } from 'fastify';
import { getHealthStatus } from '../controllers/health.controller';

const healthSchema =
{
	response:
	{
		200: { type: 'object', properties: { status: { type: 'string' } } }
	}
};

export async function healthRoutes(server:FastifyInstance)
{
	server.get('/ping', { schema: healthSchema }, getHealthStatus);
}
