import { FastifyEnv } from '@fastify/env';
import '@fastify/jwt';

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

declare module '@fastify/jwt'
{
	interface FastifyJWT
	{
		user:
		{
			id: number;
			email: string;
		};
	}
}
