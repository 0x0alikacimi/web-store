import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

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
		{
			throw new Error("Email and password are required");
		}
		if (data.password.length < 6)
			throw new Error("Password must be at least 6 characters");

		const existingUser = UserRepository.findByEmail(data.email);
		if (existingUser)
		{
			throw new Error("Email is already in use");
		}
		const hashedPassword = await bcrypt.hash(data.password, 10);
		const res = UserRepository.create(
		{
			email: data.email,
			password_hash: hashedPassword
		});

		return {
			messge : "User registered successfully",
			userId: res.lastInsertRowid
		};
	}
};
