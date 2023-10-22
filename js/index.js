const API_BASE_URL = "https://api.noroff.dev/api/v1";

function initLocalStorage() {
  localStorage.setItem("userName", "");
  localStorage.setItem("email", "");
  localStorage.setItem("password", "");
  localStorage.setItem("token", "");
}

/**
 * Set the username in localstorage
 * @function
 * @param {string} userName - The username.
 */
function setUsername(userName) {
  localStorage.userName = userName;
}

/**
 * Set the email in localstorage
 * @function
 * @param {string} emailInput - The email.
 */
function setEmail(emailInput) {
  localStorage.email = emailInput;
}

/**
 * Set the password in localstorage
 * @function
 * @param {string} password - The password.
 */
function setPassword(password) {
  localStorage.password = password;
}

/**
 * Set the token in localstorage
 * @function
 * @param {string} token - The token.
 */
function setToken(token) {
  localStorage.token = token;
}

/**
 * When you set the email and password, you can attempt a login. If successful you get redirected to the site
 * and you fill in the value of the secret token into the localstorage
 * @function
 */
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
