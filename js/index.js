const API_BASE_URL = "https://api.noroff.dev/api/v1";

function initLocalStorage() {
  localStorage.setItem("userName", "");
  localStorage.setItem("email", "");
  localStorage.setItem("password", "");
  localStorage.setItem("token", "");
}

function setUsername(userName) {
  localStorage.userName = userName;
}

function setEmail(emailInput) {
  localStorage.email = emailInput;
}

function setPassword(password) {
  localStorage.password = password;
}

function setToken(token) {
  localStorage.token = token;
}

async function login() {
  setEmail(document.getElementById("email").value);
  setPassword(document.getElementById("password").value);
  const response = await fetch(`${API_BASE_URL}/social/auth/login`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
    body: JSON.stringify({
      email: localStorage.email,
      password: localStorage.password, // Required
    }),
  });
  const resultat = await response.json();
  console.log(resultat);
  setToken(resultat.accessToken);

  if (response.ok) {
    window.location.href = "feed.html";
  }
  if (!response.ok) {
    document.getElementById("error").innerHTML = resultat.errors[0].message;
  }
}

function redirectSignUp() {
  window.location.href = "create-user.html";
}

initLocalStorage();
