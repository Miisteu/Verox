function validateKey() {
  const key = document.getElementById("keyInput").value.trim();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const allItems = orders.flatMap(o => o.items);
  const match = allItems.find(i => i.key === key);

  const result = document.getElementById("result");
  if (!match) {
    result.textContent = "Invalid key!";
    result.style.color = "red";
    return;
  }

  const expired = match.expires !== "Never" && new Date(match.expires) < new Date();
  const status = expired ? "Expired" : "Active";

  result.innerHTML = `
    Product: ${match.product} <br>
    License: ${match.license} <br>
    Expires: ${match.expires} <br>
    Status: ${status}
  `;
  result.style.color = expired ? "orange" : "green";
}