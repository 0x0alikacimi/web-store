// the Fastify Schema lives at the very edge of server. Its job is to validate the Request to ensure the incoming JSON is shaped correctly

const idParamsSchema =
{
	type: 'object',
	properties: { id: { type: 'integer', minimum: 1 } },
	required: ['id']
};

const productShape =
{
	id: { type: 'number' },
	name: { type: 'string' },
	description: { type: 'string' },
	price_cents: { type: 'integer' },
	stock_quantity: { type: 'integer' },
	user_id: { type: 'number' },
	vendor_email: { type: 'string' }
};

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
};

export const getProductsSchema =
{
	response:
	{
		200:
		{
			type: 'object',
			properties:
			{
				status: { type: 'string' },
				data: { type: 'array', items: { type: 'object', properties: productShape } }
			}
		}
	}
};

export const getProductByIdSchema =
{
	params: idParamsSchema,
	response:
	{
		200: { type: 'object', properties: productShape }
	}
};

export const patchProductSchema =
{
	params: idParamsSchema,
	body:
	{
		type: 'object',
		minProperties: 1,
		properties:
		{
			name: { type: 'string', minLength: 3, maxLength: 50 },
			description: { type: 'string', maxLength: 255 },
			price_cents: { type: 'integer', minimum: 1 },
			stock_quantity: { type: 'integer', minimum: 0 }
		},
		additionalProperties: false
	}
};

export const deleteProductSchema =
{
	params: idParamsSchema
};
