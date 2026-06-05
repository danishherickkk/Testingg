from flask import Flask, render_template, request, jsonify
from database import get_db, init_db

app = Flask(__name__)


# ── Pages ──────────────────────────────────────────────────────────────────────

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')


# ── Products ───────────────────────────────────────────────────────────────────

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db()
    products = conn.execute('SELECT * FROM products ORDER BY category, name').fetchall()
    conn.close()
    return jsonify([dict(p) for p in products])


@app.route('/api/product', methods=['POST'])
def add_product():
    data = request.get_json()
    required = ('name', 'price', 'stock', 'category', 'emoji')
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing fields'}), 400

    conn = get_db()
    conn.execute(
        'INSERT INTO products (name, price, stock, category, emoji) VALUES (?,?,?,?,?)',
        (data['name'], float(data['price']), int(data['stock']),
         data['category'], data['emoji'])
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True}), 201


@app.route('/api/product/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    conn = get_db()
    product = conn.execute('SELECT * FROM products WHERE id=?', (product_id,)).fetchone()
    if not product:
        conn.close()
        return jsonify({'error': 'Product not found'}), 404

    name     = data.get('name',     product['name'])
    price    = data.get('price',    product['price'])
    stock    = data.get('stock',    product['stock'])
    category = data.get('category', product['category'])
    emoji    = data.get('emoji',    product['emoji'])

    conn.execute(
        'UPDATE products SET name=?, price=?, stock=?, category=?, emoji=? WHERE id=?',
        (name, float(price), int(stock), category, emoji, product_id)
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True})


@app.route('/api/product/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    conn = get_db()
    conn.execute('DELETE FROM products WHERE id=?', (product_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})


# ── Purchase ───────────────────────────────────────────────────────────────────

@app.route('/api/purchase', methods=['POST'])
def purchase():
    data = request.get_json()
    product_id    = data.get('product_id')
    amount_inserted = data.get('amount_inserted', 0)

    if not product_id:
        return jsonify({'error': 'No product selected'}), 400

    conn = get_db()
    product = conn.execute('SELECT * FROM products WHERE id=?', (product_id,)).fetchone()

    if not product:
        conn.close()
        return jsonify({'error': 'Product not found'}), 404
    if product['stock'] <= 0:
        conn.close()
        return jsonify({'error': 'Out of stock'}), 400

    price = product['price']
    if round(amount_inserted, 2) < round(price, 2):
        conn.close()
        return jsonify({'error': f'Insufficient amount. Need RM{price:.2f}'}), 400

    change = round(amount_inserted - price, 2)

    conn.execute('UPDATE products SET stock = stock - 1 WHERE id=?', (product_id,))
    conn.execute(
        'INSERT INTO transactions (product_id, product_name, price_paid, change_given) VALUES (?,?,?,?)',
        (product_id, product['name'], amount_inserted, change)
    )
    conn.commit()

    updated = conn.execute('SELECT stock FROM products WHERE id=?', (product_id,)).fetchone()
    conn.close()

    return jsonify({
        'success':      True,
        'product_name': product['name'],
        'price':        price,
        'change':       change,
        'stock_left':   updated['stock'],
    })


# ── Restock ────────────────────────────────────────────────────────────────────

@app.route('/api/restock', methods=['POST'])
def restock():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity   = data.get('quantity', 0)

    if not product_id or quantity <= 0:
        return jsonify({'error': 'Invalid data'}), 400

    conn = get_db()
    conn.execute(
        'UPDATE products SET stock = stock + ? WHERE id=?',
        (int(quantity), product_id)
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True})


# ── Transactions ───────────────────────────────────────────────────────────────

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    conn = get_db()
    rows = conn.execute(
        'SELECT * FROM transactions ORDER BY timestamp DESC'
    ).fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])


# ── Run ────────────────────────────────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)
