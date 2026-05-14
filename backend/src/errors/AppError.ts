export class AppError extends Error
{
	statusCode: number;
	errorCode: string;

	constructor(statusCode: number, errorCode: string, message: string)
	{
		super(message);
		this.name = 'AppError';
		this.statusCode = statusCode;
		this.errorCode = errorCode;
	}
}
