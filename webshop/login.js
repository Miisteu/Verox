function register() {
  const user = username.value;
  const pass = password.value;

  if (!user || !pass) return alert("Fill all fields");

  localStorage.setItem("user_" + user, pass);
  alert("Registered successfully");
}

function login() {
  const user = username.value;
  const pass = password.value;

  const stored = localStorage.getItem("user_" + user);

  if (stored === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}