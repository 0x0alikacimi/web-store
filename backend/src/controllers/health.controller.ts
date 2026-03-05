import { FastifyRequest, FastifyReply } from 'fastify';

export const getHealthStatus = async (request: FastifyRequest, reply: FastifyReply) =>
{
	return {status :'ok',timestamp: new Date().toISOString()};
};

