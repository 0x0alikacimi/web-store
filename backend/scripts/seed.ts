import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import path from 'path';

const db = new Database(path.join(__dirname, '../store.db'));

// ── Schema setup (mirrors db.ts so the script is self-contained) ──────────────

// Silently skips columns/tables that already exist — safe to run on every startup
const migrate = (sql: string) => { try { db.exec(sql); } catch {} };

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
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
  )
`);
migrate(`ALTER TABLE products ADD COLUMN image_url TEXT NOT NULL DEFAULT ''`);
migrate(`ALTER TABLE products ADD COLUMN category_id INTEGER REFERENCES categories (id)`);
migrate(`ALTER TABLE products ADD COLUMN is_featured INTEGER NOT NULL DEFAULT 0`);
migrate(`ALTER TABLE products ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP`);

// ── Seed data ─────────────────────────────────────────────────────────────────

const SEED_EMAIL = 'seed@webstore.com';
const SEED_PASSWORD = 'seedpassword123';

const categories = [
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Timeless pieces for every room — crafted for comfort and longevity.',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    description: 'Illuminate your space with intention — from warm ambient to focused task lighting.',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Decor',
    slug: 'decor',
    description: 'Finishing touches that bring warmth, texture, and personality to any room.',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rugs',
    slug: 'rugs',
    description: 'Ground your space with natural fibers and handcrafted weaves.',
    image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Wall Art',
    slug: 'wall-art',
    description: 'Curated prints and originals to transform blank walls into statements.',
    image_url: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Plants',
    slug: 'plants',
    description: 'Bring life indoors with low-maintenance greenery and sculptural foliage.',
    image_url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
  },
];

// product definitions reference category by slug for clarity
const productDefs = [
  // Furniture
  {
    category: 'furniture',
    name: 'Oak Coffee Table',
    description: 'Solid white oak with a natural oil finish and hairpin legs. Seats a 3-seat sofa comfortably.',
    price_cents: 24900,
    stock_quantity: 12,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'furniture',
    name: 'Linen Accent Chair',
    description: 'Bouclé linen upholstery over a solid oak frame. Clean lines, generous seat depth.',
    price_cents: 39900,
    stock_quantity: 8,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'furniture',
    name: 'Walnut Bookshelf',
    description: 'Open shelving in American walnut with adjustable shelves. Freestanding, no wall anchoring needed.',
    price_cents: 32900,
    stock_quantity: 6,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'furniture',
    name: 'Marble Side Table',
    description: 'White Carrara marble top on a matte black steel base. Compact enough for tight corners.',
    price_cents: 18900,
    stock_quantity: 15,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  },

  // Lighting
  {
    category: 'lighting',
    name: 'Minimalist Floor Lamp',
    description: 'Slim steel stem with a linen shade. Adjustable arm; dimmer switch included.',
    price_cents: 14900,
    stock_quantity: 20,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'lighting',
    name: 'Edison Pendant Light',
    description: 'Exposed-bulb pendant with a brass socket and hand-twisted textile cord. Bulb included.',
    price_cents: 8900,
    stock_quantity: 25,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'lighting',
    name: 'Arch Brass Floor Lamp',
    description: 'Sweeping arched form in brushed brass. Oversized linen shade softens the light dramatically.',
    price_cents: 22900,
    stock_quantity: 10,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'lighting',
    name: 'Rattan Table Lamp',
    description: 'Hand-woven rattan base with a white cotton drum shade. Warm, coastal feel.',
    price_cents: 7500,
    stock_quantity: 18,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  },

  // Decor
  {
    category: 'decor',
    name: 'Ceramic Vase Set',
    description: 'Set of 3 hand-thrown stoneware vases in matte white, sage, and terracotta.',
    price_cents: 5900,
    stock_quantity: 30,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'decor',
    name: 'Woven Throw Basket',
    description: 'Seagrass belly basket, hand-woven by artisans. Perfect for throws, toys, or potted plants.',
    price_cents: 4500,
    stock_quantity: 22,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'decor',
    name: 'Travertine Candle Holder',
    description: 'Polished travertine with a carved taper socket. Heavy, stable, and timeless.',
    price_cents: 3400,
    stock_quantity: 40,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'decor',
    name: 'Linen Throw Pillow',
    description: 'Pre-washed linen cover in natural undyed linen. Feather-down insert included.',
    price_cents: 2800,
    stock_quantity: 50,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
  },

  // Rugs
  {
    category: 'rugs',
    name: 'Berber Wool Rug 5×8',
    description: 'Handknotted in Morocco from undyed wool. Ivory field with charcoal diamond motifs.',
    price_cents: 39900,
    stock_quantity: 5,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'rugs',
    name: 'Jute Natural Rug 4×6',
    description: 'Chunky hand-braided jute in a herringbone pattern. Durable and fully biodegradable.',
    price_cents: 14900,
    stock_quantity: 10,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'rugs',
    name: 'Cotton Tufted Rug 3×5',
    description: 'Soft cotton pile in a minimal grid pattern. Machine washable — great for high-traffic areas.',
    price_cents: 8900,
    stock_quantity: 15,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'rugs',
    name: 'Flatweave Kelim Rug',
    description: 'Vintage-inspired geometric pattern in warm ochre and cream. Hand-woven wool flatweave.',
    price_cents: 21900,
    stock_quantity: 8,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=800&q=80',
  },

  // Wall Art
  {
    category: 'wall-art',
    name: 'Abstract Canvas Print',
    description: 'Gallery-wrapped canvas print of an original oil painting. Bold brushwork in warm neutrals.',
    price_cents: 12900,
    stock_quantity: 20,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'wall-art',
    name: 'Minimal Line Art Set',
    description: 'Set of 3 minimalist figure line drawings on heavyweight cotton paper. Unframed.',
    price_cents: 7900,
    stock_quantity: 25,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1579541814924-49fef17c5be5?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'wall-art',
    name: 'Botanical Framed Print',
    description: 'Archival giclée print of Victorian botanical illustrations in a solid oak frame.',
    price_cents: 6900,
    stock_quantity: 18,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'wall-art',
    name: 'Black & White Cityscape Print',
    description: 'High-contrast architectural photography printed on fine art matte paper. Ships rolled.',
    price_cents: 5500,
    stock_quantity: 30,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80',
  },

  // Plants
  {
    category: 'plants',
    name: 'Fiddle Leaf Fig',
    description: 'Ficus lyrata — large-leafed statement plant in a 10" terracotta pot. Ships ~90cm tall.',
    price_cents: 8900,
    stock_quantity: 8,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'plants',
    name: 'Monstera Deliciosa',
    description: 'The iconic split-leaf philodendron. Easy care, fast growing, arrives in a 6" nursery pot.',
    price_cents: 6500,
    stock_quantity: 12,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'plants',
    name: 'Trailing Pothos',
    description: 'Golden Pothos in a hanging macramé planter. Near-indestructible and air-purifying.',
    price_cents: 2500,
    stock_quantity: 35,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1598880942882-3a1304e8e977?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'plants',
    name: 'Snake Plant',
    description: 'Sansevieria trifasciata — architectural upright foliage. Thrives on neglect. 8" pot.',
    price_cents: 3900,
    stock_quantity: 20,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=800&q=80',
  },
  {
    category: 'plants',
    name: 'ZZ Plant',
    description: 'Zamioculcas zamiifolia — glossy, waxy leaves and extreme drought tolerance. 6" pot.',
    price_cents: 4900,
    stock_quantity: 15,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getOrCreateSeedUser(): number {
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(SEED_EMAIL) as { id: number } | undefined;
  if (existing) return existing.id;

  const hash = bcrypt.hashSync(SEED_PASSWORD, 10);
  const result = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(SEED_EMAIL, hash);
  console.log(`Created seed user: ${SEED_EMAIL}`);
  return result.lastInsertRowid as number;
}

function seedCategories(): Record<string, number> {
  const slugToId: Record<string, number> = {};

  for (const cat of categories) {
    const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(cat.slug) as { id: number } | undefined;
    if (existing) {
      slugToId[cat.slug] = existing.id;
      console.log(`Category already exists: ${cat.name}`);
      continue;
    }

    const result = db
      .prepare('INSERT INTO categories (name, slug, description, image_url) VALUES (?, ?, ?, ?)')
      .run(cat.name, cat.slug, cat.description, cat.image_url);

    slugToId[cat.slug] = result.lastInsertRowid as number;
    console.log(`Inserted category: ${cat.name}`);
  }

  return slugToId;
}

function seedProducts(slugToId: Record<string, number>, userId: number) {
  for (const p of productDefs) {
    const existing = db.prepare('SELECT id FROM products WHERE name = ?').get(p.name) as { id: number } | undefined;
    if (existing) {
      console.log(`Product already exists: ${p.name}`);
      continue;
    }

    db.prepare(`
      INSERT INTO products (name, description, price_cents, stock_quantity, image_url, category_id, is_featured, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      p.name,
      p.description,
      p.price_cents,
      p.stock_quantity,
      p.image_url,
      slugToId[p.category] ?? null,
      p.is_featured,
      userId,
    );

    console.log(`Inserted product: ${p.name}`);
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────

console.log('Seeding database...\n');

const userId = getOrCreateSeedUser();
const slugToId = seedCategories();
seedProducts(slugToId, userId);

console.log('\nDone.');
db.close();
