const shelves = [
  { name: 'Fiction', icon: '✦', subs: ['Literary Fiction', 'Mystery & Thriller', 'Romance', 'Fantasy', 'Science Fiction', 'Historical Fiction', 'Contemporary'] },
  { name: 'Non-Fiction', icon: '◉', subs: ['Biography & Memoir', 'Self-Help', 'Business', 'History', 'Psychology', 'Science & Nature', 'Travel'] },
  { name: 'Teen', icon: '✳', subs: ['Young Adult Fiction', 'Coming of Age', 'Teen Romance', 'Fantasy & Sci-Fi', 'Mystery', 'Graphic Novels', 'School Stories'] },
  { name: 'Kids', icon: '✿', subs: ['Picture Books', 'Early Readers', 'Middle Grade', 'Bedtime Stories', 'Learning & Activity', 'Fairy Tales', 'Comics for Kids'] },
  { name: 'Exam', icon: '⌑', subs: ['UPSC & Civil Services', 'SSC & Banking', 'School & Boards', 'JEE', 'NEET', 'CAT & MBA', 'Government Jobs'] },
  { name: 'Medical Exam', icon: '✚', subs: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'NEET PG', 'Clinical Medicine', 'Nursing'] },
  { name: 'Manga', icon: '▤', subs: ['Action & Adventure', 'Fantasy', 'Romance', 'Slice of Life', 'Shonen', 'Shojo', 'Graphic Novels'] },
  { name: 'Award Winner', icon: '✧', subs: ['Booker Prize', 'Pulitzer Prize', 'Nobel Prize', 'National Book Award', 'Hugo Award', 'Women’s Prize', 'Readers’ Choice'] }
];

const coverShelf = [
  { title: 'The Silent Patient', author: 'Alex Michaelides', isbn: '9781250301697', price: 499, oldPrice: 699, rating: '4.8', tag: 'Reader favorite', note: 'A shocking psychological thriller with a mystery that stays with you.' },
  { title: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292', price: 549, oldPrice: 799, rating: '4.9', tag: 'Bestseller', note: 'A practical, approachable guide to building better habits every day.' },
  { title: 'Educated', author: 'Tara Westover', isbn: '9780399590504', price: 479, oldPrice: 699, rating: '4.7', tag: 'Award winner', note: 'A powerful memoir about family, self-invention, and the pursuit of knowledge.' },
  { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', price: 599, oldPrice: 899, rating: '4.8', tag: 'Modern classic', note: 'An epic journey across a desert world filled with politics and prophecy.' },
  { title: 'Harry Potter and the Sorcerer’s Stone', author: 'J. K. Rowling', isbn: '9780590353427', price: 399, oldPrice: 599, rating: '4.9', tag: 'Beloved classic', note: 'A first step into a magical world of friendship, courage, and discovery.' },
  { title: 'The Hobbit', author: 'J. R. R. Tolkien', isbn: '9780547928227', price: 449, oldPrice: 649, rating: '4.8', tag: 'Adventure awaits', note: 'A cozy, unforgettable adventure that begins with an unexpected visitor.' },
  { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', price: 579, oldPrice: 899, rating: '4.7', tag: 'Curious minds', note: 'A sweeping look at the story of humankind and the ideas that shaped us.' },
  { title: 'Becoming', author: 'Michelle Obama', isbn: '9781524763138', price: 649, oldPrice: 999, rating: '4.8', tag: 'Inspiring read', note: 'An intimate, thoughtful memoir about identity, work, family, and possibility.' },
  { title: 'The Fault in Our Stars', author: 'John Green', isbn: '9780142424179', price: 349, oldPrice: 499, rating: '4.6', tag: 'Young adult', note: 'A tender, funny story about first love and finding meaning in hard moments.' },
  { title: 'They Both Die at the End', author: 'Adam Silvera', isbn: '9780062457806', price: 399, oldPrice: 599, rating: '4.6', tag: 'A moving read', note: 'Two strangers set out to make one last day count.' },
  { title: 'Gray’s Anatomy for Students', author: 'Richard Drake et al.', isbn: '9780702077050', price: 2499, oldPrice: 3299, rating: '4.9', tag: 'Study essential', note: 'A richly illustrated guide to anatomy, built for medical students.' },
  { title: 'Naruto, Vol. 1', author: 'Masashi Kishimoto', isbn: '9781569319000', price: 499, oldPrice: 699, rating: '4.8', tag: 'Manga favorite', note: 'Meet Naruto Uzumaki in the beginning of this much-loved ninja adventure.' }
];

const shelfMap = {
  'Fiction': [0, 3, 4, 5, 8, 9, 11],
  'Non-Fiction': [1, 2, 6, 7, 10, 0, 4],
  'Teen': [8, 9, 4, 3, 11, 5, 0],
  'Kids': [4, 5, 11, 8, 3, 2, 9],
  'Exam': [10, 6, 1, 7, 2, 3, 0],
  'Medical Exam': [10, 6, 1, 2, 7, 3, 0],
  'Manga': [11, 4, 3, 8, 5, 9, 0],
  'Award Winner': [2, 7, 6, 1, 3, 8, 5]
};
const books = [];
shelves.forEach((shelf) => shelfMap[shelf.name].forEach((index, order) => {
  const source = coverShelf[index];
  books.push({ ...source, id: `${shelf.name.toLowerCase().replace(/[^a-z]+/g, '-')}-${index}-${order}`, category: shelf.name, subcategory: shelf.subs[order % shelf.subs.length] });
}));

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`;
const cover = (book, size = 'L') => `https://covers.openlibrary.org/b/isbn/${encodeURIComponent(book.isbn)}-${size}.jpg?default=false`;
const bookUrl = (book) => `book.html?id=${encodeURIComponent(book.id)}`;
const catalogUrl = (category) => `catalog.html?category=${encodeURIComponent(category)}`;
const readStore = (key) => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const readObject = (key, fallback = {}) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };

function updateCounts() {
  document.querySelectorAll('[data-cart-count]').forEach((node) => node.textContent = readStore('obs-cart').reduce((sum, entry) => sum + entry.qty, 0));
  document.querySelectorAll('[data-wishlist-count]').forEach((node) => node.textContent = readStore('obs-wishlist').length);
}
function currentDemoUser() { return readObject('obs-profile', {}); }
function currentDemoOrders() { return readStore('obs-orders'); }
function canCancelDemoOrder(order) { return !!order && /processing|pending|confirmed|preparing|packed/i.test(order.status || ''); }
function cancelDemoOrder(orderId) {
  const orders=currentDemoOrders(); const order=orders.find((item)=>item.id===orderId);
  if(!canCancelDemoOrder(order)) return false;
  order.status='Cancelled'; order.cancelledAt=new Date().toISOString(); writeStore('obs-orders',orders); return true;
}
function commitDemoOrder() {
  const cart = readStore('obs-cart');
  const items = cart.map((entry) => { const book = books.find((item) => item.id === entry.id); return book ? { id: book.id, title: book.title, author: book.author, isbn: book.isbn, category: book.category, price: book.price, oldPrice: book.oldPrice, qty: entry.qty } : null; }).filter(Boolean);
  if (!items.length) { toast('Your cart is empty. Add a book before checkout.'); return; }
  const user = currentDemoUser();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0); const shipping = subtotal >= 999 ? 0 : 79; const savings = items.reduce((sum, item) => sum + (item.oldPrice - item.price) * item.qty, 0);
  const order = { id: `OBS-${Date.now().toString().slice(-8)}`, date: new Date().toISOString(), status: 'Processing', email: user.email || '', deliveryAddress: [user.address,user.city,user.postal].filter(Boolean).join(', '), items, subtotal, shipping, savings, total: subtotal + shipping };
  const orders = currentDemoOrders(); orders.unshift(order); writeStore('obs-orders', orders); writeStore('obs-cart', []); updateCounts();
  toast(`Demo order ${order.id} placed. Find it under Track Order.`); renderUtility();
}
let toastTimer;
function toast(message) {
  const node = document.getElementById('toast');
  if (!node) return;
  node.textContent = message; node.classList.add('show'); clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove('show'), 2600);
}
function addCart(id, qty = 1) {
  const item = books.find((book) => book.id === id); if (!item) return;
  const cart = readStore('obs-cart'); const found = cart.find((entry) => entry.id === id);
  if (found) found.qty += qty; else cart.push({ id, qty });
  writeStore('obs-cart', cart); updateCounts(); toast(`${item.title} added to your cart`);
}
function toggleWishlist(id) {
  const item = books.find((book) => book.id === id); if (!item) return;
  const wishlist = readStore('obs-wishlist'); const index = wishlist.indexOf(id);
  if (index >= 0) { wishlist.splice(index, 1); toast('Removed from your wishlist'); }
  else { wishlist.push(id); toast(`${item.title} saved to your wishlist`); }
  writeStore('obs-wishlist', wishlist); updateCounts();
  document.querySelectorAll(`[data-wishlist="${CSS.escape(id)}"]`).forEach((button) => {
    const active = wishlist.includes(id); button.classList.toggle('is-saved', active); button.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
  });
}

function cardMarkup(book) {
  const saved = readStore('obs-wishlist').includes(book.id);
  const discount = Math.max(0, Math.round((1 - book.price / book.oldPrice) * 100));
  return `<article class="book-card"><div class="book-cover-wrap"><a class="book-cover-link" href="${bookUrl(book)}" aria-label="View ${escapeHTML(book.title)}"><img class="book-cover" src="${cover(book)}" alt="${escapeHTML(book.title)} book cover" loading="lazy" onerror="this.onerror=null;this.src='${cover(book, 'M')}'"><span class="cover-glint"></span></a><span class="offer-badge">${discount}%<small>OFF</small></span><span class="book-tag">${escapeHTML(book.tag)}</span><button class="wish-button ${saved ? 'is-saved' : ''}" data-wishlist="${escapeHTML(book.id)}" aria-label="${saved ? 'Remove from' : 'Add to'} wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.8A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.8 2.2Z"/></svg></button></div><div class="book-card-info"><a href="${bookUrl(book)}" class="book-title">${escapeHTML(book.title)}</a><p class="book-author">${escapeHTML(book.author)}</p><div class="book-rating"><span>★★★★★</span><small>${book.rating}</small></div><div class="book-card-bottom"><div class="price"><strong>${money(book.price)}</strong><del>${money(book.oldPrice)}</del></div><button class="add-cart" data-add-cart="${escapeHTML(book.id)}" aria-label="Add ${escapeHTML(book.title)} to cart"><span>+</span> Add</button></div></div></article>`;
}
function wireBookButtons(root = document) {
  root.querySelectorAll('[data-add-cart]').forEach((button) => button.addEventListener('click', () => addCart(button.dataset.addCart)));
  root.querySelectorAll('[data-wishlist]').forEach((button) => button.addEventListener('click', () => toggleWishlist(button.dataset.wishlist)));
}

function renderMegaMenu() {
  const menu = document.getElementById('all-category-menu'); if (!menu) return;
  const menuMarkup = (items, heading, all = false) => `<div class="mega-header"><span>${heading}</span><a href="${catalogUrl(all ? 'All' : items[0].name)}">${all ? 'View all books' : `Explore ${escapeHTML(items[0].name)}`} ↗</a></div><div class="mega-columns ${all ? 'all-shelf-columns' : 'single-shelf-columns'}">${items.map((shelf) => `<div class="mega-column"><a class="mega-title" href="${catalogUrl(shelf.name)}"><i>${shelf.icon}</i>${escapeHTML(shelf.name)}<span>↗</span></a><ul>${shelf.subs.map((sub) => `<li><a href="${catalogUrl(shelf.name)}&sub=${encodeURIComponent(sub)}">${escapeHTML(sub)}</a></li>`).join('')}</ul></div>`).join('')}</div>`;
  menu.innerHTML = menuMarkup(shelves, 'THE WHOLE BOOKSHELF', true);

  document.querySelectorAll('.category-list > a[href*="category="]').forEach((link) => {
    const name = new URL(link.href).searchParams.get('category');
    const shelf = shelves.find((item) => item.name.toLowerCase() === name?.toLowerCase());
    if (!shelf || link.closest('.category-dropdown')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'category-dropdown dropdown-parent';
    link.classList.add('category-nav-link');
    link.setAttribute('aria-haspopup', 'true');
    link.setAttribute('aria-expanded', 'false');
    const caret = document.createElement('span');
    caret.className = 'category-caret';
    caret.setAttribute('aria-hidden', 'true');
    caret.textContent = '⌄';
    link.append(caret);
    link.parentNode.insertBefore(wrapper, link);
    wrapper.append(link);
    const subMenu = document.createElement('div');
    subMenu.className = 'mega-menu category-mega-menu';
    subMenu.id = `menu-${shelf.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    link.setAttribute('aria-controls', subMenu.id);
    subMenu.innerHTML = `<div class="category-menu-heading"><span>${shelf.icon}</span><div><small>EXPLORE THE SHELF</small><strong>${escapeHTML(shelf.name)}</strong></div><a href="${catalogUrl(shelf.name)}">View all books ↗</a></div><div class="category-subcategory-grid">${shelf.subs.map((sub) => `<a href="${catalogUrl(shelf.name)}&sub=${encodeURIComponent(sub)}">${escapeHTML(sub)}<span>↗</span></a>`).join('')}</div>`;
    wrapper.append(subMenu);
  });
}
function initHeader() {
  renderMegaMenu(); updateCounts(); initResponsiveNav(); initAccountMenu();
  document.querySelectorAll('.all-category-trigger, .category-dropdown > a').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      if (window.matchMedia('(max-width: 820px)').matches) {
        const parent = trigger.closest('.dropdown-parent');
        if (!parent.classList.contains('mobile-menu-open')) {
          event.preventDefault();
          document.querySelectorAll('.dropdown-parent.mobile-menu-open').forEach((openMenu) => openMenu.classList.remove('mobile-menu-open'));
          parent.classList.add('mobile-menu-open');
            document.querySelectorAll('.category-nav [aria-haspopup="true"]').forEach((item) => item.setAttribute('aria-expanded', String(item === trigger)));
          } else {
            trigger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle?.addEventListener('click', () => { const open = document.body.classList.toggle('nav-open'); menuToggle.setAttribute('aria-expanded', String(open)); });
  const mobileSearchToggle = document.querySelector('.mobile-search-toggle');
  mobileSearchToggle?.setAttribute('aria-controls','search-form');
  mobileSearchToggle?.addEventListener('click', () => {
    const box = document.querySelector('.search-box'); const open = !box.classList.contains('mobile-open');
    box.classList.toggle('mobile-open',open); mobileSearchToggle.setAttribute('aria-expanded',String(open));
    mobileSearchToggle.setAttribute('aria-label',open?'Close search':'Open search');
    document.querySelector('.site-header')?.classList.toggle('search-open',open);
    if(open) box.querySelector('input')?.focus();
  });
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape'){const box=document.querySelector('.search-box');if(box?.classList.contains('mobile-open')){box.classList.remove('mobile-open');mobileSearchToggle?.setAttribute('aria-expanded','false');mobileSearchToggle?.setAttribute('aria-label','Open search');document.querySelector('.site-header')?.classList.remove('search-open');}}});
  const searchForm = document.getElementById('search-form');
  searchForm?.addEventListener('submit', (event) => { event.preventDefault(); const query = document.getElementById('site-search').value.trim(); if (query) location.href = `catalog.html?category=All&q=${encodeURIComponent(query)}`; });
  document.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.getElementById('site-search')?.focus(); } });
}

function initAccountMenu() {
  if (document.querySelector('.topbar-account')) return;
  const topbar = document.querySelector('.topbar'); const primaryNav = document.querySelector('.primary-nav');
  const authActions = document.querySelector('.nav-auth-actions'); const searchToggle = topbar?.querySelector('.mobile-search-toggle');
  if (!topbar || !primaryNav || !authActions || !searchToggle) return;
  const wrapper = document.createElement('div'); wrapper.className = 'topbar-account';
  wrapper.innerHTML = '<button class="account-menu-toggle" type="button" aria-label="My Account" title="My Account" aria-expanded="false" aria-controls="topbar-account-menu"><svg class="account-menu-person" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5"/></svg><span class="account-menu-label">My Account</span><svg class="account-menu-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><section class="account-menu-panel" id="topbar-account-menu" aria-label="My Account menu" hidden><div class="account-menu-heading"><span class="account-menu-avatar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5"/></svg></span><span><strong>My Account</strong><small>Your reader space</small></span></div><div class="account-menu-links"></div></section>';
  searchToggle.insertAdjacentElement('afterend', wrapper);
  const target = wrapper.querySelector('.account-menu-links');
  const links = [...primaryNav.querySelectorAll('.profile-nav-link,.cart-nav-link,.wishlist-nav-link'), ...authActions.querySelectorAll('a')];
  links.forEach((source) => {
    const link = document.createElement('a'); link.href = source.href;
    const label = source.getAttribute('aria-label') || source.textContent.trim().replace('↗','').trim();
    link.innerHTML = source.querySelector('svg')?.outerHTML || '<span class="account-menu-link-mark">↗</span>';
    const text = document.createElement('span'); text.textContent = label; link.append(text);
    if (source.querySelector('[data-cart-count]')) { const badge=document.createElement('b'); badge.className='count-badge'; badge.setAttribute('data-cart-count',''); badge.textContent=source.querySelector('[data-cart-count]').textContent; link.append(badge); }
    if (source.querySelector('[data-wishlist-count]')) { const badge=document.createElement('b'); badge.className='count-badge'; badge.setAttribute('data-wishlist-count',''); badge.textContent=source.querySelector('[data-wishlist-count]').textContent; link.append(badge); }
    target.append(link);
  });
  const toggle = wrapper.querySelector('.account-menu-toggle'); const panel = wrapper.querySelector('.account-menu-panel');
  const close = () => { toggle.setAttribute('aria-expanded','false'); panel.hidden=true; wrapper.classList.remove('is-open'); topbar.closest('.site-header')?.classList.remove('account-menu-open'); };
  toggle.addEventListener('click', () => { const open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(open)); panel.hidden=!open; wrapper.classList.toggle('is-open',open); topbar.closest('.site-header')?.classList.toggle('account-menu-open',open); });
  document.addEventListener('click',(event)=>{if(!wrapper.contains(event.target))close();});
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape')close();});
}

function initResponsiveNav() {
  if (document.querySelector('.compact-nav')) return;
  const categoryNav = document.querySelector('.category-nav');
  const categoryList = categoryNav?.querySelector('.category-list');
  const primaryNav = document.querySelector('.primary-nav');
  const authActions = categoryNav?.querySelector('.nav-auth-actions');
  if (!categoryNav || !categoryList || !primaryNav || !authActions) return;

  const nav = document.createElement('nav');
  nav.className = 'compact-nav';
  nav.setAttribute('aria-label', 'Tablet and mobile navigation');
  nav.innerHTML = '<div class="compact-nav-bar"><button class="compact-nav-toggle" type="button" aria-expanded="false" aria-controls="compact-nav-panel"><span class="compact-nav-grid" aria-hidden="true">▦</span><span>Browse books</span><span class="compact-nav-chevron" aria-hidden="true">⌄</span></button><div class="compact-nav-actions"></div></div><div class="compact-nav-panel" id="compact-nav-panel" hidden><section class="compact-nav-section compact-nav-categories"><h2>Shop by category</h2><div class="compact-nav-links"></div></section><section class="compact-nav-section compact-nav-account"><h2>Your account</h2><div class="compact-nav-links"></div></section></div>';
  const categoryTarget = nav.querySelector('.compact-nav-categories .compact-nav-links');
  [...categoryList.querySelectorAll(':scope > a, :scope > .all-category > a, :scope > .category-dropdown > a')].forEach((link) => {
    const clone = document.createElement('a'); clone.href = link.href; clone.textContent = link.textContent.trim().replace(/⌄|⌃/g, '').trim(); categoryTarget.append(clone);
  });
  const accountTarget = nav.querySelector('.compact-nav-account .compact-nav-links');
  [...primaryNav.querySelectorAll('a'), ...authActions.querySelectorAll('a')].forEach((link) => {
    const clone = link.cloneNode(true);
    if (clone.classList.contains('icon-nav-link')) { const label = document.createElement('span'); label.className = 'compact-nav-label'; label.textContent = link.getAttribute('aria-label') || link.title; clone.append(label); }
    accountTarget.append(clone);
  });
  const actions = nav.querySelector('.compact-nav-actions');
  [...authActions.querySelectorAll('a')].forEach((link) => actions.append(link.cloneNode(true)));
  categoryNav.insertAdjacentElement('afterend', nav);

  const toggle = nav.querySelector('.compact-nav-toggle'); const panel = nav.querySelector('.compact-nav-panel');
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); panel.hidden = true; nav.classList.remove('is-open'); };
  toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); panel.hidden = !open; nav.classList.toggle('is-open', open); });
  document.addEventListener('click', (event) => { if (!nav.contains(event.target)) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}

function renderCarousel() {
  const track = document.getElementById('hero-track'); if (!track) return;
  const slides = [...track.querySelectorAll('.hero-slide')]; const dots = document.getElementById('hero-dots'); let index = 0; let timer;
  dots.innerHTML = slides.map((_, i) => `<button aria-label="Show banner ${i + 1}" class="${i === 0 ? 'active' : ''}" data-slide="${i}"></button>`).join('');
  const show = (next) => { index = (next + slides.length) % slides.length; track.style.transform = `translateX(-${index * 100}%)`; slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index)); dots.querySelectorAll('button').forEach((dot, i) => dot.classList.toggle('active', i === index)); document.getElementById('hero-current').textContent = String(index + 1).padStart(2, '0'); };
  const restart = () => { clearInterval(timer); timer = setInterval(() => show(index + 1), 6500); };
  document.getElementById('hero-next').addEventListener('click', () => { show(index + 1); restart(); });
  document.getElementById('hero-prev').addEventListener('click', () => { show(index - 1); restart(); });
  dots.querySelectorAll('button').forEach((dot) => dot.addEventListener('click', () => { show(Number(dot.dataset.slide)); restart(); }));
  track.addEventListener('mouseenter', () => clearInterval(timer)); track.addEventListener('mouseleave', restart); restart();
}
function renderHome() {
  const tiles = document.getElementById('category-tiles');
  tiles.innerHTML = shelves.map((shelf, i) => `<a class="category-tile tile-${i + 1}" href="${catalogUrl(shelf.name)}"><span class="tile-icon">${shelf.icon}</span><span class="tile-copy"><strong>${shelf.name}</strong><small>${shelf.subs[0]} & more</small></span><span class="tile-arrow">↗</span></a>`).join('');
  const collection = document.getElementById('home-collections');
  const shelfStories = {
    'Fiction': ['Stories that stay with you', 'Find page turners, unexpected worlds, and characters you will miss when the story ends.', 'From literary favorites to mystery, romance, fantasy, and more.'],
    'Non-Fiction': ['Ideas for a curious mind', 'True stories and fresh perspectives to help you understand the world and yourself.', 'Memoir, history, business, science, and everyday inspiration.'],
    'Teen': ['Big feelings. Brave new worlds.', 'Stories for every in-between moment, full of friendship, courage, and possibility.', 'Discover young adult favorites chosen for the next generation of readers.'],
    'Kids': ['Little readers, big adventures', 'Colorful worlds and memorable characters make every reading moment special.', 'Picture books, early readers, bedtime stories, and much more.'],
    'Exam': ['Your next goal starts here', 'Build confidence with trusted study guides and focused preparation for the road ahead.', 'Explore exam prep for school, entrance tests, and competitive careers.'],
    'Medical Exam': ['Knowledge for future healers', 'Explore trusted medical texts and focused resources for every stage of your studies.', 'Anatomy, clinical medicine, entrance prep, nursing, and more.'],
    'Manga': ['A whole new world, one panel at a time', 'Meet unforgettable heroes and explore imaginative worlds in graphic storytelling.', 'Action, fantasy, romance, slice of life, and reader favorites.'],
    'Award Winner': ['Books the world remembers', 'Meet acclaimed stories recognized for their craft, ideas, and lasting impact.', 'Prize-winning fiction, nonfiction, poetry, and celebrated authors.']
  };
  collection.innerHTML = shelves.map((shelf, i) => {
    const [title, description, detail] = shelfStories[shelf.name];
    const cardHeading = shelf.name === 'Kids' ? 'Made for little <em>imaginations.</em>' : shelf.name === 'Exam' ? 'Study with <em>purpose.</em>' : `A shelf called <em>${shelf.name.toLowerCase()}.</em>`;
    const examBanner = shelf.name === 'Exam' ? '<a class="exam-promo-banner" href="catalog.html?category=Exam"><img src="assets/banner-exam.png" alt="Exam preparation books and resources"></a>' : '';
    const featureBanner = shelf.name === 'Exam' ? '' : `<a class="shelf-feature shelf-feature-${i + 1}" href="${catalogUrl(shelf.name)}"><span class="shelf-feature-icon">${shelf.icon}</span><span class="shelf-feature-copy"><small>EXPLORE THE ${shelf.name.toUpperCase()} SHELF</small><strong>${title}</strong><span>${description}</span><em>${detail}</em></span><span class="shelf-feature-cta">Explore shelf <b>↗</b></span><span class="shelf-feature-orbit" aria-hidden="true"></span></a>`;
    return `<section class="collection-section wrap collection-${shelf.name.toLowerCase().replace(/[^a-z]+/g, '-')}" data-category="${escapeHTML(shelf.name)}">${examBanner}<div class="section-heading"><div><span class="eyebrow">${['THE PAGE TURNERS', 'THOUGHTS TO KEEP', 'GROWING UP, ONE PAGE AT A TIME', 'LITTLE BOOKS, BIG WORLDS', 'A PLAN FOR WHAT’S NEXT', 'THE MEDICAL SHELF', 'MANGA & GRAPHIC STORIES', 'RECOGNIZED & REMEMBERED'][i]}</span><h2>${cardHeading}</h2></div><a class="text-link" href="${catalogUrl(shelf.name)}">Shop ${shelf.name} <span>↗</span></a></div>${featureBanner}<div class="book-carousel"><button class="carousel-arrow carousel-prev" data-carousel-prev aria-label="Previous ${escapeHTML(shelf.name)} books"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button><div class="book-grid book-carousel-track">${shelfMap[shelf.name].map((bookIndex, order) => cardMarkup(books.find((book) => book.category === shelf.name && book.id.endsWith(`-${bookIndex}-${order}`)))).join('')}</div><button class="carousel-arrow carousel-next" data-carousel-next aria-label="More ${escapeHTML(shelf.name)} books"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button></div><a class="view-more-button" href="${catalogUrl(shelf.name)}">View More <span>↗</span></a></section>`;
  }).join('');
  collection.querySelectorAll('.book-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.book-carousel-track');
    let autoTimer;
    const scrollByCard = (direction) => {
      const card = track.querySelector('.book-card');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 14;
      const step = card.getBoundingClientRect().width + gap;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (direction > 0 && atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else if (direction < 0 && track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
      else track.scrollBy({ left: direction * step, behavior: 'smooth' });
    };
    carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => scrollByCard(-1));
    carousel.querySelector('[data-carousel-next]').addEventListener('click', () => scrollByCard(1));
    const startAuto = () => { clearInterval(autoTimer); autoTimer = setInterval(() => scrollByCard(1), 4200); };
    const stopAuto = () => clearInterval(autoTimer);
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin', stopAuto);
    carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) startAuto(); });
    startAuto();
  });
  wireBookButtons(collection); renderCarousel();
  document.getElementById('newsletter-form')?.addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.reset(); toast('You’re on the list. Happy reading!'); });
}
function initShelfCarousels(root) {
  (root.catalogCarouselTimers || []).forEach(clearInterval); root.catalogCarouselTimers = [];
  root.querySelectorAll('.catalog-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.catalog-carousel-track'); let timer;
    const step = () => { const card = track.querySelector('.book-card'); return card ? card.getBoundingClientRect().width + 14 : 240; };
    const move = (direction) => { const edge = track.scrollWidth - track.clientWidth - 4; if (direction > 0 && track.scrollLeft >= edge) track.scrollTo({ left: 0, behavior: 'smooth' }); else if (direction < 0 && track.scrollLeft <= 4) track.scrollTo({ left: edge, behavior: 'smooth' }); else track.scrollBy({ left: direction * step(), behavior: 'smooth' }); };
    const start = () => { clearInterval(timer); timer = setInterval(() => move(1), 4400); root.catalogCarouselTimers.push(timer); }; const stop = () => clearInterval(timer);
    carousel.querySelectorAll('[data-carousel-control]').forEach((button) => button.addEventListener('click', () => move(Number(button.dataset.carouselControl))));
    carousel.addEventListener('mouseenter', stop); carousel.addEventListener('mouseleave', start); carousel.addEventListener('focusin', stop); carousel.addEventListener('focusout', (event) => { if (!carousel.contains(event.relatedTarget)) start(); }); start();
  });
}
function catalogShelfMarkup(items, shelf, index = 0) {
  const name = shelf?.name || 'Search results'; const categories = shelf?.subs?.slice(0, 3).join(' · ') || 'A selection chosen for curious readers';
  const controls = items.length > 6 ? '<div class="catalog-carousel"><button class="catalog-carousel-arrow previous" type="button" data-carousel-control="-1" aria-label="Previous books">‹</button><div class="catalog-carousel-track" id="catalog-carousel-' + index + '">' + items.map(cardMarkup).join('') + '</div><button class="catalog-carousel-arrow next" type="button" data-carousel-control="1" aria-label="Next books">›</button></div>' : '<div class="catalog-shelf-cards">' + items.map(cardMarkup).join('') + '</div>';
  return '<section class="catalog-shelf-section"><header class="catalog-shelf-heading"><div><span class="eyebrow">' + (shelf?.icon || '✦') + ' &nbsp; CURATED BOOKSHELF</span><h2>' + escapeHTML(name) + ' <em>picks.</em></h2><p>' + escapeHTML(categories) + '</p></div>' + (shelf ? '<a href="' + catalogUrl(name) + '">Explore shelf <span>↗</span></a>' : '') + '</header>' + controls + '</section>';
}
function renderCatalog() {
  const params = new URLSearchParams(location.search); const requested = params.get('category') || 'All'; const shelf = shelves.find((item) => item.name.toLowerCase() === requested.toLowerCase());
  const category = shelf?.name || 'All'; const query = (params.get('q') || '').trim().toLowerCase(); const sub = params.get('sub');
  const heading = category === 'All' ? 'All the good <em>stories.</em>' : `${escapeHTML(category)} books for <em>every you.</em>`;
  document.title = `${category} Books — OnlineBookStore`;
  document.getElementById('catalog-breadcrumb').textContent = category === 'All' ? 'All Books' : category;
  document.getElementById('catalog-eyebrow').textContent = category === 'All' ? 'THE ONLINEBOOKSTORE COLLECTION' : `EXPLORE OUR ${category.toUpperCase()} SHELF`;
  document.getElementById('catalog-title').innerHTML = heading;
  document.getElementById('catalog-description').textContent = sub ? `Browsing ${sub} books, picked for curious minds.` : query ? `Search results for “${params.get('q')}”.` : category === 'All' ? 'Find a new favorite among books picked for curious minds.' : `Discover handpicked ${category.toLowerCase()} books and find your next favorite.`;
  const categoryBookCount = books.filter((book) => (category === 'All' || book.category === category) && (!sub || book.subcategory === sub)).length;
  document.querySelector('.catalog-heading').insertAdjacentHTML('afterend', `<section class="catalog-feature-banner shelf-${category.toLowerCase().replace(/[^a-z]+/g, '-')}"><div><span class="eyebrow">A THOUGHTFUL PLACE TO BEGIN</span><h2>${category === 'All' ? 'Find a book that feels like <em>yours.</em>' : `The ${escapeHTML(category)} shelf, <em>curated.</em>`}</h2><p>${sub ? `A focused collection of ${escapeHTML(sub)} titles, selected to help you find the right next read.` : `Explore ${categoryBookCount} handpicked titles across ${shelf?.subs.length || shelves.length} ${shelf ? 'reading paths' : 'distinct shelves'} and discover a new favorite.`}</p></div><div class="catalog-feature-metrics"><div><strong>${categoryBookCount}</strong><small>BOOKS TO EXPLORE</small></div><div><strong>${shelf?.subs.length || shelves.length}</strong><small>${shelf ? 'SUBCATEGORIES' : 'CURATED SHELVES'}</small></div></div></section>`);
  document.getElementById('subcategory-chips').innerHTML = (shelf?.subs || []).map((item) => `<a class="subcategory-chip ${item === sub ? 'selected' : ''}" href="${catalogUrl(category)}&sub=${encodeURIComponent(item)}">${escapeHTML(item)} <span>↗</span></a>`).join('');
  document.getElementById('catalog-sidebar').innerHTML = shelves.map((item) => `<a class="sidebar-category ${item.name === category ? 'selected' : ''}" href="${catalogUrl(item.name)}"><span>${item.icon}</span>${item.name}<i>↗</i></a>`).join('');
  document.getElementById('catalog-sidebar').insertAdjacentHTML('afterend', `<section class="catalog-filter-options"><h3>Refine this shelf</h3><label>Price range<select id="filter-price"><option value="all">All prices</option><option value="0-500">Up to ₹500</option><option value="500-1000">₹500–₹1,000</option><option value="1000-2000">₹1,000–₹2,000</option><option value="2000+">₹2,000 and above</option></select></label><label>Minimum rating<select id="filter-rating"><option value="0">Any rating</option><option value="4.5">4.5 and above</option><option value="4.7">4.7 and above</option><option value="4.8">4.8 and above</option></select></label><label>Discount<select id="filter-discount"><option value="0">All offers</option><option value="10">10% off or more</option><option value="20">20% off or more</option><option value="30">30% off or more</option></select></label><button type="button" id="clear-catalog-filters">Clear filters</button></section>`);
  const baseFiltered = books.filter((book) => (category === 'All' || book.category === category) && (!sub || book.subcategory === sub) && (!query || `${book.title} ${book.author} ${book.category} ${book.subcategory}`.toLowerCase().includes(query)));
  let filtered = baseFiltered;
  const sort = document.getElementById('sort-books');
  const paint = () => {
    const sortValue = sort.value; const priceBand = document.getElementById('filter-price').value; const minRating = Number(document.getElementById('filter-rating').value); const minDiscount = Number(document.getElementById('filter-discount').value);
    filtered = baseFiltered.filter((book) => { const discount = book.oldPrice ? (book.oldPrice-book.price)/book.oldPrice*100 : 0; const bounds=priceBand.split('-').map(Number); const priceMatches = priceBand==='all' || (priceBand==='2000+' ? book.price>=2000 : book.price>=bounds[0] && (priceBand==='0-500' ? book.price<=bounds[1] : book.price<bounds[1])); return priceMatches && Number(book.rating)>=minRating && discount>=minDiscount; });
    if (sortValue === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
    if (sortValue === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortValue === 'price-high') filtered.sort((a, b) => b.price - a.price);
    document.getElementById('results-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'book' : 'books'} on this shelf`;
    document.getElementById('catalog-grid').innerHTML = filtered.length ? filtered.map(cardMarkup).join('') : `<div class="empty-state"><span>⌕</span><h2>No books found yet</h2><p>Try another search or browse all the shelves.</p><a class="button button-dark" href="catalog.html?category=All">Browse all books ↗</a></div>`;
    const grid = document.getElementById('catalog-grid');
    if (filtered.length) { const groups = category === 'All' && !query ? shelves.map((item) => ({ shelf: item, items: filtered.filter((book) => book.category === item.name) })).filter((group) => group.items.length) : [{ shelf: shelf || null, items: filtered }]; grid.classList.add('catalog-shelf-list'); grid.innerHTML = groups.map((group, index) => catalogShelfMarkup(group.items, group.shelf, index)).join(''); }
    else grid.classList.remove('catalog-shelf-list');
    wireBookButtons(grid); initShelfCarousels(grid);
  };
  ['filter-price','filter-rating','filter-discount'].forEach((id)=>document.getElementById(id).addEventListener('change',paint));
  document.getElementById('clear-catalog-filters').addEventListener('click',()=>{document.getElementById('filter-price').value='all';document.getElementById('filter-rating').value='0';document.getElementById('filter-discount').value='0';sort.value='featured';paint();});
  sort.addEventListener('change', paint); paint();
}
function renderBook() {
  const id = new URLSearchParams(location.search).get('id'); const book = books.find((item) => item.id === id) || books[0];
  const discountAmount = Math.max(0, book.oldPrice - book.price); const discountPercent = book.oldPrice ? Math.round(discountAmount / book.oldPrice * 100) : 0;
  document.title = `${book.title} — OnlineBookStore`; document.getElementById('book-breadcrumb').textContent = book.title;
  document.getElementById('book-detail').innerHTML = `<section class="book-detail"><div class="detail-cover-panel"><div class="detail-cover-glow"></div><img src="${cover(book)}" alt="${escapeHTML(book.title)} book cover" onerror="this.onerror=null;this.src='${cover(book, 'M')}'"><span class="detail-stamp">A READER<br>FAVORITE</span></div><div class="detail-copy"><div class="detail-meta"><a href="${catalogUrl(book.category)}">${escapeHTML(book.category)}</a><span>·</span><span>${escapeHTML(book.subcategory)}</span><span>·</span><span>Paperback</span></div><span class="eyebrow">A BOOK TO REMEMBER</span><h1>${escapeHTML(book.title)}</h1><p class="detail-author">by <strong>${escapeHTML(book.author)}</strong></p><div class="detail-rating"><span>★★★★★</span><strong>${book.rating}</strong><a href="#reader-notes">(128 reader notes)</a></div><div class="detail-price"><strong>${money(book.price)}</strong><del>${money(book.oldPrice)}</del><span class="discount-pill">Save ${Math.round((1 - book.price / book.oldPrice) * 100)}%</span></div><p class="detail-description">${escapeHTML(book.note)} A thoughtful pick from our booksellers, this edition is ready to make a home on your shelf. Take a closer look and see where the first page leads.</p><div class="detail-highlights"><div><span>✦</span><p><strong>Why readers love it</strong><small>A story to revisit and recommend.</small></p></div><div><span>⌑</span><p><strong>Format</strong><small>Paperback · English edition</small></p></div><div><span>↗</span><p><strong>Delivery</strong><small>Usually ships in 2–4 business days</small></p></div></div><div class="detail-actions"><div class="quantity-control"><button data-qty-minus aria-label="Decrease quantity">−</button><span id="book-qty">1</span><button data-qty-plus aria-label="Increase quantity">+</button></div><button class="button button-dark detail-add" data-detail-add="${escapeHTML(book.id)}">Add to cart <span>↗</span></button><button class="detail-wish ${readStore('obs-wishlist').includes(book.id) ? 'is-saved' : ''}" data-wishlist="${escapeHTML(book.id)}" aria-label="Add to wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5-8.8 10.4-8.8 10.4S3.2 13.8 3.2 8.8A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.8 2.2Z"/></svg></button></div><div class="delivery-note"><span>✓</span> In stock and ready for your bookshelf</div><div class="detail-isbn">ISBN <span>${book.isbn}</span></div></div></section><section class="book-story"><div class="story-tabs"><span class="active">About this book</span><span>Details</span><span id="reader-notes">Reader notes</span></div><div class="story-copy"><span class="eyebrow">A LITTLE ABOUT THE STORY</span><h2>Some books just <em>find you.</em></h2><p>${escapeHTML(book.note)} Whether you are discovering it for the first time or returning to its pages, ${escapeHTML(book.title)} is a lovely companion for a quiet afternoon, a long commute, or a gift to someone who deserves a good story.</p><p>Our booksellers chose this title for its memorable voice, its warm sense of discovery, and the kind of details that stay with you after the last page.</p></div><div class="story-facts"><div><small>Written by</small><strong>${escapeHTML(book.author)}</strong></div><div><small>Category</small><strong>${escapeHTML(book.category)}</strong></div><div><small>Format</small><strong>Paperback</strong></div><div><small>Language</small><strong>English</strong></div></div></section>`;
  const savingsPanel = document.createElement('div'); savingsPanel.className = 'book-savings-panel'; savingsPanel.innerHTML = `<span class="savings-icon">↓</span><div><strong>You save ${money(discountAmount)} (${discountPercent}% off)</strong><small>List price ${money(book.oldPrice)} · today’s price ${money(book.price)}</small></div><b>${discountPercent}% OFF</b>`; document.querySelector('.detail-price').insertAdjacentElement('afterend', savingsPanel);
  document.querySelector('.book-story').insertAdjacentHTML('afterend', `<section class="edition-details"><div class="edition-heading"><span class="eyebrow">THE BOOK AT A GLANCE</span><h2>Edition & delivery details</h2><p>Clear details before you add this title to your shelf.</p></div><div class="edition-grid"><div><small>ISBN</small><strong>${escapeHTML(book.isbn)}</strong></div><div><small>CATEGORY</small><strong>${escapeHTML(book.category)}</strong></div><div><small>SUBCATEGORY</small><strong>${escapeHTML(book.subcategory)}</strong></div><div><small>FORMAT</small><strong>Paperback · Demo edition</strong></div><div><small>READER RATING</small><strong>★ ${escapeHTML(book.rating)} / 5</strong></div><div><small>DELIVERY</small><strong>Usually arrives in 3–5 business days</strong></div></div><div class="edition-total"><span>Price breakdown</span><div><small>List price <del>${money(book.oldPrice)}</del></small><small>You save <strong>${money(discountAmount)}</strong></small><b>Pay today ${money(book.price)}</b></div></div></section>`);
  const qty = document.getElementById('book-qty'); document.querySelector('[data-qty-minus]').addEventListener('click', () => qty.textContent = Math.max(1, Number(qty.textContent) - 1)); document.querySelector('[data-qty-plus]').addEventListener('click', () => qty.textContent = Number(qty.textContent) + 1);
  document.querySelector('[data-detail-add]').addEventListener('click', () => addCart(book.id, Number(qty.textContent))); wireBookButtons(document.getElementById('book-detail'));
  const related = books.filter((item) => item.category === book.category && item.id !== book.id).slice(0, 6); document.getElementById('related-grid').innerHTML = related.map(cardMarkup).join(''); wireBookButtons(document.getElementById('related-grid'));
}

function renderProfileDashboard(content, headings) {
  const profile = currentDemoUser(); const avatar = localStorage.getItem('obs-avatar') || '';
  const orders = currentDemoOrders(); const purchased = orders.filter((order)=>!/^cancel/i.test(order.status||'')).reduce((sum, order) => sum + order.items.reduce((n, item) => n + item.qty, 0), 0);
  const cartCount = readStore('obs-cart').reduce((sum, item) => sum + item.qty, 0); const wishlistCount = readStore('obs-wishlist').length;
  const fields = ['name','email','phone','birth','address','city','postal']; const percent = Math.round(fields.filter((key) => profile[key]?.trim()).length / fields.length * 100);
  const initials = escapeHTML((profile.name || 'R').trim().charAt(0).toUpperCase());
  content.innerHTML = `<section class="profile-dashboard premium-profile"><aside class="profile-side"><div class="profile-avatar profile-avatar-large">${avatar ? `<img src="${avatar}" alt="Your profile photo">` : initials}</div><span class="eyebrow">READER ACCOUNT</span><h2>${escapeHTML(profile.name || 'Welcome, reader')}</h2><p>${escapeHTML(profile.email || 'Add your contact details to personalize your account.')}</p><div class="profile-progress-label"><strong>Profile completion</strong><b>${percent}%</b></div><div class="profile-progress"><span style="width:${percent}%"></span></div><small>Complete your details for smoother checkout and order updates.</small><a class="profile-shortcut profile-cart-shortcut" href="utility.html?page=cart"><span class="profile-shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2l2.1 11h10.7L20 8H6"/><circle cx="9" cy="19" r="1.2"/><circle cx="17" cy="19" r="1.2"/></svg></span><span class="profile-shortcut-label">My cart</span><b>${cartCount}</b><span class="profile-shortcut-arrow" aria-hidden="true">↗</span></a><a class="profile-shortcut profile-wishlist-shortcut" href="utility.html?page=wishlist"><span class="profile-shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 8.8c0 5-8.5 10.1-8.5 10.1S3.5 13.8 3.5 8.8A4.3 4.3 0 0 1 12 6.7a4.3 4.3 0 0 1 8.5 2.1Z"/></svg></span><span class="profile-shortcut-label">My wishlist</span><b>${wishlistCount}</b><span class="profile-shortcut-arrow" aria-hidden="true">↗</span></a><a class="profile-shortcut profile-track-shortcut" href="utility.html?page=track"><span class="profile-shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM8 9h8M8 13h5"/><path d="m15 17 2 2 4-4"/></svg></span><span class="profile-shortcut-label">Track an order</span><span class="profile-shortcut-arrow" aria-hidden="true">↗</span></a></aside><div class="profile-main"><div class="profile-welcome-band"><span class="eyebrow">YOUR PERSONAL BOOKSHELF</span><strong>${escapeHTML(profile.name ? `Welcome back, ${profile.name.split(' ')[0]}.` : 'Welcome back, reader.')}</strong><p>Your reading life, thoughtfully gathered in one place.</p><span class="welcome-spark" aria-hidden="true">✳</span></div><div class="profile-heading"><div><span class="eyebrow">READER DASHBOARD</span><h1>${headings.profile}</h1><p>Your books, orders, and account details at a glance.</p></div><button class="profile-edit" type="button" data-profile-edit><span>✎</span> Edit profile</button></div><div class="profile-stats"><article><small>BOOKS PURCHASED</small><strong>${purchased}</strong><span>Across ${orders.length} demo orders</span></article><article><small>IN YOUR CART</small><strong>${cartCount}</strong><span>Books ready for checkout</span></article><article><small>WISHLIST</small><strong>${wishlistCount}</strong><span>Saved for later</span></article><article><small>ORDERS</small><strong>${orders.length}</strong><span>Order history</span></article></div><section class="profile-details-panel"><div class="profile-subheading"><div><span class="eyebrow">ACCOUNT INFORMATION</span><h2>Your details</h2></div><button class="profile-edit profile-edit-secondary" type="button" data-profile-edit>Edit details</button></div><div class="profile-detail-grid"><div><small>Full name</small><strong>${escapeHTML(profile.name || 'Not added yet')}</strong></div><div><small>Email address</small><strong>${escapeHTML(profile.email || 'Not added yet')}</strong></div><div><small>Contact number</small><strong>${escapeHTML(profile.phone || 'Not added yet')}</strong></div><div><small>Date of birth</small><strong>${escapeHTML(profile.birth || 'Not added yet')}</strong></div><div class="detail-wide"><small>Delivery address</small><strong>${escapeHTML([profile.address,profile.city,profile.postal].filter(Boolean).join(', ') || 'Add a delivery address')}</strong></div></div></section><section class="profile-order-panel"><div class="profile-subheading"><div><span class="eyebrow">PURCHASES & DELIVERY</span><h2>Recent orders</h2></div><a href="utility.html?page=track">Track an order ↗</a></div>${orders.length ? `<div class="profile-order-list">${orders.slice(0,6).map((order) => `<article><div><strong>${escapeHTML(order.id)}</strong><small>${new Date(order.date).toLocaleDateString('en-IN')} · ${order.items.reduce((sum,item)=>sum+item.qty,0)} books</small></div><span class="order-state">${escapeHTML(order.status)}</span><strong>${money(order.total)}</strong><a href="utility.html?page=track&order=${encodeURIComponent(order.id)}">Details ↗</a></article>`).join('')}</div>` : '<p class="profile-empty-orders">No orders yet. Your completed demo purchases will appear here.</p>'}</section></div></section><dialog class="profile-edit-dialog" id="profile-edit-dialog"><form method="dialog" class="dialog-close-form"><button class="dialog-close" aria-label="Close edit profile">×</button></form><div class="dialog-heading"><span class="eyebrow">MAKE IT YOURS</span><h2>Edit your profile</h2><p>Update your reader and delivery details.</p></div><form class="simple-form profile-form" id="profile-form"><div class="avatar-editor"><div class="avatar-crop-stage"><div class="avatar-crop-window"><img id="avatar-preview" src="${avatar}" alt="Profile photo crop preview" ${avatar ? '' : 'hidden'}><span id="avatar-placeholder" ${avatar ? 'hidden' : ''}>${initials}</span></div><span class="crop-corner crop-tl"></span><span class="crop-corner crop-tr"></span><span class="crop-corner crop-bl"></span><span class="crop-corner crop-br"></span></div><div class="avatar-editor-controls"><label class="upload-avatar-button" for="avatar-file">Choose profile photo<input id="avatar-file" type="file" accept="image/*"></label><label class="zoom-control">Crop / zoom<input id="avatar-zoom" type="range" min="1" max="2.5" step="0.05" value="1"></label><small>Choose an image, adjust the crop, then save your profile.</small></div></div><div class="form-section-title">Personal and delivery details <small>Fields marked * are required</small></div><div class="profile-fields"><label>Full name *<input name="name" required autocomplete="name" value="${escapeHTML(profile.name || '')}" placeholder="Your full name"></label><label>Email address *<input name="email" required type="email" autocomplete="email" value="${escapeHTML(profile.email || '')}" placeholder="you@example.com"></label><label>Contact number<input name="phone" type="tel" autocomplete="tel" value="${escapeHTML(profile.phone || '')}" placeholder="+91 98765 43210"></label><label>Date of birth<input name="birth" type="date" value="${escapeHTML(profile.birth || '')}"></label><label class="profile-address">Delivery address<input name="address" autocomplete="street-address" value="${escapeHTML(profile.address || '')}" placeholder="House, street, area"></label><label>City<input name="city" autocomplete="address-level2" value="${escapeHTML(profile.city || '')}" placeholder="City"></label><label>PIN code<input name="postal" autocomplete="postal-code" value="${escapeHTML(profile.postal || '')}" placeholder="Postal code"></label></div><div class="dialog-actions"><button class="dialog-cancel" type="button" data-dialog-cancel>Cancel</button><button class="button button-dark" type="submit">Save profile <span>↗</span></button></div></form></dialog>`;
  content.querySelector('.profile-order-panel .profile-subheading')?.insertAdjacentHTML('beforeend', '<a class="profile-orders-link" href="utility.html?page=orders">All orders ↗</a>');
  content.querySelectorAll('.profile-order-panel .profile-order-list article').forEach((row,index)=>{row.querySelector('a')?.setAttribute('href',`utility.html?page=track&order=${encodeURIComponent(orders[index]?.id || '')}`);});
  const avatarBox = content.querySelector('.profile-avatar-large'); avatarBox.insertAdjacentHTML('afterend', '<button type="button" class="profile-photo-edit" data-avatar-edit>Change profile photo</button>');
  content.querySelector('.profile-edit-secondary')?.remove(); const detailEdit = content.querySelector('.profile-heading [data-profile-edit]'); detailEdit.innerHTML = '<span>✎</span> Edit account details';
  const dialog = content.querySelector('#profile-edit-dialog'); let editMode = 'details';
  const open = (mode) => { editMode = mode; dialog.classList.toggle('avatar-only', mode === 'photo'); dialog.querySelector('.dialog-heading h2').textContent = mode === 'photo' ? 'Update profile photo' : 'Edit account details'; dialog.querySelector('.dialog-heading p').textContent = mode === 'photo' ? 'Choose a photo and adjust its square crop before saving.' : 'Update your reader and delivery information.'; dialog.querySelector('.dialog-actions .button').innerHTML = mode === 'photo' ? 'Save photo <span>↗</span>' : 'Save profile <span>↗</span>'; dialog.querySelectorAll('.profile-fields input').forEach((input) => { input.disabled = mode === 'photo'; }); dialog.showModal(); };
  detailEdit.addEventListener('click', () => open('details')); content.querySelector('[data-avatar-edit]').addEventListener('click', () => open('photo'));
  content.querySelector('[data-dialog-cancel]').addEventListener('click', () => dialog.close());
  const fileInput = content.querySelector('#avatar-file'); const preview = content.querySelector('#avatar-preview'); const placeholder = content.querySelector('#avatar-placeholder'); const zoom = content.querySelector('#avatar-zoom');
  fileInput.addEventListener('change', () => { const file = fileInput.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { preview.src = reader.result; preview.hidden = false; placeholder.hidden = true; preview.style.transform = `scale(${zoom.value})`; }; reader.readAsDataURL(file); });
  zoom.addEventListener('input', () => { preview.style.transform = `scale(${zoom.value})`; });
  content.querySelector('#profile-form').addEventListener('submit', (event) => {
    event.preventDefault(); if (editMode === 'details') { const data = Object.fromEntries(new FormData(event.currentTarget).entries()); localStorage.setItem('obs-profile', JSON.stringify(data)); }
    if (!preview.hidden && preview.src.startsWith('data:')) { const image = new Image(); image.onload = () => { const canvas = document.createElement('canvas'); canvas.width = 480; canvas.height = 480; const ctx = canvas.getContext('2d'); const scale = Math.max(480 / image.width, 480 / image.height) * Number(zoom.value); const width = image.width * scale, height = image.height * scale; ctx.drawImage(image, (480-width)/2, (480-height)/2, width, height); try { localStorage.setItem('obs-avatar', canvas.toDataURL('image/jpeg', .82)); } catch { toast('Photo is too large to save in this browser. Try a smaller image.'); } dialog.close(); renderProfileDashboard(content, headings); }; image.src = preview.src; }
    else { dialog.close(); renderProfileDashboard(content, headings); }
  });
}

function authPasswordField(name, label, autocomplete, hint = '') {
  return `<label class="account-password-field">${label}<span class="password-input-wrap"><input id="auth-${name}" name="${name}" type="password" minlength="8" autocomplete="${autocomplete}" placeholder="At least 8 characters" required><button class="password-eye" type="button" data-password-toggle="${name}" aria-label="Show ${label.toLowerCase()}" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.3-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.3 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/></svg></button></span>${hint ? `<small class="password-hint">${hint}</small>` : ''}</label>`;
}
function createDemoPasswordHash(password, saltHex) {
  if (!globalThis.crypto?.subtle) return Promise.reject(new Error('Secure browser crypto is unavailable. Use a current browser to run the demo.'));
  const bytes = saltHex.match(/.{2}/g).map((part) => Number.parseInt(part,16));
  return crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
    .then((key) => crypto.subtle.deriveBits({name:'PBKDF2',salt:new Uint8Array(bytes),iterations:120000,hash:'SHA-256'},key,256))
    .then((bits) => Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2,'0')).join(''));
}
function newDemoPasswordSalt() { return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2,'0')).join(''); }
function renderAccountPage(content, page, headings) {
  const signUp = page === 'signup'; const forgot = page === 'forgot'; const title = page === 'login' ? 'Welcome back, reader.' : signUp ? 'Make room for a new chapter.' : 'Let’s get you back to your shelf.';
  const eyebrow = page === 'login' ? 'YOUR READER ACCOUNT' : signUp ? 'A SHELF THAT’S ALL YOURS' : 'DEMO ACCOUNT RECOVERY';
  const intro = page === 'login' ? 'Sign in to see your saved books, account details, and demo orders.' : signUp ? 'Create your reader account to save books, follow orders, and keep your favorite shelves close.' : 'Set a new password for your local demo account. No email is sent in this front-end preview.';
  const passwordInputs = signUp ? authPasswordField('password','Create password','new-password','Use at least 8 characters, including a letter and a number.') + authPasswordField('confirmPassword','Confirm password','new-password') : forgot ? authPasswordField('newPassword','New password','new-password','Use at least 8 characters, including a letter and a number.') + authPasswordField('confirmPassword','Confirm new password','new-password') : authPasswordField('password','Password','current-password');
  content.innerHTML = `<section class="account-page-shell account-page-${page}"><aside class="account-promo-panel"><span class="account-promo-kicker"><i>✦</i> ONLINEBOOKSTORE · READER CLUB</span><div class="account-promo-art"><span class="promo-book promo-book-one">READ</span><span class="promo-book promo-book-two">AGAIN</span><span class="promo-spark">✳</span></div><span class="eyebrow">A LITTLE MORE ROOM FOR WONDER</span><h2>${title}</h2><p>Keep your reading life together: save favorites, manage your basket, and follow each demo order from one place.</p><div class="account-promo-points"><span><b>01</b> Personal bookshelves</span><span><b>02</b> Clear order updates</span><span><b>03</b> Reader-first discovery</span></div><a href="catalog.html?category=All">Explore the shelves <span>↗</span></a></aside><div class="account-form"><div class="account-form-topline"><span class="account-form-mark">${signUp ? '✳' : forgot ? '↺' : '↗'}</span><span class="demo-mode-chip"><i></i> FRONT-END DEMO</span></div><span class="eyebrow">${eyebrow}</span><h1>${headings[page]}</h1><p class="account-form-intro">${intro}</p><form class="simple-form account-auth-form" id="account-auth-form" novalidate>${signUp ? '<label>Full name<input name="name" required autocomplete="name" minlength="2" placeholder="Your full name"></label><label>Contact number<input name="phone" type="tel" required autocomplete="tel" pattern="[0-9+() -]{8,18}" placeholder="+91 98765 43210"></label>' : ''}<label>Email address<input name="email" type="email" required autocomplete="email" value="${escapeHTML(currentDemoUser().email || '')}" placeholder="you@example.com"></label>${passwordInputs}<div class="auth-feedback" id="auth-feedback" role="status" aria-live="polite"></div>${!signUp && !forgot ? '<a class="forgot-link" href="utility.html?page=forgot">Forgot password? <span>Recover access ↗</span></a>' : ''}<button class="button button-dark account-submit" type="submit">${signUp ? 'Create my account' : forgot ? 'Update demo password' : 'Sign in to my account'} <span>↗</span></button></form><p class="auth-privacy-note">Demo only: your password is locally hashed in this browser. Connect the PHP backend before using real accounts.</p><div class="account-switch">${forgot ? '<span>Remembered it?</span><a href="utility.html?page=login">Back to sign in ↗</a>' : signUp ? '<span>Already have an account?</span><a href="utility.html?page=login">Sign in ↗</a>' : '<span>New to our bookshop?</span><a href="utility.html?page=signup">Create a reader account ↗</a>'}</div></div></section>`;
  const form = content.querySelector('#account-auth-form'); const feedback = content.querySelector('#auth-feedback');
  content.querySelectorAll('[data-password-toggle]').forEach((button) => button.addEventListener('click', () => { const input=form.elements[button.dataset.passwordToggle]; const reveal=input.type==='password'; input.type=reveal?'text':'password'; button.setAttribute('aria-pressed',String(reveal)); button.setAttribute('aria-label',`${reveal?'Hide':'Show'} ${button.dataset.passwordToggle.replace(/([A-Z])/g,' $1').toLowerCase()}`); button.classList.toggle('is-visible',reveal); input.focus(); }));
  const confirm = form.elements.confirmPassword; const firstPassword = form.elements.password || form.elements.newPassword;
  const checkPasswords = () => { if (!confirm) return true; const valid=confirm.value===firstPassword.value; confirm.setCustomValidity(valid?'':'Passwords do not match.'); return valid; };
  firstPassword?.addEventListener('input',checkPasswords); confirm?.addEventListener('input',checkPasswords);
  form.addEventListener('submit', async (event) => {
    event.preventDefault(); feedback.textContent=''; feedback.className='auth-feedback';
    if (!form.reportValidity()) return;
    const values=Object.fromEntries(new FormData(form).entries()); const email=values.email.trim().toLowerCase(); const password=values.password || values.newPassword || '';
    if (password.length<8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) { feedback.textContent='Choose a password with at least 8 characters, a letter, and a number.'; feedback.classList.add('is-error'); return; }
    if (!checkPasswords()) { confirm.reportValidity(); return; }
    const auth=readObject('obs-demo-auth',{users:{}}); auth.users ||= {}; const profile=currentDemoUser();
    const saved=auth.users[email];
    try {
      if (signUp) {
        if (saved) { feedback.textContent='An account already exists for this email. Sign in instead.'; feedback.classList.add('is-error'); return; }
        const salt=newDemoPasswordSalt(); auth.users[email]={salt,hash:await createDemoPasswordHash(password,salt)}; writeStore('obs-demo-auth',auth);
        localStorage.setItem('obs-profile',JSON.stringify({...profile,name:values.name.trim(),email,phone:values.phone.trim()})); sessionStorage.setItem('obs-demo-session',email);
        feedback.textContent='Your demo account is ready. Opening your reader dashboard…'; feedback.classList.add('is-success'); setTimeout(()=>location.href='utility.html?page=profile',700); return;
      }
      if (forgot) {
        if (!saved && profile.email?.toLowerCase()!==email) { feedback.textContent='No demo account matches this email. Create an account first.'; feedback.classList.add('is-error'); return; }
        const salt=newDemoPasswordSalt(); auth.users[email]={salt,hash:await createDemoPasswordHash(password,salt)}; writeStore('obs-demo-auth',auth);
        feedback.textContent='Demo password updated in this browser. You can sign in now.'; feedback.classList.add('is-success'); return;
      }
      if (saved) { const hash=await createDemoPasswordHash(password,saved.salt); if (hash!==saved.hash) { feedback.textContent='That password does not match this demo account.'; feedback.classList.add('is-error'); return; } }
      else if (profile.email?.toLowerCase()===email) { const salt=newDemoPasswordSalt(); auth.users[email]={salt,hash:await createDemoPasswordHash(password,salt)}; writeStore('obs-demo-auth',auth); }
      else { feedback.textContent='No demo account matches this email. Create an account first.'; feedback.classList.add('is-error'); return; }
      sessionStorage.setItem('obs-demo-session',email); feedback.textContent='Signed in. Opening your reader dashboard…'; feedback.classList.add('is-success'); setTimeout(()=>location.href='utility.html?page=profile',650);
    } catch (error) { feedback.textContent=error.message || 'The demo could not save this account. Try again.'; feedback.classList.add('is-error'); }
  });
}
function renderUtility() {
  const page = new URLSearchParams(location.search).get('page') || 'profile'; const content = document.getElementById('utility-content');
  const headings = { about: 'A little love for <em>the written word.</em>', contact: 'We’re happy to <em>help.</em>', profile: 'Your reading <em>corner.</em>', cart: 'A good read is <em>within reach.</em>', wishlist: 'Books you’re <em>saving for later.</em>', track: 'Let’s find your <em>order.</em>', login: 'Welcome <em>back.</em>', signup: 'Make yourself <em>at home.</em>', forgot: 'Let’s get you <em>back in.</em>' };
  const labels = { about: 'About Us', contact: 'Contact Us', profile: 'My Profile', cart: 'My Cart', wishlist: 'My Wishlist', orders: 'My Orders', track: 'Track Order', login: 'Login', signup: 'Sign Up', forgot: 'Reset Password' };
  document.getElementById('utility-breadcrumb').textContent = labels[page] || 'My Account'; document.title = `${labels[page] || 'My Account'} — OnlineBookStore`;
  if (page === 'profile') { renderProfileDashboard(content, headings); return; }
  if (page === 'login' || page === 'signup' || page === 'forgot') { renderAccountPage(content, page, headings); return; }
  if (page === 'about') { content.innerHTML = `<section class="utility-hero"><span class="eyebrow">A BOOKSHOP FOR THE CURIOUS</span><h1>${headings.about}</h1><p>We believe a good book can make an ordinary day feel a little bigger. OnlineBookStore is a friendly place to find stories, discover new voices, and keep your shelves full of possibility.</p><a class="button button-dark" href="catalog.html?category=All">Browse the shelves <span>↗</span></a><div class="utility-stat-row"><div><strong>8</strong><small>thoughtful shelves</small></div><div><strong>Every</strong><small>kind of reader welcome</small></div><div><strong>Always</strong><small>one more chapter</small></div></div></section><section class="about-values"><header><span class="eyebrow">OUR BOOKSHOP PROMISE</span><h2>Good books. <em>Good guidance.</em></h2><p>We make it easier to browse widely, choose confidently, and enjoy the book once it reaches you.</p></header><div class="about-value-grid"><article><span>01</span><h3>Thoughtfully arranged</h3><p>Eight clear shelves and useful subcategories help every reader find a natural starting point.</p></article><article><span>02</span><h3>Details you can trust</h3><p>See authors, ratings, ISBNs, prices, savings, and delivery information before you decide.</p></article><article><span>03</span><h3>Built around readers</h3><p>Save favorites, manage your basket, and follow demo orders from one responsive account space.</p></article></div><div class="about-note"><strong>Our purpose</strong><p>To make the joy of discovering a book feel personal, welcoming, and simple on every screen.</p><a href="utility.html?page=contact">Talk to our bookshop team ↗</a></div></section>`; return; }
  if (page === 'contact') { content.innerHTML = `<section class="utility-panel contact-panel"><div><span class="eyebrow">BOOK LOVERS, HERE TO HELP</span><h1>${headings.contact}</h1><p>Tell us what you need and our booksellers will get back to you. We can help with book recommendations, delivery questions, or anything about your order.</p><div class="contact-card"><span>✉</span><div><small>EMAIL OUR BOOKSELLERS</small><a href="mailto:hello@onlinebookstore.example">hello@onlinebookstore.example</a></div></div><div class="contact-card"><span>◷</span><div><small>BOOKSHOP HOURS</small><strong>Monday – Saturday, 10 am – 6 pm IST</strong></div></div><div class="contact-card"><span>⌖</span><div><small>READER SUPPORT</small><strong>Replies usually arrive within one business day</strong></div></div></div><form class="simple-form" data-demo-form><div class="form-section-title">Send us a message <small>All fields marked are required</small></div><label>Your full name<input required autocomplete="name" placeholder="Enter your name"></label><label>Email address<input type="email" required autocomplete="email" placeholder="you@example.com"></label><label>Contact number<input type="tel" required autocomplete="tel" pattern="[0-9+() -]{8,18}" placeholder="+91 98765 43210"></label><label>What can we help with?<select required><option value="" disabled selected>Choose a topic</option><option>Book recommendation</option><option>Order or delivery</option><option>Returns and refunds</option><option>Something else</option></select></label><label>Your message<textarea rows="5" required placeholder="Share a few details so we can help..."></textarea></label><button class="button button-dark">Send message <span>↗</span></button></form></section>`; }
  else if (page === 'cart' || page === 'wishlist') { const isCart = page === 'cart'; const items = isCart ? readStore('obs-cart').map((entry) => ({ book: books.find((book) => book.id === entry.id), qty: entry.qty })).filter((entry) => entry.book) : readStore('obs-wishlist').map((id) => ({ book: books.find((book) => book.id === id), qty: 1 })).filter((entry) => entry.book); const total = items.reduce((sum, entry) => sum + entry.book.price * entry.qty, 0);
    content.innerHTML = `<div class="account-heading"><span class="eyebrow">${isCart ? 'YOUR BASKET' : 'YOUR SAVED SHELF'}</span><h1>${headings[page]}</h1><p>${isCart ? 'A few good pages are waiting for you.' : 'Keep the books you love close until you’re ready.'}</p></div>${items.length ? `<div class="shopping-layout ${isCart ? 'cart-layout' : 'wishlist-layout'}"><div class="shopping-list">${items.map(({ book, qty }) => `<article class="shopping-item"><a href="${bookUrl(book)}"><img src="${cover(book, 'M')}" alt="${escapeHTML(book.title)} cover"></a><div class="shopping-info"><span class="eyebrow">${escapeHTML(book.category)}</span><a href="${bookUrl(book)}"><strong>${escapeHTML(book.title)}</strong></a><small>by ${escapeHTML(book.author)}</small><div class="shopping-item-controls">${isCart ? `<button data-cart-minus="${book.id}" aria-label="Reduce quantity">−</button><span>${qty}</span><button data-cart-plus="${book.id}" aria-label="Increase quantity">+</button>` : ''}<button class="remove-item" data-remove="${book.id}">Remove</button></div></div><div class="shopping-price-block"><strong class="shopping-price">${money(book.price * qty)}</strong><small>${Math.round((1-book.price/book.oldPrice)*100)}% off · saved ${money((book.oldPrice-book.price)*qty)}</small></div></article>`).join('')}</div>${isCart ? `<aside class="order-summary"><span class="eyebrow">A LITTLE SUMMARY</span><h2>Your order</h2><div><span>Items subtotal</span><strong>${money(total)}</strong></div><div><span>Delivery</span><strong>${total >= 999 ? 'On us' : '₹79'}</strong></div><div class="summary-total"><span>Total</span><strong>${money(total + (total >= 999 ? 0 : 79))}</strong></div><button class="button button-dark" data-checkout>Continue to checkout <span>↗</span></button><small>Secure checkout · Easy returns</small></aside>` : `<aside class="order-summary wishlist-summary"><span class="eyebrow">A GOOD PLACE TO START</span><h2>Your next read is here.</h2><p>Move a saved book to your cart whenever you’re ready.</p><div class="wishlist-value"><span>${items.length} saved ${items.length === 1 ? 'book' : 'books'}</span><strong>${money(total)}</strong></div><div class="wishlist-value wishlist-savings"><span>Potential savings</span><strong>${money(items.reduce((sum,entry)=>sum+(entry.book.oldPrice-entry.book.price),0))}</strong></div><a class="button button-dark" href="catalog.html?category=All">Explore books <span>↗</span></a></aside>`}</div>` : `<div class="empty-state empty-shopping"><span>${isCart ? '♡' : '✧'}</span><h2>${isCart ? 'Your cart is taking a quiet moment.' : 'Your wishlist is waiting for a favorite.'}</h2><p>${isCart ? 'Add a book you love and it will be right here.' : 'Tap the little heart on a book to save it for later.'}</p><a class="button button-dark" href="catalog.html?category=All">Find a good read <span>↗</span></a></div>`}`;
    items.forEach(({book})=>{const row=content.querySelector(`[data-remove="${CSS.escape(book.id)}"]`)?.closest('.shopping-item');if(!row)return;row.querySelector('.shopping-info>small')?.insertAdjacentHTML('afterend',`<div class="shopping-meta"><span>${escapeHTML(book.subcategory)}</span><span>★ ${escapeHTML(book.rating)} / 5</span><span>ISBN ${escapeHTML(book.isbn)}</span></div>`);if(!isCart)row.querySelector('.shopping-item-controls')?.insertAdjacentHTML('afterbegin',`<button class="move-to-cart" type="button" data-move-to-cart="${escapeHTML(book.id)}">Add to cart</button>`);});
    if (isCart && items.length) { const savings = items.reduce((sum, entry) => sum + (entry.book.oldPrice - entry.book.price) * entry.qty, 0); const summary = content.querySelector('.order-summary'); summary.querySelector('.summary-total').insertAdjacentHTML('beforebegin', `<div class="summary-savings"><span>You save on these books</span><strong>−${money(savings)}</strong></div><div><span>Free delivery over ₹999</span><strong>${total >= 999 ? 'Unlocked' : money(999-total)+' away'}</strong></div>`); }
    content.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => { const key = isCart ? 'obs-cart' : 'obs-wishlist'; if (isCart) writeStore(key, readStore(key).filter((entry) => entry.id !== button.dataset.remove)); else writeStore(key, readStore(key).filter((id) => id !== button.dataset.remove)); renderUtility(); updateCounts(); }));
    content.querySelectorAll('[data-move-to-cart]').forEach((button)=>button.addEventListener('click',()=>{const id=button.dataset.moveToCart;writeStore('obs-wishlist',readStore('obs-wishlist').filter((item)=>item!==id));addCart(id);renderUtility();updateCounts();}));
    content.querySelectorAll('[data-cart-minus], [data-cart-plus]').forEach((button) => button.addEventListener('click', () => { const cart = readStore('obs-cart'); const entry = cart.find((item) => item.id === (button.dataset.cartMinus || button.dataset.cartPlus)); if (button.dataset.cartMinus) entry.qty = Math.max(1, entry.qty - 1); else entry.qty++; writeStore('obs-cart', cart); renderUtility(); updateCounts(); }));
    content.querySelector('[data-checkout]')?.addEventListener('click', commitDemoOrder); return;
  }
  else if (page === 'orders') {
    const orders = currentDemoOrders(); const activeOrders=orders.filter((order)=>!/^cancel/i.test(order.status||'')); const bookCount = activeOrders.reduce((sum, order) => sum + order.items.reduce((count, item) => count + item.qty, 0), 0); const totalSpent = activeOrders.reduce((sum, order) => sum + order.total, 0);
    const orderCards = orders.map((order) => {
      const count=order.items.reduce((n,item)=>n+item.qty,0); const cancelled=/cancel/i.test(order.status); const progress=/deliver/i.test(order.status)?100:/ship|transit/i.test(order.status)?68:cancelled?0:32;
      const progressLabel=cancelled?'Order cancelled':progress===100?'Delivered':progress>40?'On the way':'Order confirmed · Preparing for dispatch';
      return `<article class="order-history-card"><header><div><small>ORDER PLACED</small><strong>${new Date(order.date).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</strong></div><div><small>ORDER NUMBER</small><strong>${escapeHTML(order.id)}</strong></div><div><small>ITEMS</small><strong>${count} ${count===1?'book':'books'}</strong></div><div><small>ORDER TOTAL</small><strong>${money(order.total)}</strong></div><span class="order-state ${cancelled?'is-cancelled':''}">${escapeHTML(order.status)}</span></header><div class="order-history-items">${order.items.map(item=>`<div><span>${escapeHTML(item.title)}<small>by ${escapeHTML(item.author)} · Qty ${item.qty}</small></span><strong>${money(item.price*item.qty)}</strong></div>`).join('')}</div><div class="order-history-progress ${cancelled?'is-cancelled':''}"><div><span style="width:${progress}%"></span></div><small>${progressLabel}</small></div><div class="order-history-actions"><a class="order-track-button" href="utility.html?page=track&order=${encodeURIComponent(order.id)}">View tracking details <span>↗</span></a>${canCancelDemoOrder(order)?`<button class="order-cancel-button" type="button" data-cancel-order="${escapeHTML(order.id)}">Cancel order</button>`:''}</div></article>`;
    }).join('');
    content.innerHTML = `<section class="orders-page"><div class="orders-hero"><span class="eyebrow">YOUR READING JOURNEY</span><h1>My <em>orders.</em></h1><p>Every order, every new story, together in one place.</p><div class="orders-overview"><div><strong>${orders.length}</strong><small>ORDERS PLACED</small></div><div><strong>${bookCount}</strong><small>BOOKS ORDERED</small></div><div><strong>${money(totalSpent)}</strong><small>TOTAL SPENT</small></div></div></div>${orders.length ? `<div class="orders-list-heading"><div><span class="eyebrow">ORDER HISTORY</span><h2>Your recent purchases</h2></div><a href="utility.html?page=track">Track an order ↗</a></div><div class="orders-history">${orderCards}</div>` : `<div class="empty-state empty-orders"><span>↗</span><h2>Your next chapter starts here.</h2><p>Completed demo checkouts will appear in your order history.</p><a class="button button-dark" href="catalog.html?category=All">Explore the shelves <span>↗</span></a></div>`}</section>`;
    content.querySelectorAll('.order-history-card').forEach((card,index)=>{const order=orders[index];card.querySelectorAll('.order-history-items>div').forEach((row,itemIndex)=>{const item=order?.items[itemIndex];if(item)row.querySelector('span')?.insertAdjacentHTML('beforeend',`<small>${escapeHTML(item.category || 'Book')} · ISBN ${escapeHTML(item.isbn || 'Details in your order')}</small>`);});if(order)card.querySelector('.order-history-items')?.insertAdjacentHTML('afterend',`<div class="order-money-details"><span>Items subtotal <strong>${money(order.subtotal ?? order.total)}</strong></span><span>Delivery <strong>${order.shipping===0?'On us':order.shipping?money(order.shipping):'Included'}</strong></span>${order.savings?`<span>You saved <strong>−${money(order.savings)}</strong></span>`:''}</div>`);});
    content.querySelectorAll('[data-cancel-order]').forEach((button)=>button.addEventListener('click',()=>{const id=button.dataset.cancelOrder;if(!confirm(`Cancel demo order ${id}?`))return;if(cancelDemoOrder(id)){toast(`Order ${id} was cancelled.`);renderUtility();}}));
    return;
  }
  else if (page === 'track') {
    content.innerHTML = `<section class="form-panel tracking-panel"><span class="eyebrow">YOUR BOOKS, ON THEIR WAY</span><h1>${headings.track}</h1><p>Enter the demo order number and email to see the latest status for your books.</p><form class="simple-form" id="track-form"><label>Order number<input name="orderId" required placeholder="e.g. OBS-12345678"></label><label>Email address<input name="email" type="email" required placeholder="Email used for your order"></label><button class="button button-dark">Track my order <span>↗</span></button></form><small class="form-footnote">Demo checkout creates an order number in your cart confirmation.</small><div id="tracking-result"></div></section>`;
    const requestedOrder = new URLSearchParams(location.search).get('order'); if (requestedOrder) { content.querySelector('[name="orderId"]').value = requestedOrder; content.querySelector('[name="email"]').value = currentDemoUser().email || ''; }
    const trackingResultNode = content.querySelector('#tracking-result');
    new MutationObserver(() => {
      const panel = content.querySelector('.tracking-result'); if (!panel || panel.querySelector('.tracking-progress')) return;
      const orderId = panel.querySelector('.tracking-result-heading h2')?.textContent; const orderRecord = currentDemoOrders().find((item) => item.id === orderId);
      const status=(orderRecord?.status||'').toLowerCase(); const cancelled=/cancel/.test(status); const stage=/deliver/.test(status)?3:/ship|transit/.test(status)?2:/process|pack|prepar/.test(status)?1:0; const percent=cancelled?22:[18,42,70,100][stage];
      const placed=orderRecord?.date?new Date(orderRecord.date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'Order confirmed';
      const progress=document.createElement('section'); progress.className=`tracking-progress${cancelled?' is-cancelled':''}`;
      progress.innerHTML=`<div class="tracking-progress-top"><div><strong>Delivery journey</strong><small>${cancelled?'This order was cancelled':`Step ${stage+1} of 4 · updates shown for demo`}</small></div><b>${cancelled?'CANCELLED':`${percent}%`}</b></div><div class="tracking-progress-layout"><div class="tracking-progress-track"><span style="height:${percent}%"></span></div></div>`;
      const stepList=panel.querySelector('.order-steps'); const stepCopy=[['Order placed','Your request was received.',placed],['Being prepared','Books are being packed for dispatch.','Usually within 1 business day'],['On the way','The parcel has left our shelf.','Tracking updates appear after dispatch'],['Delivered','Your books have reached their destination.','Estimated in 3–5 business days']];
      stepList.innerHTML=stepCopy.map(([name,detail,date],index)=>`<li><span class="order-step-name">${name}</span><small>${cancelled&&index===1?'Order cancelled on '+new Date(orderRecord.cancelledAt||orderRecord.date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):detail}</small><time>${index===0?placed:date}</time></li>`).join('');
      const layout=progress.querySelector('.tracking-progress-layout'); layout.insertAdjacentElement('beforeend',stepList); panel.querySelector('.tracking-status')?.insertAdjacentElement('afterend',progress);
      const steps=stepList.querySelectorAll('li'); steps.forEach((item,index)=>{item.classList.toggle('complete',!cancelled&&index<stage);item.classList.toggle('current',!cancelled&&index===stage);}); if(cancelled){steps[0].classList.add('complete');steps[1].classList.add('cancelled');panel.classList.add('is-cancelled');}
      const state=panel.querySelector('.tracking-result-heading .order-state'); if(state)state.classList.toggle('is-cancelled',cancelled);
      const statusCopy=panel.querySelector('.tracking-status strong'); if(statusCopy)statusCopy.textContent=cancelled?'This order has been cancelled':stage===3?'Your order has been delivered':stage===2?'Your books are on the way':stage===1?'Your books are being prepared':'Your order is confirmed';
      const statusIcon=panel.querySelector('.tracking-status i'); if(statusIcon&&cancelled)statusIcon.classList.add('is-cancelled');
      const address = panel.querySelector('.tracking-info-grid>div:first-child strong'); if (address && orderRecord?.deliveryAddress) address.textContent = orderRecord.deliveryAddress;
      const eta=panel.querySelector('.tracking-info-grid>div:nth-child(2) strong'); if(eta&&orderRecord?.date){if(cancelled)eta.textContent='No delivery is scheduled';else{const from=new Date(orderRecord.date);const until=new Date(orderRecord.date);from.setDate(from.getDate()+3);until.setDate(until.getDate()+5);eta.textContent=`${from.toLocaleDateString('en-IN',{day:'numeric',month:'short'})} – ${until.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}`;}}
      if (orderRecord) { const breakdown = document.createElement('div'); breakdown.className = 'tracking-cost-breakdown'; breakdown.innerHTML = `<span>Items subtotal <strong>${money(orderRecord.subtotal ?? orderRecord.total)}</strong></span><span>Delivery <strong>${orderRecord.shipping ? money(orderRecord.shipping) : orderRecord.shipping === 0 ? 'On us' : 'At checkout'}</strong></span>${orderRecord.savings ? `<span>You saved <strong>−${money(orderRecord.savings)}</strong></span>` : ''}`; panel.querySelector('.tracking-total')?.insertAdjacentElement('beforebegin', breakdown); panel.querySelectorAll('.tracking-item').forEach((row,index)=>{const item=orderRecord.items[index];if(item?.isbn)row.querySelector('span')?.insertAdjacentHTML('beforeend',`<small>${escapeHTML(item.category || 'Book')} · ISBN ${escapeHTML(item.isbn)}</small>`);}); }
    }).observe(trackingResultNode, { childList:true, subtree:true });
    content.querySelector('#track-form').addEventListener('submit', (event) => {
      event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget));
      const order = currentDemoOrders().find((item) => item.id.toLowerCase() === data.orderId.trim().toLowerCase() && (!item.email || item.email.toLowerCase() === data.email.trim().toLowerCase()));
      const result = content.querySelector('#tracking-result');
      result.innerHTML = order ? `<div class="tracking-result"><div class="tracking-result-heading"><div><span class="eyebrow">ORDER FOUND</span><h2>${escapeHTML(order.id)}</h2></div><span class="order-state">${escapeHTML(order.status)}</span></div><div class="tracking-status"><i></i><strong>Order confirmed and being prepared</strong><span>Placed ${new Date(order.date).toLocaleDateString('en-IN')}</span></div><ol class="order-steps"><li class="complete">Order placed</li><li class="current">Being prepared</li><li>On the way</li><li>Delivered</li></ol><div class="tracking-info-grid"><div><small>DELIVERY ADDRESS</small><strong>${escapeHTML([currentDemoUser().address,currentDemoUser().city,currentDemoUser().postal].filter(Boolean).join(', ') || 'Address will be confirmed during backend checkout')}</strong></div><div><small>ESTIMATED DELIVERY</small><strong>3–5 business days after dispatch</strong></div></div><div class="tracking-items"><h3>Books in this order</h3>${order.items.map((item) => `<div class="tracking-item"><span>${escapeHTML(item.title)}<small>by ${escapeHTML(item.author)} · Qty ${item.qty}</small></span><strong>${money(item.price * item.qty)}</strong></div>`).join('')}</div><div class="tracking-total"><span>Order total</span><strong>${money(order.total)}</strong></div><p class="tracking-demo-note">This is a local demo tracking timeline. Live carrier updates will be connected with the backend.</p></div>` : `<div class="tracking-not-found">No matching demo order found. Check the order number and email, or place a demo order from your cart.</div>`;
      result.innerHTML = order ? `<div class="tracking-result"><div class="tracking-result-heading"><div><span class="eyebrow">ORDER FOUND</span><h2>${escapeHTML(order.id)}</h2></div><span class="order-state ${/cancel/i.test(order.status)?'is-cancelled':''}">${escapeHTML(order.status)}</span></div><div class="tracking-status"><i></i><strong>Order status is being loaded</strong><span>Placed ${new Date(order.date).toLocaleDateString('en-IN')}</span></div><ol class="order-steps"></ol><div class="tracking-info-grid"><div><small>DELIVERY ADDRESS</small><strong>${escapeHTML(order.deliveryAddress || [currentDemoUser().address,currentDemoUser().city,currentDemoUser().postal].filter(Boolean).join(', ') || 'Address will be confirmed during backend checkout')}</strong></div><div><small>ESTIMATED DELIVERY</small><strong>3–5 business days after dispatch</strong></div></div><div class="tracking-items"><h3>Books in this order</h3>${order.items.map((item) => `<div class="tracking-item"><span>${escapeHTML(item.title)}<small>by ${escapeHTML(item.author)} · Qty ${item.qty}</small></span><strong>${money(item.price * item.qty)}</strong></div>`).join('')}</div><div class="tracking-total"><span>Order total</span><strong>${money(order.total)}</strong></div><p class="tracking-demo-note">This is a local demo tracking timeline. Live carrier updates will be connected with the backend.</p>${canCancelDemoOrder(order)?`<button class="order-cancel-button tracking-cancel-button" type="button" data-cancel-order="${escapeHTML(order.id)}">Cancel this order</button>`:''}</div>` : `<div class="tracking-not-found">No matching demo order found. Check the order number and email, or place a demo order from your cart.</div>`;
      result.querySelector('[data-cancel-order]')?.addEventListener('click', (clickEvent)=>{const button=clickEvent.currentTarget;const id=button.dataset.cancelOrder;if(!confirm(`Cancel demo order ${id}?`))return;if(cancelDemoOrder(id)){toast(`Order ${id} was cancelled.`);renderUtility();const form=content.querySelector('#track-form');form.elements.orderId.value=data.orderId;form.elements.email.value=data.email;form.requestSubmit();}});
    });
  }
  else if (page === 'profile') {
    const profile = (() => { try { return JSON.parse(localStorage.getItem('obs-profile') || '{}'); } catch { return {}; } })();
    const keys = ['name','email','phone','birth','address','city','postal']; const completed = keys.filter((key) => profile[key]?.trim()).length; const percent = Math.round(completed / keys.length * 100);
    const orders = currentDemoOrders(); const purchasedCount = orders.filter((order)=>!/^cancel/i.test(order.status||'')).reduce((sum, order) => sum + order.items.reduce((n, item) => n + item.qty, 0), 0); const cartCount = readStore('obs-cart').reduce((sum, item) => sum + item.qty, 0); const wishlistCount = readStore('obs-wishlist').length;
    content.innerHTML = `<section class="profile-dashboard"><aside class="profile-side"><div class="profile-avatar">${escapeHTML((profile.name || 'R').charAt(0).toUpperCase())}</div><span class="eyebrow">READER ACCOUNT</span><h2>${escapeHTML(profile.name || 'Your profile')}</h2><p>${escapeHTML(profile.email || 'Add your email to complete your reader profile.')}</p><div class="profile-progress-label"><strong>Profile completion</strong><b>${percent}%</b></div><div class="profile-progress"><span style="width:${percent}%"></span></div><small>Complete your details for a more personal bookshop experience.</small><a href="utility.html?page=cart">My cart · ${cartCount} books ↗</a><a href="utility.html?page=wishlist">My wishlist · ${wishlistCount} saved ↗</a><a href="utility.html?page=track">Track an order ↗</a></aside><div class="profile-main"><div class="profile-heading"><div><span class="eyebrow">YOUR READER DASHBOARD</span><h1>${headings.profile}</h1><p>Your books, orders, and account details at a glance.</p></div><button class="profile-edit" type="button" data-profile-edit>Edit profile</button></div><div class="profile-stats"><article><small>BOOKS PURCHASED</small><strong>${purchasedCount}</strong><span>Across ${orders.length} demo orders</span></article><article><small>IN YOUR CART</small><strong>${cartCount}</strong><span>Books ready for checkout</span></article><article><small>WISHLIST</small><strong>${wishlistCount}</strong><span>Saved for another day</span></article><article><small>ORDERS</small><strong>${orders.length}</strong><span>Demo order history</span></article></div><section class="profile-order-panel"><div class="profile-subheading"><div><span class="eyebrow">RECENT ACTIVITY</span><h2>Your orders</h2></div><a href="utility.html?page=track">Track an order ↗</a></div>${orders.length ? `<div class="profile-order-list">${orders.slice(0,5).map((order) => `<article><div><strong>${escapeHTML(order.id)}</strong><small>${new Date(order.date).toLocaleDateString('en-IN')} · ${order.items.reduce((sum,item)=>sum+item.qty,0)} books</small></div><span class="order-state">${escapeHTML(order.status)}</span><strong>${money(order.total)}</strong></article>`).join('')}</div>` : '<p class="profile-empty-orders">Your demo orders will appear here after you complete checkout from My Cart.</p>'}</section><form class="simple-form profile-form" id="profile-form"><div class="form-section-title">Personal and delivery details <small>Keep these details current for a smoother checkout</small></div><div class="profile-fields"><label>Full name *<input name="name" required autocomplete="name" value="${escapeHTML(profile.name || '')}" placeholder="Your full name"></label><label>Email address *<input name="email" required type="email" autocomplete="email" value="${escapeHTML(profile.email || '')}" placeholder="you@example.com"></label><label>Contact number<input name="phone" type="tel" autocomplete="tel" value="${escapeHTML(profile.phone || '')}" placeholder="+91 98765 43210"></label><label>Date of birth<input name="birth" type="date" value="${escapeHTML(profile.birth || '')}"></label><label class="profile-address">Delivery address<input name="address" autocomplete="street-address" value="${escapeHTML(profile.address || '')}" placeholder="House, street, area"></label><label>City<input name="city" autocomplete="address-level2" value="${escapeHTML(profile.city || '')}" placeholder="City"></label><label>PIN code<input name="postal" autocomplete="postal-code" value="${escapeHTML(profile.postal || '')}" placeholder="Postal code"></label></div><button class="button button-dark" type="submit">Save profile <span>↗</span></button><span class="profile-save-note">Your preview profile is saved on this device.</span></form></div></section>`;
    content.querySelector('[data-profile-edit]').addEventListener('click', () => { content.querySelector('#profile-form input').focus(); content.querySelector('#profile-form').classList.add('is-editing'); });
    content.querySelector('#profile-form').addEventListener('submit', (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget).entries()); localStorage.setItem('obs-profile', JSON.stringify(data)); toast('Your profile has been saved on this device.'); renderUtility(); });
    return;
  }
  content.querySelectorAll('[data-demo-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault(); const pass = form.querySelector('[name="password"]'); const confirm = form.querySelector('[name="confirmPassword"]');
    if (pass && confirm && pass.value !== confirm.value) { confirm.setCustomValidity('Passwords do not match.'); confirm.reportValidity(); return; }
    confirm?.setCustomValidity('');
    const values = Object.fromEntries(new FormData(form).entries());
    if (page === 'signup') {
      const profile = { ...currentDemoUser(), name: values.name, email: values.email, phone: values.phone };
      localStorage.setItem('obs-profile', JSON.stringify(profile)); sessionStorage.setItem('obs-demo-session', values.email);
      toast('Demo account created on this device.'); setTimeout(() => location.href = 'utility.html?page=profile', 650); return;
    }
    if (page === 'login') {
      const profile = currentDemoUser();
      if (profile.email && profile.email.toLowerCase() !== values.email.toLowerCase()) { toast('No demo account matches that email. Create an account first.'); return; }
      if (!profile.email) localStorage.setItem('obs-profile', JSON.stringify({ ...profile, name: values.email.split('@')[0], email: values.email }));
      sessionStorage.setItem('obs-demo-session', values.email); toast('Signed in to the local demo.'); setTimeout(() => location.href = 'utility.html?page=profile', 650); return;
    }
    form.reset(); toast(page === 'forgot' ? 'Password reset flow is ready for the backend stage.' : 'Thanks! This demo form is ready for the PHP stage.');
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  const page = document.body.dataset.page;
  if (page === 'home') renderHome();
  if (page === 'catalog') renderCatalog();
  if (page === 'book') renderBook();
  if (page === 'utility') renderUtility();
});
