const API_BASE_URL = "https://api.noroff.dev/api/v1";

async function createUser() {
  const response = await fetch(`${API_BASE_URL}/social/auth/register`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("username").value, // Required
      email: document.getElementById("email").value, // Required
      password: document.getElementById("password").value, // Required
    }),
  });
  const resultat = await response.json();
  if (response.ok) {
    window.location.href = "index.html";
  }
  if (!response.ok) {
    document.getElementById("error").innerHTML = resultat.errors[0].message;
  }
}

initLocalStorage();
