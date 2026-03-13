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
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			email TEXT UNIQUE NOT NULL,
			password_hash TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);
	`);
	
	db.exec(`
		CREATE TABLE IF NOT EXISTS products (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			price_cents INTEGER NOT NULL,
			stock_quantity INTEGER NOT NULL DEFAULT 0,
			user_id INTEGER NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (user_id) REFERENCES users (id)
		);
	`);
};

export default db;
