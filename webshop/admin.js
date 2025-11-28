const orders = JSON.parse(localStorage.getItem("orders") || "[]");
const div = document.getElementById("orders");

orders.forEach(o => {
  div.innerHTML += `<h3>User: ${o.user}</h3><pre>${JSON.stringify(o.items, null, 2)}</pre>`;
});