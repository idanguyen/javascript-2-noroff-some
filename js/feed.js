const API_BASE_URL = "https://api.noroff.dev/api/v1";

let feedContainer = document.querySelector(".feedContainer");
let filter = "forest";

function getParameter(paramenter) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(paramenter);
}

function toggleFilter() {
  if (filter.localeCompare("forest") === 0) {
    filter = "ocean";
    document.getElementById("filter").innerHTML = "ocean";
  } else if (filter.localeCompare("ocean") === 0) {
    filter = "forest";
    document.getElementById("filter").innerHTML = "forest";
  }
}

async function getPosts() {
  try {
    let uri = `${API_BASE_URL}/social/posts?_author=true`;
    if (getParameter("filter") != null) {
      uri = uri + "&_tag=" + getParameter("filter");
    }
    const response = await fetch(uri, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.token,
      },
      method: "GET",
    });
    const resultat = await response.json();
    return resultat;
  } catch (error) {
    alert(error);
  }
}

async function postPost() {
  try {
    const response = await fetch(`${API_BASE_URL}/social/posts`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.token,
      },
      method: "POST",
      body: JSON.stringify({
        title: document.getElementById("title-post").value, // Required
        body: document.getElementById("body-post").value, // Optional
        tags: [filter], // Optional
        media:
          "https://cdn.pixabay.com/photo/2023/09/18/20/01/woman-8261342_1280.jpg", // Optional
      }),
    });
    displayFeed();
  } catch (error) {
    alert(error);
  }
}

function redirectPost(id) {
  window.location.href = "post.html?id=" + id;
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

async function returnSearch() {
  let filteredItems = [];
  let searchFilter = document.getElementById("search-q").value;
  let feedItems = await getPosts();

  for (let i = 0; i < feedItems.length; i++) {
    if (await feedItems[i].title.includes(searchFilter)) {
      filteredItems.push(feedItems[i]);
    }
  }
  for (let i = 0; i < feedItems.length; i++) {
    try {
      if (await feedItems[i].body.includes(searchFilter)) {
        filteredItems.push(feedItems[i]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return filteredItems;
}

async function displayFeed() {
  feedContainer.innerHTML = "Loading..";
  let feedItems = await getPosts();
  let searchFilter = document.getElementById("search-q").value;

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

  if (searchFilter !== "") {
    let items = [];
    items = await returnSearch();
    for (let i = 0; i < items.length; i++) {
      feedDisplay.push(`
      <div class="row border-bottom">
      <div class="pb-4"></div>
      <div class="col-md-2">
        <img
          class="rounded-circle shadow-4-strong mb-2"
          src="${items[i].author.avatar}
          alt="txt"
          style="width: 70px; height: 70px"
        />
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
        >
        ${items[i].author.name}
        </div>
      </div>
      <div class="col-md-8 cursor-hand">
        <div
          class="fs-4"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${items[i].id})"
        >
        ${items[i].title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${items[i].id})"
        >
        ${items[i].body}
        </div>
        <img
          src="${items[i].media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
          onclick="redirectPost(${items[i].id})"
        />
      </div>
      <div class="col-md-2">
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${items[i].created.substr(0, 10)}
        </div>
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${items[i].tags}
        </div>
      </div>
      <div class="pb-4"></div>
    </div>
          `);
    }
    feedDisplay.push(finalFeed);
    feedContainer.innerHTML = feedDisplay;
  } else {
    for (let i = 0; i < feedItems.length; i++) {
      feedDisplay.push(`
      <div class="row border-bottom">
      <div class="pb-4"></div>
      <div class="col-md-2">
        <img
          class="rounded-circle shadow-4-strong mb-2"
          src="${feedItems[i].author.avatar}
          alt="txt"
          style="width: 70px; height: 70px"
        />
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
        >
        ${feedItems[i].author.name}
        </div>
      </div>
      <div class="col-md-8 cursor-hand">
        <div
          class="fs-4"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${feedItems[i].id})"
        >
        ${feedItems[i].title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
          onclick="redirectPost(${feedItems[i].id})"
        >
        ${feedItems[i].body}
        </div>
        <img
          src="${feedItems[i].media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
          onclick="redirectPost(${feedItems[i].id})"
        />
      </div>
      <div class="col-md-2">
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${feedItems[i].created.substr(0, 10)}
        </div>
        <div
          class="fs-6 fw-lighter"
          style="font-family: FreeMono, monospace; font-weight: 100"
        >
        ${feedItems[i].tags}
        </div>
      </div>
      <div class="pb-4"></div>
    </div>
          `);
    }
    feedDisplay.push(finalFeed);
    feedContainer.innerHTML = feedDisplay;
  }
}
displayFeed();
