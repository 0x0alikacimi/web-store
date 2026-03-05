import db from '../database/db';
export interface Product
{
	id?: number;
	name: string;
	description: string;
	price_cents: number;
	stock_quantity: number;
}

export const ProductRepository =
{
	findAll: (): Product[] =>
	{
		const stmt = db.prepare('SELECT * FROM products');
		return stmt.all() as Product[];
	},

	create: (product: Product) =>
	{
		const stmt = db.prepare(`INSERT INTO products (name, description, price_cents, stock_quantity)
		VALUES (?, ?, ?, ?)`);
		return stmt.run(product.name, product.description, product.price_cents, product.stock_quantity);
	}
};
