import db from '../database/db';

export interface Product
{
	id?: number;
	name: string;
	description: string;
	price_cents: number;
	stock_quantity: number;
	user_id: number;
}

export interface PaginationParams
{
	limit: number;
	offset: number;
}

export const ProductRepository =
{
	findAll: ({ limit, offset }: PaginationParams): Product[] =>
	{
		const stmt = db.prepare
		(`
			SELECT id, name, description, price_cents, stock_quantity, user_id
			FROM products
			LIMIT ? OFFSET ?
		`);
		return stmt.all(limit, offset) as Product[];
	},

	findById: (id: number): Product | undefined =>
	{
		const stmt = db.prepare
		(`
			SELECT id, name, description, price_cents, stock_quantity, user_id
			FROM products
			WHERE id = ?
		`);
		return stmt.get(id) as Product | undefined;
	},

	create: (product: Product) =>
	{
		const stmt = db.prepare
		(`INSERT INTO products (name, description, price_cents, stock_quantity, user_id)
		VALUES (?, ?, ?, ?, ?)`);
		return stmt.run(product.name, product.description, product.price_cents, product.stock_quantity, product.user_id);
	},

	update: (id: number, product: Partial<Product>) =>
	{
		const stmt = db.prepare
		(`
			UPDATE products
			SET name = COALESCE(?, name),
				description = COALESCE(?, description),
				price_cents = COALESCE(?, price_cents),
				stock_quantity = COALESCE(?, stock_quantity)
			WHERE id = ?
		`);
		return stmt.run
		(
			product.name ?? null,
			product.description ?? null,
			product.price_cents ?? null,
			product.stock_quantity ?? null,
			id
		);
	},

	delete: (id: number) =>
	{
		const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
		return stmt.run(id);
	}
};
