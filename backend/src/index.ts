import Fastify, { FastifyInstance } from 'fastify';

const server: FastifyInstance = Fastify({ logger: true });

server.get('/ping', async (request, reply) =>
{
	return { status: 'ok', message: 'The engine is alive.' };
});

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
