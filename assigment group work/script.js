// Cart state
let cart = [];

// Add to cart functionality
const addButtons = document.querySelectorAll('.add');
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product');
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    cart.push({ name, price });
    updateCartCount();
    // Optional: Feedback
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

function updateCartCount() {
  const count = cart.length;
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-count2').textContent = count;
}

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

// Checkout
const checkoutBtn = document.getElementById('checkout');
const success = document.getElementById('success');
checkoutBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    success.style.display = 'block';
    setTimeout(() => {
      success.style.display = 'none';
      cart = [];
      updateCartCount();
      renderCart();
      closeCart();
    }, 3000);
  } else {
    alert('Your cart is empty!');
  }
});

// Order via Message
const orderMsgBtn = document.getElementById('order-message');
orderMsgBtn.addEventListener('click', () => {
  if (cart.length > 0) {
    let msg = 'I would like to order the following items:\n';
    cart.forEach(item => {
      msg += `- ${item.name}: $${item.price.toFixed(2)}\n`;
    });
    msg += `Total: $${document.getElementById('total').textContent}`;
    const textarea = document.querySelector('#contact-form textarea');
    textarea.value = msg;
    closeCart();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  } else {
    alert('Your cart is empty!');
  }
});

// Contact Form Simulation (no backend)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent successfully!');
  contactForm.reset();
});