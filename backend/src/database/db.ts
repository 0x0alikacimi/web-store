import Database from "better-sqlite3";
import path from "path";

// creating a connection to 'store.db' (sqlite will create 'store.db'  if it doesn't exist)
const db = new Database(path.join(__dirname, '../../store.db'),
{
	verbose: console.log //  prints every SQL query to the terminal
});

db.pragma('journal_mode = WAL');//optimization 

export default db;
