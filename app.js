import { RESTAURANT_INFO, CATEGORIES, MENU_ITEMS } from './menuData.js';

// Application State
const state = {
  tableNumber: 'Table 1',
  orderType: 'dine_in',
  selectedFilter: 'all', // 'all' | 'veg' | 'nonveg'
  selectedCategoryId: 'all',
  searchQuery: '',
  cart: [],
  customizingItem: null,
  customSelectedPrep: '',
  customSelectedVariant: null,
  customQuantity: 1,
};

// 1. Detect Table parameter from URL query or hash silently (without showing in header)
function initTableDetection() {
  const urlParams = new URLSearchParams(window.location.search);
  let tbl = urlParams.get('table');

  if (!tbl && window.location.hash.includes('table=')) {
    const match = window.location.hash.match(/table=([^&]+)/);
    if (match && match[1]) tbl = decodeURIComponent(match[1]);
  }

  if (tbl) {
    state.tableNumber = tbl.toLowerCase().startsWith('table') ? tbl : `Table ${tbl}`;
    sessionStorage.setItem('moms_kitchen_table', state.tableNumber);
  } else {
    const saved = sessionStorage.getItem('moms_kitchen_table');
    if (saved) state.tableNumber = saved;
  }
}

// 2. Audio Chime feedback on add
function playAddChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) {
    // AudioContext not allowed before user interaction
  }
}

// 3. Render Category Navigation
function renderCategories() {
  const scrollContainer = document.getElementById('categoryScroll');
  if (!scrollContainer) return;

  scrollContainer.innerHTML = CATEGORIES.map((cat) => {
    const isActive = state.selectedCategoryId === cat.id;
    return `
      <button class="category-chip ${isActive ? 'active' : ''}" data-cat="${cat.id}">
        <span>${cat.emoji}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');

  scrollContainer.querySelectorAll('.category-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.selectedCategoryId = btn.getAttribute('data-cat');
      renderCategories();
      renderMenu();
    });
  });
}

// 4. Filter Menu Items
function getFilteredItems() {
  return MENU_ITEMS.filter((item) => {
    // Category filter
    if (state.selectedCategoryId !== 'all' && item.categoryId !== state.selectedCategoryId) {
      return false;
    }
    // Diet filter
    if (state.selectedFilter === 'veg' && !item.isVeg) return false;
    if (state.selectedFilter === 'nonveg' && item.isVeg) return false;

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const catName = (CATEGORIES.find((c) => c.id === item.categoryId)?.name || '').toLowerCase();
      return matchName || matchDesc || catName.includes(q);
    }
    return true;
  });
}

// 5. Render Menu Items
function renderMenu() {
  const container = document.getElementById('menuContainer');
  const emptyState = document.getElementById('emptyState');
  if (!container) return;

  const filtered = getFilteredItems();

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Group by category if 'all' is selected and no search
  if (state.selectedCategoryId === 'all' && !state.searchQuery.trim()) {
    const groups = [];
    CATEGORIES.filter((c) => c.id !== 'all').forEach((cat) => {
      const itemsInCat = filtered.filter((i) => i.categoryId === cat.id);
      if (itemsInCat.length > 0) {
        groups.push({ category: cat, items: itemsInCat });
      }
    });

    container.innerHTML = groups.map((grp) => `
      <section class="menu-section" id="sec-${grp.category.id}">
        <div class="section-title-bar">
          <span class="section-emoji">${grp.category.emoji}</span>
          <h2 class="section-title">${grp.category.name}</h2>
          <span class="section-count">${grp.items.length}</span>
        </div>
        <div class="dishes-list">
          ${grp.items.map(renderDishCard).join('')}
        </div>
      </section>
    `).join('');
  } else {
    // Flat list
    container.innerHTML = `
      <div class="dishes-list">
        ${filtered.map(renderDishCard).join('')}
      </div>
    `;
  }

  attachDishCardListeners();
}

// Render individual dish card HTML
function renderDishCard(item) {
  const hasCustom = (item.variants && item.variants.length > 0) || (item.prepTypeOptions && item.prepTypeOptions.length > 0);
  const totalInCart = state.cart.filter((ci) => ci.item.id === item.id).reduce((s, ci) => s + ci.qty, 0);
  const simpleCartItem = state.cart.find((ci) => ci.item.id === item.id && !ci.variant && !ci.prepType);

  let actionBtnHtml = '';
  if (!hasCustom && simpleCartItem) {
    actionBtnHtml = `
      <div class="stepper" data-card-id="${simpleCartItem.id}">
        <button class="step-btn step-minus" data-id="${simpleCartItem.id}">−</button>
        <span class="step-qty">${simpleCartItem.qty}</span>
        <button class="step-btn step-plus" data-id="${simpleCartItem.id}">+</button>
      </div>
    `;
  } else {
    const btnText = hasCustom && totalInCart > 0 ? `${totalInCart} in Cart +` : 'ADD +';
    actionBtnHtml = `
      <button class="add-btn ${hasCustom && totalInCart > 0 ? 'has-items' : ''}" data-item-id="${item.id}">
        ${btnText}
      </button>
      ${hasCustom ? '<span class="customise-hint">Customisable</span>' : ''}
    `;
  }

  return `
    <article class="dish-card" id="dish-${item.id}">
      <div class="dish-info">
        <div class="dish-tags">
          <div class="diet-box ${item.isVeg ? 'veg' : 'nonveg'}">
            <span class="diet-dot"></span>
          </div>
          ${item.isPopular ? '<span class="popular-tag">MUST TRY</span>' : ''}
          ${hasCustom ? '<span class="custom-tag">Customisable</span>' : ''}
        </div>
        <h3 class="dish-name">${item.name}</h3>
        <div class="dish-price-row">
          <span class="dish-price">₹${item.basePrice}</span>
          ${hasCustom ? '<span class="price-suffix">onwards</span>' : ''}
        </div>
        ${item.description ? `<p class="dish-desc">${item.description}</p>` : ''}
      </div>

      <div class="dish-action">
        <div class="dish-thumb">
          <img 
            src="${item.imageUrl || 'assets/logo.png'}" 
            alt="${item.name}" 
            class="dish-thumb-img" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='assets/logo.png';" 
          />
        </div>
        ${actionBtnHtml}
      </div>
    </article>
  `;
}

// 6. Attach Card Interaction Listeners
function attachDishCardListeners() {
  document.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-item-id');
      const item = MENU_ITEMS.find((m) => m.id === itemId);
      if (!item) return;

      const hasCustom = (item.variants && item.variants.length > 0) || (item.prepTypeOptions && item.prepTypeOptions.length > 0);
      if (hasCustom) {
        openCustomizer(item);
      } else {
        addToCart(item);
        playAddChime();
        renderMenu();
        updateCartUI();
      }
    });
  });

  document.querySelectorAll('.step-minus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      updateCartQty(id, -1);
      renderMenu();
      updateCartUI();
    });
  });

  document.querySelectorAll('.step-plus').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      updateCartQty(id, 1);
      playAddChime();
      renderMenu();
      updateCartUI();
    });
  });
}

// 7. Customizer Modal
function openCustomizer(item) {
  state.customizingItem = item;
  state.customQuantity = 1;
  state.customSelectedPrep = item.prepTypeOptions && item.prepTypeOptions.length > 0 ? item.prepTypeOptions[0] : '';
  state.customSelectedVariant = item.variants && item.variants.length > 0 ? item.variants[0] : null;

  const modal = document.getElementById('customizerModal');
  const nameEl = document.getElementById('customItemName');
  const dietEl = document.getElementById('customItemDiet');
  const prepSection = document.getElementById('prepTypeSection');
  const prepOptions = document.getElementById('prepTypeOptions');
  const varSection = document.getElementById('variantsSection');
  const varLabel = document.getElementById('variantSectionLabel');
  const varOptions = document.getElementById('variantOptions');
  const noteInput = document.getElementById('customItemNote');
  const qtyVal = document.getElementById('customQtyVal');

  if (noteInput) noteInput.value = '';
  if (qtyVal) qtyVal.textContent = '1';

  nameEl.textContent = item.name;
  dietEl.className = `diet-box ${item.isVeg ? 'veg' : 'nonveg'}`;
  dietEl.innerHTML = '<span class="diet-dot"></span>';

  // Base options (Fried Rice vs Noodles)
  if (item.prepTypeOptions && item.prepTypeOptions.length > 0) {
    prepSection.style.display = 'block';
    prepOptions.innerHTML = item.prepTypeOptions.map((opt) => `
      <button class="choice-pill ${state.customSelectedPrep === opt ? 'active' : ''}" data-prep="${opt}">
        ${opt}
      </button>
    `).join('');

    prepOptions.querySelectorAll('.choice-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        state.customSelectedPrep = pill.getAttribute('data-prep');
        prepOptions.querySelectorAll('.choice-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        updateCustomizerTotal();
      });
    });
  } else {
    prepSection.style.display = 'none';
  }

  // Variants options (Flavors / Styles)
  if (item.variants && item.variants.length > 0) {
    varSection.style.display = 'block';
    varLabel.textContent = item.prepTypeOptions ? '2. Select Style / Flavor' : 'Choose Variation';
    varOptions.innerHTML = item.variants.map((v) => `
      <div class="variant-row ${state.customSelectedVariant?.id === v.id ? 'active' : ''}" data-var-id="${v.id}">
        <div class="variant-left">
          <span class="radio-indicator"></span>
          <span class="variant-name">${v.name}</span>
        </div>
        <span class="variant-price">₹${v.price}</span>
      </div>
    `).join('');

    varOptions.querySelectorAll('.variant-row').forEach((row) => {
      row.addEventListener('click', () => {
        const vid = row.getAttribute('data-var-id');
        state.customSelectedVariant = item.variants.find((v) => v.id === vid);
        varOptions.querySelectorAll('.variant-row').forEach((r) => r.classList.remove('active'));
        row.classList.add('active');
        updateCustomizerTotal();
      });
    });
  } else {
    varSection.style.display = 'none';
  }

  updateCustomizerTotal();
  modal.style.display = 'flex';
}

function updateCustomizerTotal() {
  const priceEl = document.getElementById('customTotalPrice');
  if (!priceEl || !state.customizingItem) return;

  const unitPrice = state.customSelectedVariant ? state.customSelectedVariant.price : state.customizingItem.basePrice;
  const total = unitPrice * state.customQuantity;
  priceEl.textContent = `₹${total}`;
}

// 8. Cart Operations
function addToCart(item, prepType, variant, note) {
  const key = `${item.id}_${prepType || 'def'}_${variant?.id || 'none'}`;
  const price = variant ? variant.price : item.basePrice;

  const existing = state.cart.find((ci) => ci.id === key);
  if (existing) {
    existing.qty += state.customQuantity || 1;
    if (note) existing.note = note;
  } else {
    state.cart.push({
      id: key,
      item,
      prepType,
      variant,
      unitPrice: price,
      qty: state.customQuantity || 1,
      note: note || '',
    });
  }
}

function updateCartQty(cartItemId, delta) {
  const idx = state.cart.findIndex((ci) => ci.id === cartItemId);
  if (idx > -1) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
  }
}

function updateCartUI() {
  const totalCount = state.cart.reduce((s, ci) => s + ci.qty, 0);
  const totalAmount = state.cart.reduce((s, ci) => s + ci.unitPrice * ci.qty, 0);

  const bar = document.getElementById('floatingCartBar');
  const countBadge = document.getElementById('cartCountBadge');
  const barTotal = document.getElementById('cartBarTotal');
  const drawerTotal = document.getElementById('cartDrawerTotal');
  const billSubtotal = document.getElementById('billSubtotal');
  const billGrandTotal = document.getElementById('billGrandTotal');
  const cartSubtitle = document.getElementById('cartSubtitle');

  if (countBadge) countBadge.textContent = totalCount;
  if (barTotal) barTotal.textContent = `₹${totalAmount}`;
  if (drawerTotal) drawerTotal.textContent = `₹${totalAmount}`;
  if (billSubtotal) billSubtotal.textContent = `₹${totalAmount}`;
  if (billGrandTotal) billGrandTotal.textContent = `₹${totalAmount}`;
  if (cartSubtitle) cartSubtitle.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'} from The Mom's Kitchen`;

  if (bar) {
    bar.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  renderCartDrawerItems();
}

function renderCartDrawerItems() {
  const listEl = document.getElementById('cartItemsList');
  if (!listEl) return;

  if (state.cart.length === 0) {
    listEl.innerHTML = '<p style="color: #9ca3af; font-size: 13px; text-align: center; padding: 20px 0;">Your cart is empty.</p>';
    return;
  }

  listEl.innerHTML = state.cart.map((ci) => {
    let displayName = ci.item.name;
    if (ci.prepType) displayName = displayName.replace('Fried Rice / Noodles', ci.prepType);

    return `
      <div class="cart-item-row">
        <div class="cart-item-details">
          <div class="cart-item-title">${displayName}</div>
          ${ci.variant ? `<div class="cart-item-var">${ci.variant.name}</div>` : ''}
          ${ci.note ? `<div class="cart-item-note">📝 ${ci.note}</div>` : ''}
          <div class="cart-item-math">₹${ci.unitPrice} × ${ci.qty} = ₹${ci.unitPrice * ci.qty}</div>
        </div>
        <div class="stepper">
          <button class="step-btn drawer-minus" data-id="${ci.id}">−</button>
          <span class="step-qty">${ci.qty}</span>
          <button class="step-btn drawer-plus" data-id="${ci.id}">+</button>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.drawer-minus').forEach((b) => {
    b.addEventListener('click', () => {
      updateCartQty(b.getAttribute('data-id'), -1);
      renderMenu();
      updateCartUI();
    });
  });

  listEl.querySelectorAll('.drawer-plus').forEach((b) => {
    b.addEventListener('click', () => {
      updateCartQty(b.getAttribute('data-id'), 1);
      playAddChime();
      renderMenu();
      updateCartUI();
    });
  });
}

// 9. Send Order via WhatsApp (Preserves Table 1, Table 2, etc.)
function sendOrderToWhatsApp() {
  if (state.cart.length === 0) return;

  const nameInput = document.getElementById('custNameInput');
  const phoneInput = document.getElementById('custPhoneInput');
  const notesInput = document.getElementById('orderSpecialNotes');

  const customerName = nameInput ? nameInput.value.trim() : '';
  const customerPhone = phoneInput ? phoneInput.value.trim() : '';
  const specialNotes = notesInput ? notesInput.value.trim() : '';

  const totalAmount = state.cart.reduce((s, ci) => s + ci.unitPrice * ci.qty, 0);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  let msg = `🍽️ *NEW ORDER - ${RESTAURANT_INFO.name}*\n`;
  msg += `📍 *Service:* Dine-in (${state.tableNumber})\n`;
  if (customerName) {
    msg += `👤 *Customer:* ${customerName}${customerPhone ? ` (${customerPhone})` : ''}\n`;
  }
  msg += `🕒 *Time:* ${dateStr}, ${timeStr}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🛒 *ORDER ITEMS:*\n\n`;

  state.cart.forEach((ci, idx) => {
    let displayName = ci.item.name;
    if (ci.prepType) displayName = displayName.replace('Fried Rice / Noodles', ci.prepType);
    if (ci.variant) displayName += ` [${ci.variant.name}]`;
    const sub = ci.unitPrice * ci.qty;
    msg += `${idx + 1}. *${displayName}*\n`;
    msg += `   ₹${ci.unitPrice} × ${ci.qty} = *₹${sub}*\n`;
    if (ci.note) msg += `   ↪ _Note: ${ci.note}_\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL BILL:* *₹${totalAmount}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;

  if (specialNotes) {
    msg += `📝 *Kitchen Note:* ${specialNotes}\n\n`;
  }

  msg += `📍 *The Mom's Kitchen*\n`;
  msg += `_506, Villarasampatti Rd, opp. Velalar Engg College, Erode_\n`;
  msg += `🙏 *Thank you for your order!*`;

  const waUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;

  // Populate Success Receipt
  populateSuccessReceipt(dateStr, timeStr, totalAmount, specialNotes);

  // Close Cart Modal and Open WhatsApp
  document.getElementById('cartModal').style.display = 'none';
  window.open(waUrl, '_blank');

  // Show Success Modal
  document.getElementById('successModal').style.display = 'flex';
}

function populateSuccessReceipt(dateStr, timeStr, totalAmount, specialNotes) {
  const receiptBox = document.getElementById('receiptBox');
  if (!receiptBox) return;

  receiptBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; color: #f59e0b;">
      <span>${state.tableNumber}</span>
      <span style="font-size: 11px; color: #9ca3af;">${dateStr}, ${timeStr}</span>
    </div>
    ${state.cart.map((ci) => `
      <div class="receipt-item-line">
        <span>${ci.qty}x ${ci.item.name} ${ci.variant ? `(${ci.variant.name})` : ''}</span>
        <span>₹${ci.unitPrice * ci.qty}</span>
      </div>
    `).join('')}
    ${specialNotes ? `<div style="font-size: 11px; color: #9ca3af; margin-top: 6px;">Note: ${specialNotes}</div>` : ''}
    <div class="receipt-total-line">
      <span>Total Bill</span>
      <span>₹${totalAmount}</span>
    </div>
  `;
}

// 10. Setup DOM Event Listeners
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      renderMenu();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      state.searchQuery = '';
      if (searchInput) searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      renderMenu();
    });
  }

  // Filter Tabs (All, Pure Veg, Non-Veg)
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      state.selectedFilter = tab.getAttribute('data-filter');
      renderMenu();
    });
  });

  // Customizer Modal Actions
  const closeCustBtn = document.getElementById('closeCustomizerBtn');
  const customModal = document.getElementById('customizerModal');
  const minusBtn = document.getElementById('customQtyMinus');
  const plusBtn = document.getElementById('customQtyPlus');
  const qtyVal = document.getElementById('customQtyVal');
  const addCustomBtn = document.getElementById('addCustomToCartBtn');

  if (closeCustBtn) closeCustBtn.addEventListener('click', () => customModal.style.display = 'none');
  if (customModal) {
    customModal.addEventListener('click', (e) => {
      if (e.target === customModal) customModal.style.display = 'none';
    });
  }

  if (minusBtn) {
    minusBtn.addEventListener('click', () => {
      state.customQuantity = Math.max(1, state.customQuantity - 1);
      if (qtyVal) qtyVal.textContent = state.customQuantity;
      updateCustomizerTotal();
    });
  }

  if (plusBtn) {
    plusBtn.addEventListener('click', () => {
      state.customQuantity += 1;
      if (qtyVal) qtyVal.textContent = state.customQuantity;
      updateCustomizerTotal();
    });
  }

  if (addCustomBtn) {
    addCustomBtn.addEventListener('click', () => {
      if (!state.customizingItem) return;
      const noteInput = document.getElementById('customItemNote');
      const note = noteInput ? noteInput.value.trim() : '';
      addToCart(state.customizingItem, state.customSelectedPrep, state.customSelectedVariant, note);
      playAddChime();
      customModal.style.display = 'none';
      renderMenu();
      updateCartUI();
    });
  }

  // Cart Drawer Actions
  const openCartBtn = document.getElementById('openCartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartModal = document.getElementById('cartModal');
  const clearCartBtn = document.getElementById('clearCartBtn');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

  if (openCartBtn) openCartBtn.addEventListener('click', () => cartModal.style.display = 'flex');
  if (closeCartBtn) closeCartBtn.addEventListener('click', () => cartModal.style.display = 'none');
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) cartModal.style.display = 'none';
    });
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      state.cart = [];
      cartModal.style.display = 'none';
      renderMenu();
      updateCartUI();
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', sendOrderToWhatsApp);
  }

  // Success Modal Actions
  const successModal = document.getElementById('successModal');
  const successDoneBtn = document.getElementById('successDoneBtn');
  if (successDoneBtn) {
    successDoneBtn.addEventListener('click', () => {
      state.cart = [];
      updateCartUI();
      renderMenu();
      successModal.style.display = 'none';
    });
  }
}

// 11. App Boot
document.addEventListener('DOMContentLoaded', () => {
  initTableDetection();
  renderCategories();
  renderMenu();
  setupEventListeners();
});
