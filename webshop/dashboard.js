const user = localStorage.getItem("currentUser");
if (!user) {
  alert("Please login first");
  window.location.href = "login.html";
}

const orders = JSON.parse(localStorage.getItem("orders") || "[]");
const userOrders = orders.filter(o => o.user === user);
const div = document.getElementById("license-list");

if (userOrders.length === 0) div.innerHTML = "<p>You have no licenses yet.</p>";

userOrders.forEach(order => {
  order.items.forEach(item => {
    const expired = item.expires !== "Never" && new Date(item.expires) < new Date();
    const status = expired ? "Expired" : "Active";
    const p = document.createElement("p");
    p.textContent = `${item.product} | ${item.license} | Key: ${item.key} | Expires: ${item.expires} | Status: ${status}`;
    div.appendChild(p);
  });
});

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}