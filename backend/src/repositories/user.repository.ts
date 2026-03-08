import db from "../database/db";

export interface User
{
	id?: number;
	email: string;
	password_hash: string;
}

export const UserRepository =
{
	findByEmail: (email: string): User | undefined =>
	{
		const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
		return stmt.get(email) as User | undefined;
	},
	create: (user: User) =>
	{
		const stmt = db.prepare(`
			INSERT INTO users (email, password_hash)
			VALUES (?, ?)
		`);
		return stmt.run(user.email, user.password_hash);
	}
}
