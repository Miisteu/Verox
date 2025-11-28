const WEBHOOK = "https://canary.discord.com/api/webhooks/1443775778973024328/T5Bwvvd2r2VE-QXk7j_VLDZK2tkr89IO-36AFIo84r3UG3a1MtSFHWNAqt7sllCG0iH9";

const products = [
  { name: "Premium Software", prices: { "1 Day": 5, "3 Days": 10, "1 Month": 25, "Lifetime": 75 } }
];

let cart = [];

function generateKey() {
  return Math.random().toString(36).substr(2, 16).toUpperCase();
}

function getExpiration(type) {
  const now = new Date();
  if (type === "1 Day") now.setDate(now.getDate() + 1);
  if (type === "3 Days") now.setDate(now.getDate() + 3);
  if (type === "1 Month") now.setMonth(now.getMonth() + 1);
  if (type === "Lifetime") return "Never";
  return now.toISOString();
}

products.forEach((p, i) => {
  const div = document.createElement("div");
  let options = "";
  for (let k in p.prices) options += `<option>${k} - $${p.prices[k]}</option>`;
  div.innerHTML = `<h3>${p.name}</h3>
  <select id="opt${i}">${options}</select>
  <button onclick="add(${i})">Add to cart</button>`;
  document.getElementById("product-list").appendChild(div);
});

function add(i) {
  const opt = document.getElementById("opt" + i).value.split(" - ");
  cart.push({
    product: products[i].name,
    license: opt[0],
    price: opt[1],
    key: generateKey(),
    expires: getExpiration(opt[0])
  });
}

function checkout() {
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Login first");

  let orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({ user, items: cart, date: new Date() });
  localStorage.setItem("orders", JSON.stringify(orders));

  fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `NEW ORDER from ${user}\n${JSON.stringify(cart, null, 2)}`
    })
  });

  alert("Payment successful (TEST MODE)");
  cart = [];
}