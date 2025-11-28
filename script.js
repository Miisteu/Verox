const WEBHOOK = "https://canary.discord.com/api/webhooks/1443775778973024328/T5Bwvvd2r2VE-QXk7j_VLDZK2tkr89IO-36AFIo84r3UG3a1MtSFHWNAqt7sllCG0iH9";

let cart = [];
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalDisplay = document.getElementById("total");
const cartPopup = document.getElementById("cart");

// Display products dynamically from config.js
PRODUCTS.forEach((p, index) => {
  const div = document.createElement("div");
  div.className = "product";

  let options = "";
  for (let key in p.licenses) {
    options += `<option value="${p.licenses[key]}">${key} - $${p.licenses[key]}</option>`;
  }

  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.description}</p>
    <select id="license-${index}">${options}</select>
    <button class="add-cart" onclick="addToCart(${index})">Add to Cart</button>
  `;

  productList.appendChild(div);
});

// Add product to cart
function addToCart(index) {
  const dropdown = document.getElementById(`license-${index}`);
  const price = parseFloat(dropdown.value);
  const license = dropdown.options[dropdown.selectedIndex].text;

  const key = generateKey();
  const expires = getExpiration(license);

  cart.push({ product: PRODUCTS[index].name, license, price, key, expires });
  updateCart();
}

// License Key Generator
function generateKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";
  for (let i = 0; i < 16; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key.match(/.{1,4}/g).join("-");
}

// Expiration date
function getExpiration(type) {
  const now = new Date();
  if (type.includes("1 Day")) now.setDate(now.getDate() + 1);
  else if (type.includes("3 Days")) now.setDate(now.getDate() + 3);
  else if (type.includes("1 Month")) now.setMonth(now.getMonth() + 1);
  else return "Never";
  return now.toISOString();
}

// Update cart UI
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.product} (${item.license}) - Key: ${item.key}`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.length;
  totalDisplay.textContent = total.toFixed(2);
}

// Cart popup buttons
document.getElementById("openCart").onclick = () => { cartPopup.style.display = "block"; };
document.getElementById("closeCart").onclick = () => { cartPopup.style.display = "none"; };
document.getElementById("checkout").onclick = () => {
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Login first!");

  // Save orders in localStorage
  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({ user, items: cart, date: new Date() });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Checkout complete! Your license keys are ready.");
  cart = [];
  updateCart();
  cartPopup.style.display = "none";
};
