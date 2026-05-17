import db from '../database/db';

export interface Category
{
	id?: number;
	name: string;
	slug: string;
	description?: string | null;
	image_url?: string | null;
	created_at?: string;
}

export const CategoryRepository =
{
	findAll: (): Category[] =>
	{
		const stmt = db.prepare
		(`
			SELECT id, name, slug, description, image_url, created_at
			FROM categories
			ORDER BY name ASC
		`);
		return stmt.all() as Category[];
	},

	findById: (id: number): Category | undefined =>
	{
		const stmt = db.prepare
		(`
			SELECT id, name, slug, description, image_url, created_at
			FROM categories
			WHERE id = ?
		`);
		return stmt.get(id) as Category | undefined;
	}
};
