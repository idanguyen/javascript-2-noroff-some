const API_BASE_URL = "https://api.noroff.dev/api/v1";

let postContainer = document.querySelector(".postContainer");
let updateContainer = document.querySelector(".updateContainer");

let variable = "helo";

function getParameter(paramenter) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(paramenter);
}

async function getPost() {
  const response = await fetch(
    `${API_BASE_URL}/social/posts/` + getParameter("id") + "?_author=true",
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.token,
      },
      method: "GET",
    }
  );
  const resultat = await response.json();
  return resultat;
}

async function deletePost() {
  const response = await fetch(
    `${API_BASE_URL}/social/posts/` + getParameter("id"),
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.token,
      },
      method: "DELETE",
    }
  );
  window.location.href = "feed.html";
}

async function updatePost() {
  const response = await fetch(
    `${API_BASE_URL}/social/posts/` + getParameter("id"),
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.token,
      },
      method: "PUT",
      body: JSON.stringify({
        title: document.getElementById("update-title").value,
        body: document.getElementById("update-body").value,
        tags: [document.getElementById("update-tags").value],
        media:
          "https://images.unsplash.com/photo-1586985289071-36f62f55ce44?auto=format&fit=crop&q=80&w=3087&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }),
    }
  );
  console.log(response.json());
  displayData();
  updateContainer.innerHTML = "";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

async function displayUpdate() {
  updateContainer.innerHTML = `
  <div class="pt-3">
  <div class="row">
    <div class="col-md-4"></div>
      <div class="input-group mb-3">
      <input
      type="text"
      id="update-title"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
      value="Title"
    />
    </div>
    <div class="col-md-4">
    <textarea class="form-control" rows="2" id="update-body">
    Enter your message...
    </textarea>
    </div>
  </div>
  <div class="pt-3">
  <div class="col-md-4"></div>
      <div class="input-group mb-3">
      <input
      type="text"
      id="update-tags"
      class="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
      value="tags"
    />
    </div>
  <div class="pt-3"></div>
        <button class="btn-primary btn" onclick="updatePost()">
          Update
        </button>
  `;
}

async function displayData() {
  postContainer.innerHTML = "Loading..";
  let post = await getPost();

  let feedDisplay = [];
  let initialFeed = `<div class="card">
  <div class="col-12">
  <div class="card">
  <div class="card-body">`;
  let finalFeed = `</div>
  </div>
  </div>
  </div>`;
  feedDisplay.push(initialFeed);
  feedDisplay.push(`
      <div class="row border-bottom">
      <div class="pb-4"></div>
      <div class="col-md-2">
        <img
          class="rounded-circle shadow-4-strong mb-2"
          src="${post.author.avatar}
          alt="txt"
          style="width: 70px; height: 70px"
        />
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
        >
        ${post.author.name}
        </div>
      </div>
      <div class="col-md-8 cursor-hand">
        <div
          class="fs-4"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${post.id})"
        >
        ${post.title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${post.id})"
        >
        ${post.body}
        </div>
        <img
          src="${post.media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
          onclick="redirectPost(${post.id})"
        />
      </div>
      <div class="col-md-2">
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${post.created.substr(0, 10)}
        </div>
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${post.tags}
        </div>
      </div>
      <div class="pb-4"></div>
    </div>
          `);
  feedDisplay.push(finalFeed);
  postContainer.innerHTML = feedDisplay;
}

displayData();
