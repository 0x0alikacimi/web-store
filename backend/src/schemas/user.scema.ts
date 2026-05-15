
export const registerSchema =
{
	body:
	{
		type: 'object',
		required: ['email', 'password'],
		properties:
		{
			email: { type: 'string', format: 'email' },
			password: { type: 'string', minLength: 8 }
		},
		additionalProperties: false
	},
	response:
	{
		201:
		{
			type: 'object',
			properties:
			{
				status: { type: 'string' },
				data:
				{
					type: 'object',
					properties:
					{
						id: { type: 'number' },
						email: { type: 'string' }
					}
				}
			}
		}
	}
};

export const loginSchema =
{
	body:
	{
		type: 'object',
		required: ['email', 'password'],
		properties:
		{
			email: { type: 'string', format: 'email' },
			password: { type: 'string' }
		},
		additionalProperties: false
	},
	response:
	{
		200:
		{
			type: 'object',
			properties:
			{
				status: { type: 'string' },
				data:
				{
					type: 'object',
					properties:
					{
						token: { type: 'string' },
						user:
						{
							type: 'object',
							properties:
							{
								id: { type: 'number' },
								email: { type: 'string' }
							}
						}
					}
				}
			}
		}
	}
};
