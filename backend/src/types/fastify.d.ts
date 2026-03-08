import { FastifyEnv } from '@fastify/env';

declare module 'fastify'
{
	interface FastifyInstance
	{
		config:
		{
			PORT: string;
			JWT_SECRET: string;
		};
	}
}
