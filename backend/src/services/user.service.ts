import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../errors/AppError';

export interface CreateUserInput
{
	email: string;
	password: string;
}

export const UserService =
{
	registerUser: async (data: CreateUserInput) =>
	{
		if (!data.email || !data.password)
			throw new AppError(400, 'VALIDATION_ERROR', 'Email and password are required');

		if (data.password.length < 8)
			throw new AppError(400, 'VALIDATION_ERROR', 'Password must be at least 8 characters');

		const existingUser = UserRepository.findByEmail(data.email);
		if (existingUser)
			throw new AppError(400, 'CONFLICT', 'Email is already in use');

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const res = UserRepository.create(
		{
			email: data.email,
			password_hash: hashedPassword
		});

		return {
			messge: "User registered successfully",
			userId: res.lastInsertRowid
		};
	},

	loginUser: async (data: CreateUserInput) =>
	{
		const user = UserRepository.findByEmail(data.email);
		if (!user)
			throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');

		const isMatch = await bcrypt.compare(data.password, user.password_hash);
		if (!isMatch)
			throw new AppError(400, 'INVALID_CREDENTIALS', 'Invalid email or password');

		return {
			message: "Login successful",
			user: { id: user.id, email: user.email }
		};
	}
};
