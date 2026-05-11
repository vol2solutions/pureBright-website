/* ========================= */
/* FILE: script.js */
/* ========================= */

const products = [
  { name: "Dishwasher", price: 70 },
  { name: "Sta-Soft", price: 70 },
  { name: "Jik", price: 70 },
  { name: "All Purpose", price: 70 },
  { name: "Laundry Liquid", price: 85 },
  { name: "Handy Andy", price: 70 },
  { name: "Thick Bleach", price: 70 },
  { name: "Lavender", price: 70 },
  { name: "Vanish Spot Remover", price: 85 },
  { name: "Washing Powder (5L)", price: 85 }
];

const cart = [];

const productsGrid = document.getElementById("productsGrid");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");

const sendOrderBtn = document.getElementById("sendOrderBtn");

products.forEach((product, index) => {

  const card = document.createElement("div");

  card.classList.add("product-card");

  card.innerHTML = `
  
    <div class="product-image"></div>

    <h3>${product.name}</h3>

    <div class="product-price">
      R${product.price}
    </div>

    <div class="quantity-box">

      <input 
      type="number" 
      min="1" 
      value="1"
      id="qty-${index}"
      >

      <button 
      class="add-btn"
      onclick="addToCart(${index})"
      >
        Add To Cart
      </button>

    </div>
  
  `;

  productsGrid.appendChild(card);

});


function addToCart(index){

  const qty = parseInt(
    document.getElementById(`qty-${index}`).value
  );

  if(qty < 1) return;

  const existing = cart.find(
    item => item.name === products[index].name
  );

  if(existing){

    existing.qty += qty;

  }else{

    cart.push({
      name: products[index].name,
      price: products[index].price,
      qty: qty
    });

  }

  renderCart();

}


function renderCart(){

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach(item => {

    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `
    
      <span>
        ${item.qty}x ${item.name}
      </span>

      <strong>
        R${item.price * item.qty}
      </strong>
    
    `;

    cartItems.appendChild(div);

  });

  cartTotal.textContent = `R${total}`;
  cartCount.textContent = `${count} Items`;

}


checkoutBtn.addEventListener("click", () => {

  if(cart.length === 0){

    alert("Please add products first.");
    return;

  }

  checkoutModal.style.display = "flex";

});


closeModal.addEventListener("click", () => {

  checkoutModal.style.display = "none";

});


sendOrderBtn.addEventListener("click", () => {

  const customerName =
    document.getElementById("customerName").value;

  const customerArea =
    document.getElementById("customerArea").value;

  const customerNotes =
    document.getElementById("customerNotes").value;

  let total = 0;

  let message =
  `Hello Amy,%0A%0A`;

  message +=
  `I would like to place the following order:%0A%0A`;

  cart.forEach(item => {

    total += item.price * item.qty;

    message +=
    `${item.qty}x ${item.name} - R${item.price * item.qty}%0A`;

  });

  message += `%0ATotal: R${total}%0A%0A`;

  message +=
  `Customer Name: ${customerName}%0A`;

  message +=
  `Area: ${customerArea}%0A`;

  if(customerNotes){

    message +=
    `Notes: ${customerNotes}%0A`;

  }

  message +=
  `%0APlease assist me with delivery details.%0A`;

  const whatsappURL =
  `https://wa.me/27636119934?text=${message}`;

  window.open(whatsappURL, "_blank");

});

/* CART TOGGLE */

const floatingCartBtn =
document.getElementById("floatingCartBtn");

const cartSidebar =
document.getElementById("cartSidebar");

const minimizeCartBtn =
document.getElementById("minimizeCartBtn");


/* OPEN CART */

floatingCartBtn.addEventListener("click", () => {

  cartSidebar.classList.remove("minimized");

});


/* MINIMIZE CART */

minimizeCartBtn.addEventListener("click", () => {

  cartSidebar.classList.add("minimized");

});
