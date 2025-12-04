// Basic JS for Car Parts Store
let cart = [];

function toggleMenu(){
  const nav = document.getElementById('navMenu');
  if(!nav) return;
  nav.classList.toggle('open');
}

function searchProducts(){
  const q = document.getElementById('searchBar').value.toLowerCase();
  const items = document.querySelectorAll('.product');
  items.forEach(item => {
    const name = (item.dataset.name || item.querySelector('h3')?.textContent || '').toLowerCase();
    item.style.display = name.includes(q) ? '' : 'none';
  });
}

function addToCart(name, price){
  cart.push({name,price});
  updateCartDisplay();
}

function clearCart(){
  cart = [];
  updateCartDisplay();
}

function updateCartDisplay(){
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');
  if(!container || !totalEl) return;
  if(cart.length === 0){
    container.textContent = 'No items yet.';
    totalEl.textContent = '0';
    return;
  }
  container.innerHTML = '';
  let total = 0;
  cart.forEach((it,idx) => {
    const row = document.createElement('div');
    row.textContent = `${it.name} — $${it.price}`;
    container.appendChild(row);
    total += Number(it.price) || 0;
  });
  totalEl.textContent = total.toFixed(2);
}

window.addEventListener('load', () => {
  updateCartDisplay();
});
