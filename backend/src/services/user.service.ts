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
		const existingUser = UserRepository.findByEmail(data.email);
		if (existingUser)
			throw new AppError(409, 'CONFLICT', 'Email is already in use');

		const hashedPassword = await bcrypt.hash(data.password, 10);
		const res = UserRepository.create(
		{
			email: data.email,
			password_hash: hashedPassword
		});

		return {
			id: Number(res.lastInsertRowid),
			email: data.email
		};
	},

	loginUser: async (data: CreateUserInput) =>
	{
		const user = UserRepository.findByEmail(data.email);
		if (!user)
			throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');

		const isMatch = await bcrypt.compare(data.password, user.password_hash);
		if (!isMatch)
			throw new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');

		return { id: user.id, email: user.email };
	}
};
