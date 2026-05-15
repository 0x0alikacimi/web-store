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
	user_id: { type: 'number' }
};

const successWrapper = (dataSchema: object) => ({
	type: 'object',
	properties:
	{
		status: { type: 'string' },
		data: dataSchema
	}
});

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
		201: successWrapper(
		{
			type: 'object',
			properties: { productId: { type: 'number' } }
		})
	}
};

export const getProductsSchema =
{
	querystring:
	{
		type: 'object',
		properties:
		{
			limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
			offset: { type: 'integer', minimum: 0, default: 0 }
		}
	},
	response:
	{
		200: successWrapper(
		{
			type: 'array',
			items: { type: 'object', properties: productShape }
		})
	}
};

export const getProductByIdSchema =
{
	params: idParamsSchema,
	response:
	{
		200: successWrapper({ type: 'object', properties: productShape })
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
	},
	response:
	{
		200: successWrapper(
		{
			type: 'object',
			properties: { message: { type: 'string' } }
		})
	}
};

export const deleteProductSchema =
{
	params: idParamsSchema
};
