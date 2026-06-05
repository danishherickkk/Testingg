import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'vending.db')


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    c = conn.cursor()

    c.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            name     TEXT    NOT NULL,
            price    REAL    NOT NULL,
            stock    INTEGER NOT NULL DEFAULT 0,
            category TEXT    NOT NULL,
            emoji    TEXT    NOT NULL
        )
    ''')

    c.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id   INTEGER NOT NULL,
            product_name TEXT    NOT NULL,
            price_paid   REAL    NOT NULL,
            change_given REAL    NOT NULL,
            timestamp    DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    c.execute('SELECT COUNT(*) FROM products')
    if c.fetchone()[0] == 0:
        seed_products = [
            ('Mineral Water', 1.00, 15, 'Drinks',  '💧'),
            ('Cola',          2.50, 10, 'Drinks',  '🥤'),
            ('Orange Juice',  3.00,  8, 'Drinks',  '🍊'),
            ('Milo',          2.00, 12, 'Drinks',  '🍫'),
            ('100Plus',       2.50, 10, 'Drinks',  '⚡'),
            ('Chips',         2.00, 20, 'Snacks',  '🥔'),
            ('Chocolate',     3.50,  8, 'Snacks',  '🍫'),
            ('Cookies',       2.50, 15, 'Snacks',  '🍪'),
            ('Crackers',      1.50, 18, 'Snacks',  '🥨'),
            ('Candy',         0.50, 25, 'Others',  '🍬'),
            ('Gum',           1.00, 20, 'Others',  '🫧'),
        ]
        c.executemany(
            'INSERT INTO products (name, price, stock, category, emoji) VALUES (?,?,?,?,?)',
            seed_products
        )

    conn.commit()
    conn.close()
