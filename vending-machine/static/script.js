/* ═══════════════════════════════════════════════════════════════════════════
   VendBot 3000 — Shared + Page-specific logic
   ═══════════════════════════════════════════════════════════════════════════ */

const isAdmin = document.body.classList.contains('admin-body');

if (isAdmin) {
  initAdmin();
} else {
  initVendingMachine();
}

/* ────────────────────────────────────────────────────────────────────────────
   CUSTOMER UI
   ──────────────────────────────────────────────────────────────────────────── */
function initVendingMachine() {
  let products         = [];
  let selectedProduct  = null;
  let insertedAmount   = 0;
  let activeCategory   = 'All';

  const grid          = document.getElementById('productsGrid');
  const screenProduct = document.getElementById('screenProduct');
  const screenPrice   = document.getElementById('screenPrice');
  const screenInserted= document.getElementById('screenInserted');
  const screenChange  = document.getElementById('screenChange');
  const btnPurchase   = document.getElementById('btnPurchase');
  const btnCancel     = document.getElementById('btnCancel');
  const statusMsg     = document.getElementById('statusMsg');
  const popupOverlay  = document.getElementById('popupOverlay');

  // ── Load Products ──────────────────────────────────────────────────────────
  async function loadProducts() {
    const res  = await fetch('/api/products');
    products   = await res.json();
    renderGrid();
  }

  function renderGrid() {
    const filtered = activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory);

    grid.innerHTML = '';
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card' + (p.stock === 0 ? ' out-of-stock' : '');
      if (selectedProduct && selectedProduct.id === p.id) card.classList.add('selected');
      card.dataset.id = p.id;

      card.innerHTML = `
        ${p.stock === 0 ? '<span class="card-badge-sold">OUT</span>' : ''}
        <span class="card-emoji">${p.emoji}</span>
        <div class="card-name">${p.name}</div>
        <div class="card-price">RM ${p.price.toFixed(2)}</div>
        <div class="card-stock">${p.stock > 0 ? `${p.stock} left` : 'Sold out'}</div>
      `;

      if (p.stock > 0) {
        card.addEventListener('click', () => selectProduct(p));
      }
      grid.appendChild(card);
    });
  }

  // ── Category Tabs ──────────────────────────────────────────────────────────
  document.getElementById('categoryTabs').addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    renderGrid();
  });

  // ── Select Product ─────────────────────────────────────────────────────────
  function selectProduct(p) {
    selectedProduct = p;
    screenProduct.textContent = `${p.emoji} ${p.name}`;
    screenPrice.textContent   = `RM ${p.price.toFixed(2)}`;
    setStatus('');
    updatePurchaseBtn();
    renderGrid();
  }

  // ── Insert Coins ───────────────────────────────────────────────────────────
  document.querySelectorAll('.coin-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      insertedAmount = round2(insertedAmount + parseFloat(btn.dataset.value));
      screenInserted.textContent = `RM ${insertedAmount.toFixed(2)}`;
      updateChange();
      updatePurchaseBtn();
      setStatus('');
    });
  });

  function updateChange() {
    if (selectedProduct) {
      const change = Math.max(0, round2(insertedAmount - selectedProduct.price));
      screenChange.textContent = `RM ${change.toFixed(2)}`;
    }
  }

  function updatePurchaseBtn() {
    const canBuy = selectedProduct
      && insertedAmount >= selectedProduct.price
      && selectedProduct.stock > 0;
    btnPurchase.disabled = !canBuy;
  }

  // ── Purchase ───────────────────────────────────────────────────────────────
  btnPurchase.addEventListener('click', async () => {
    if (!selectedProduct) return;

    btnPurchase.disabled = true;

    const res  = await fetch('/api/purchase', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id:      selectedProduct.id,
        amount_inserted: insertedAmount,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      showPopup(data);
      resetMachine();
      await loadProducts();
    } else {
      setStatus(data.error || 'Purchase failed.', 'error');
      btnPurchase.disabled = false;
    }
  });

  // ── Cancel ─────────────────────────────────────────────────────────────────
  btnCancel.addEventListener('click', () => {
    if (insertedAmount > 0) {
      setStatus(`RM ${insertedAmount.toFixed(2)} returned.`, 'success');
    }
    resetMachine();
  });

  function resetMachine() {
    selectedProduct  = null;
    insertedAmount   = 0;
    screenProduct.textContent  = '— Select item —';
    screenPrice.textContent    = 'RM 0.00';
    screenInserted.textContent = 'RM 0.00';
    screenChange.textContent   = 'RM 0.00';
    btnPurchase.disabled       = true;
    renderGrid();
  }

  // ── Popup ──────────────────────────────────────────────────────────────────
  function showPopup(data) {
    document.getElementById('popupEmoji').textContent   = selectedProduct?.emoji || '🎉';
    document.getElementById('popupProduct').textContent = data.product_name;
    document.getElementById('popupChange').textContent  =
      data.change > 0 ? `Change: RM ${data.change.toFixed(2)}` : 'Exact amount — no change';

    const fill = document.getElementById('popupBarFill');
    fill.style.width = '0%';
    popupOverlay.classList.add('show');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => { fill.style.width = '100%'; });
    });

    setTimeout(() => popupOverlay.classList.remove('show'), 2400);
  }

  popupOverlay.addEventListener('click', () => popupOverlay.classList.remove('show'));

  // ── Helpers ────────────────────────────────────────────────────────────────
  function setStatus(msg, type = '') {
    statusMsg.textContent = msg;
    statusMsg.className   = 'status-msg ' + type;
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  loadProducts();
}


/* ────────────────────────────────────────────────────────────────────────────
   ADMIN DASHBOARD
   ──────────────────────────────────────────────────────────────────────────── */
function initAdmin() {
  const PASS = 'admin123';

  // ── Auth Gate ──────────────────────────────────────────────────────────────
  const authOverlay = document.getElementById('authOverlay');
  const authInput   = document.getElementById('authInput');
  const authBtn     = document.getElementById('authBtn');
  const authError   = document.getElementById('authError');
  const adminWrap   = document.getElementById('adminWrap');

  function tryUnlock() {
    if (authInput.value === PASS) {
      authOverlay.style.display = 'none';
      adminWrap.style.display   = 'block';
      loadAll();
    } else {
      authError.textContent = 'Incorrect password.';
      authInput.value       = '';
      authInput.focus();
    }
  }

  authBtn.addEventListener('click', tryUnlock);
  authInput.addEventListener('keydown', e => { if (e.key === 'Enter') tryUnlock(); });

  document.getElementById('btnLogout').addEventListener('click', () => {
    adminWrap.style.display   = 'none';
    authOverlay.style.display = 'flex';
    authInput.value           = '';
    authError.textContent     = '';
  });

  // ── Data Loading ───────────────────────────────────────────────────────────
  async function loadAll() {
    await Promise.all([loadProducts(), loadTransactions()]);
  }

  let allProducts = [];

  async function loadProducts() {
    const res = await fetch('/api/products');
    allProducts = await res.json();
    renderProductsTable();
    populateRestockSelect();
    updateStats();
  }

  async function loadTransactions() {
    const res = await fetch('/api/transactions');
    const txs = await res.json();
    renderTransactionsTable(txs);
    updateStatsTx(txs);
  }

  // ── Stats ──────────────────────────────────────────────────────────────────
  function updateStats() {
    document.getElementById('statProducts').textContent = allProducts.length;
    const low = allProducts.filter(p => p.stock <= 5).length;
    document.getElementById('statLowStock').textContent = low;
  }

  function updateStatsTx(txs) {
    const revenue = txs.reduce((s, t) => s + t.price_paid, 0);
    document.getElementById('statRevenue').textContent      = `RM ${revenue.toFixed(2)}`;
    document.getElementById('statTransactions').textContent = txs.length;
  }

  // ── Products Table ─────────────────────────────────────────────────────────
  function renderProductsTable() {
    const tbody = document.getElementById('productsBody');
    tbody.innerHTML = '';
    allProducts.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.id}</td>
        <td style="font-size:1.3rem">${p.emoji}</td>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td class="neon-yellow">RM ${p.price.toFixed(2)}</td>
        <td class="${p.stock <= 5 ? 'stock-low' : 'stock-ok'}">${p.stock}</td>
        <td>
          <button class="tbl-btn tbl-btn-edit"   data-id="${p.id}">Edit</button>
          <button class="tbl-btn tbl-btn-delete" data-id="${p.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.tbl-btn-edit').forEach(btn => {
      btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll('.tbl-btn-delete').forEach(btn => {
      btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.id)));
    });
  }

  // ── Transactions Table ─────────────────────────────────────────────────────
  function renderTransactionsTable(txs) {
    const tbody = document.getElementById('txBody');
    tbody.innerHTML = '';
    if (txs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-dim)">No transactions yet.</td></tr>';
      return;
    }
    txs.forEach(t => {
      const tr = document.createElement('tr');
      const dt = new Date(t.timestamp + 'Z');
      tr.innerHTML = `
        <td>${t.id}</td>
        <td>${t.product_name}</td>
        <td class="neon-yellow">RM ${t.price_paid.toFixed(2)}</td>
        <td>RM ${t.change_given.toFixed(2)}</td>
        <td style="color:var(--text-dim);font-size:0.78rem">${dt.toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ── Restock Select ─────────────────────────────────────────────────────────
  function populateRestockSelect() {
    const sel = document.getElementById('restockSelect');
    sel.innerHTML = allProducts.map(p =>
      `<option value="${p.id}">${p.emoji} ${p.name} (${p.stock})</option>`
    ).join('');
  }

  // ── Add Product Form ───────────────────────────────────────────────────────
  document.getElementById('addProductForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd  = new FormData(e.target);
    const msg = document.getElementById('addMsg');

    const res = await fetch('/api/product', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:     fd.get('name'),
        emoji:    fd.get('emoji'),
        category: fd.get('category'),
        price:    parseFloat(fd.get('price')),
        stock:    parseInt(fd.get('stock')),
      }),
    });

    if (res.ok) {
      showFormMsg(msg, 'Product added!', true);
      e.target.reset();
      await loadProducts();
    } else {
      const d = await res.json();
      showFormMsg(msg, d.error || 'Error', false);
    }
  });

  // ── Restock Form ───────────────────────────────────────────────────────────
  document.getElementById('restockForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd  = new FormData(e.target);
    const msg = document.getElementById('restockMsg');

    const res = await fetch('/api/restock', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: parseInt(fd.get('product_id')),
        quantity:   parseInt(fd.get('quantity')),
      }),
    });

    if (res.ok) {
      showFormMsg(msg, 'Restocked!', true);
      e.target.reset();
      await loadProducts();
    } else {
      showFormMsg(msg, 'Error', false);
    }
  });

  // ── Edit Modal ─────────────────────────────────────────────────────────────
  const editOverlay = document.getElementById('editOverlay');

  function openEditModal(id) {
    const p = allProducts.find(x => x.id === id);
    if (!p) return;
    document.getElementById('editId').value       = p.id;
    document.getElementById('editName').value     = p.name;
    document.getElementById('editEmoji').value    = p.emoji;
    document.getElementById('editCategory').value = p.category;
    document.getElementById('editPrice').value    = p.price;
    document.getElementById('editStock').value    = p.stock;
    document.getElementById('editMsg').textContent = '';
    editOverlay.style.display = 'flex';
  }

  document.getElementById('closeEditModal').addEventListener('click', () => {
    editOverlay.style.display = 'none';
  });

  editOverlay.addEventListener('click', e => {
    if (e.target === editOverlay) editOverlay.style.display = 'none';
  });

  document.getElementById('editForm').addEventListener('submit', async e => {
    e.preventDefault();
    const id  = parseInt(document.getElementById('editId').value);
    const msg = document.getElementById('editMsg');

    const res = await fetch(`/api/product/${id}`, {
      method:  'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:     document.getElementById('editName').value,
        emoji:    document.getElementById('editEmoji').value,
        category: document.getElementById('editCategory').value,
        price:    parseFloat(document.getElementById('editPrice').value),
        stock:    parseInt(document.getElementById('editStock').value),
      }),
    });

    if (res.ok) {
      showFormMsg(msg, 'Saved!', true);
      await loadProducts();
      setTimeout(() => { editOverlay.style.display = 'none'; }, 800);
    } else {
      showFormMsg(msg, 'Save failed.', false);
    }
  });

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function deleteProduct(id) {
    const p = allProducts.find(x => x.id === id);
    if (!confirm(`Delete "${p?.name}"?`)) return;
    await fetch(`/api/product/${id}`, { method: 'DELETE' });
    await loadProducts();
  }

  // ── Helper ─────────────────────────────────────────────────────────────────
  function showFormMsg(el, text, ok) {
    el.textContent = text;
    el.className   = 'form-msg ' + (ok ? 'ok' : 'err');
    setTimeout(() => { el.textContent = ''; el.className = 'form-msg'; }, 3000);
  }
}
