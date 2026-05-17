import db from '../database/db';

export interface Product
{
	id?: number;
	name: string;
	description: string;
	price_cents: number;
	stock_quantity: number;
	image_url: string;
	category_id?: number | null;
	is_featured?: number;
	updated_at?: string;
	user_id: number;
}

export interface PaginationParams
{
	limit: number;
	offset: number;
	category_id?: number | null;
	featured?: boolean | null;
}

export const ProductRepository =
{
	findAll: ({ limit, offset, category_id, featured }: PaginationParams): Product[] =>
	{
		const categoryFilter = category_id ?? null;
		const featuredFilter = featured === true ? 1 : null;

		const stmt = db.prepare
		(`
			SELECT id, name, description, price_cents, stock_quantity,
			       image_url, category_id, is_featured, updated_at, user_id
			FROM products
			WHERE (? IS NULL OR category_id = ?)
			AND   (? IS NULL OR is_featured = ?)
			LIMIT ? OFFSET ?
		`);
		return stmt.all(categoryFilter, categoryFilter, featuredFilter, featuredFilter, limit, offset) as Product[];
	},

	findById: (id: number): Product | undefined =>
	{
		const stmt = db.prepare
		(`
			SELECT id, name, description, price_cents, stock_quantity,
			       image_url, category_id, is_featured, updated_at, user_id
			FROM products
			WHERE id = ?
		`);
		return stmt.get(id) as Product | undefined;
	},

	create: (product: Product) =>
	{
		const stmt = db.prepare
		(`
			INSERT INTO products (name, description, price_cents, stock_quantity, image_url, category_id, is_featured, user_id)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)
		`);
		return stmt.run(
			product.name,
			product.description,
			product.price_cents,
			product.stock_quantity,
			product.image_url,
			product.category_id ?? null,
			product.is_featured ?? 0,
			product.user_id
		);
	},

	update: (id: number, product: Partial<Product>) =>
	{
		const stmt = db.prepare
		(`
			UPDATE products
			SET name        = COALESCE(?, name),
			    description = COALESCE(?, description),
			    price_cents = COALESCE(?, price_cents),
			    stock_quantity = COALESCE(?, stock_quantity),
			    image_url   = COALESCE(?, image_url),
			    category_id = COALESCE(?, category_id),
			    is_featured = COALESCE(?, is_featured),
			    updated_at  = CURRENT_TIMESTAMP
			WHERE id = ?
		`);
		return stmt.run
		(
			product.name ?? null,
			product.description ?? null,
			product.price_cents ?? null,
			product.stock_quantity ?? null,
			product.image_url ?? null,
			product.category_id ?? null,
			product.is_featured ?? null,
			id
		);
	},

	delete: (id: number) =>
	{
		const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
		return stmt.run(id);
	}
};
