import db from '../database/db';
export interface Product
{
	id?: number;
	name: string;
	description: string;
	price_cents: number;
	stock_quantity: number;
	user_id: number;
	vendor_email?: string;
}

export const ProductRepository =
{
	findAll: (): Product[] =>
	{
		const stmt = db.prepare
		(`
			SELECT
				products.*,
				users.email AS vendor_email
			FROM products
			JOIN users ON products.user_id = users.id
		`);
		return stmt.all() as Product[];
	},

	//warning: if a product somehow exists with a user_id that doesn't exist in the Users table, that product will not show up in the list at all. the JOIN requires a perfect match on both sides to include the row. (since we have foreign keys set up, this shouldn't happen, but it's good to know!)

	findById: (id: number): Product | undefined =>
	{
		const stmt = db.prepare
		(`
			SELECT
				products.*,
				users.email AS vendor_email
			FROM products
			JOIN users ON products.user_id = users.id
			WHERE products.id = ?
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
		//COALESCE means If the new value is null or undefined, keep the old database value
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
