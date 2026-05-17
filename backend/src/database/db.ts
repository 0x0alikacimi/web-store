import Database from "better-sqlite3";
import path from "path";

// creating a connection to 'store.db' (sqlite will create 'store.db'  if it doesn't exist)
const db = new Database(path.join(__dirname, '../../store.db'),
{
	verbose: console.log //  prints every SQL query to the terminal
});

// db.pragma('journal_mode = WAL');//optimization

export const setup_db = () =>
{
	// Silently skips columns/tables that already exist — safe to run on every startup
	const migrate = (sql: string) => { try { db.exec(sql); } catch {} };

	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`);

	db.exec(`
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT UNIQUE NOT NULL,
			slug TEXT UNIQUE NOT NULL,
			description TEXT,
			image_url TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`);
	migrate(`ALTER TABLE categories ADD COLUMN description TEXT`);
	migrate(`ALTER TABLE categories ADD COLUMN image_url TEXT`);

	db.exec(`
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			price_cents INTEGER NOT NULL,
			stock_quantity INTEGER NOT NULL DEFAULT 0,
			image_url TEXT NOT NULL DEFAULT '',
			category_id INTEGER REFERENCES categories (id),
			is_featured INTEGER NOT NULL DEFAULT 0,
			updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			user_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id)
		);
	`);
	migrate(`ALTER TABLE products ADD COLUMN image_url TEXT NOT NULL DEFAULT ''`);
	migrate(`ALTER TABLE products ADD COLUMN category_id INTEGER REFERENCES categories (id)`);
	migrate(`ALTER TABLE products ADD COLUMN is_featured INTEGER NOT NULL DEFAULT 0`);
	migrate(`ALTER TABLE products ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP`);
};

export default db;
