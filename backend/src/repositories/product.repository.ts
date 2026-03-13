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

export const ProductRepository =
{
	findAll: (): Product[] =>
	{
		const stmt = db.prepare('SELECT * FROM products');
		return stmt.all() as Product[];
		// .all() returns an array
	},
	findById: (id: number): Product | undefined =>
	{
		const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
		return stmt.get(id) as Product | undefined;
		// .get() returns a single object
	},
	create: (product: Product) =>
	{
		const stmt = db.prepare(`INSERT INTO products (name, description, price_cents, stock_quantity, user_id)
		VALUES (?, ?, ?, ?, ?)`);
		return stmt.run(product.name, product.description, product.price_cents, product.stock_quantity, product.user_id);
	}
};
