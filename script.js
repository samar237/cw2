 // Cart state
let cart = [];

// Add to cart
const addButtons = document.querySelectorAll('.add');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);

    cart.push({ name, price });
    updateCartCount();

    btn.textContent = 'Added!';
    setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1000);
  });
});

// Cart modal controls
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart');
const closeBtn = document.getElementById('close');
const overlay = cartModal.querySelector('.overlay');

cartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderCart();
  cartModal.classList.add('active');
});

closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function closeCart() {
  cartModal.classList.remove('active');
}

// Update cart count
function updateCartCount() {
  const count = cart.length;
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-count2').textContent = count;
}

// Render cart modal
function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<span>${item.name}</span> <span>$${item.price.toFixed(2)}</span>`;
    list.appendChild(div);
    total += item.price;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

// Order via Text
const orderMessageBtn = document.getElementById('order-message');
orderMessageBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert("Cart is empty!");
  const items = cart.map(i => `${i.name} ($${i.price.toFixed(2)})`).join(', ');
  const message = `Order via Text: ${items}. Total: $${cart.reduce((a,b)=>a+b.price,0).toFixed(2)}`;
  window.location.href = `sms:?&body=${encodeURIComponent(message)}`;
});

// Order via WhatsApp
const orderWhatsAppBtn = document.getElementById('order-whatsapp');
orderWhatsAppBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert("Cart is empty!");
  const items = cart.map(i => `${i.name} ($${i.price.toFixed(2)})`).join(', ');
  const message = `Order via WhatsApp: ${items}. Total: $${cart.reduce((a,b)=>a+b.price,0).toFixed(2)}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
});
