const products = [
const cart = [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const orderBtn = document.getElementById("orderBtn");

products.forEach((product, index) => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <h3>${product.name}</h3>
    <div class="product-price">R${product.price}</div>

    <div class="quantity-control">
      <input type="number" min="1" value="1" id="qty-${index}" />
      <button class="add-btn" onclick="addToCart(${index})">
        Add
      </button>
    </div>
  `;

  productGrid.appendChild(card);
});

function addToCart(index) {
  const qty = parseInt(document.getElementById(`qty-${index}`).value);

  if (qty < 1) return;

  const existing = cart.find(item => item.name === products[index].name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: products[index].name,
      price: products[index].price,
      qty
    });
  }

  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.qty}x ${item.name}</span>
      <strong>R${item.price * item.qty}</strong>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `R${total}`;
}

orderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Please add products first.");
    return;
  }

  let message = "Hello Amy,%0A%0AI would like to place an order:%0A%0A";

  cart.forEach(item => {
    message += `- ${item.qty}x ${item.name}%0A`;
  });

  message += "%0APlease assist me with delivery details.%0A%0AThank you.";

  const whatsappURL = `https://wa.me/27636119934?text=${message}`;

  window.open(whatsappURL, "_blank");
});
