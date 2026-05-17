const idParamsSchema =
{
	type: 'object',
	properties: { id: { type: 'integer', minimum: 1 } },
	required: ['id']
};

const categoryShape =
{
	id: { type: 'number' },
	name: { type: 'string' },
	slug: { type: 'string' },
	description: { type: 'string' },
	image_url: { type: 'string' },
	created_at: { type: 'string' }
};

const successWrapper = (dataSchema: object) => ({
	type: 'object',
	properties:
	{
		status: { type: 'string' },
		data: dataSchema
	}
});

export const getCategoriesSchema =
{
	response:
	{
		200: successWrapper(
		{
			type: 'array',
			items: { type: 'object', properties: categoryShape }
		})
	}
};

export const getCategoryByIdSchema =
{
	params: idParamsSchema,
	response:
	{
		200: successWrapper({ type: 'object', properties: categoryShape })
	}
};
