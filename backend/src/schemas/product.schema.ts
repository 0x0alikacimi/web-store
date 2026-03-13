// the Fastify Schema lives at the very edge of server. Its job is to validate the Request to ensure the incoming JSON is shaped correctly

export const createProductSchemas =
{
	body:
	{
		type: 'object',
		required: ['name', 'price_cents', 'stock_quantity'],
		properties:
		{
			name: { type: 'string', minLength: 3, maxLength: 50 },
			description: { type: 'string', maxLength: 255 },
			price_cents: { type: 'integer', minimum: 1 },
			stock_quantity: { type: 'integer', minimum: 0 }
		}
	},

	response:
	{
		201:
		{
			type: 'object',
			properties:
			{
				message: { type: 'string' },
				productId: { type: 'number' }
			}
		}
	}
}
