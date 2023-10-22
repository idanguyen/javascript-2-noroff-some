import paramenterManagement from "../utils/utils.mjs";
import postManagement from "../modules/posts.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

let feedContainer = document.querySelector(".feedContainer");
let filter = "forest";

/**
 * Initialize the functions for the DOM items
 * @function
 */
function initializeFunctionality() {
  document.getElementById("logout").addEventListener("click", logout, false);
  document
    .getElementById("filter-btn")
    .addEventListener("click", toggleFilter, false);
  document
    .getElementById("search-btn")
    .addEventListener("click", displayFeed, false);
  document.getElementById("post-btn").addEventListener("click", post, false);
}

/**
 * Toggles the filter you want to add tags to your post between two values. Future add custom additoin of
 * tags
 * @function
 */
function toggleFilter() {
  if (filter.localeCompare("forest") === 0) {
    filter = "ocean";
    document.getElementById("filter-btn").innerHTML = "ocean";
  } else if (filter.localeCompare("ocean") === 0) {
    filter = "forest";
    document.getElementById("filter-btn").innerHTML = "forest";
  }
}

/**
 * Function that displays all posts. Consider moving to modules/post, but because it is more than one I kept it here.
 * Returns the list of 100 latest posts
 * @function
 */
async function getPosts() {
  try {
    let uri = `${API_BASE_URL}/social/posts?_author=true`;
    if (paramenterManagement.getParameter("filter") != null) {
      uri = uri + "&_tag=" + paramenterManagement.getParameter("filter");
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

/**
 * Post a post with a title, body and tag chosen from the container.
 * @function
 */
async function post() {
  postManagement.postPost(
    document.getElementById("title-post").value,
    document.getElementById("body-post").value,
    filter,
    "https://cdn.pixabay.com/photo/2023/09/18/20/01/woman-8261342_1280.jpg"
  );
  getPosts();
  setTimeout(displayFeed, 2000);
}

/**
 * Redirect to the specific post where you can delete or update it
 * @function
 * @param {string} id - The id of the post.
 */
function redirectPost(id) {
  window.location.href = "post.html?id=" + id;
}

/**
 * Logs the user out and clears the localstorage so you cant return by using the arrow keys in browser.
 * @function
 */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/**
 * If a search value is added, you get a reduced list of items where
 * first the title is checked and added with search term.
 * Then more posts where the search term in the body is added.
 * @function
 */
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

/**
 * Displays the feed in the feed container
 * @function
 */
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
          id="body-${items[i].id}"        >
        ${items[i].title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
          id="body-${items[i].id}"        >
        ${items[i].body}
        </div>
        <img
          src="${items[i].media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
          id="image-${items[i].id}"        />
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
    addEventListersRedirect(items);
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
          id="title-${feedItems[i].id}"

        >
        ${feedItems[i].title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
          id="body-${feedItems[i].id}"

        >
        ${feedItems[i].body}
        </div>
        <img
          src="${feedItems[i].media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
          id="image-${feedItems[i].id}"
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
    addEventListersRedirect(feedItems);
  }
}

/**
 * Add eventlisteners to the items in the feed.
 * @function
 * @param {Array} items - The items in the feed that require redirect events.
 */
function addEventListersRedirect(items) {
  for (let i = 0; i < items.length; i++) {
    document
      .getElementById("title-" + items[i].id)
      .addEventListener("click", function () {
        redirectPost(items[i].id);
      });
    document
      .getElementById("body-" + items[i].id)
      .addEventListener("click", function () {
        redirectPost(items[i].id);
      });
    document
      .getElementById("image-" + items[i].id)
      .addEventListener("click", function () {
        redirectPost(items[i].id);
      });
  }
}

initializeFunctionality();
displayFeed();
