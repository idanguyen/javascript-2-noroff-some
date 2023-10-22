import paramenterManagement from "../utils/utils.mjs";
import postManagement from "../modules/posts.mjs";

const API_BASE_URL = "https://api.noroff.dev/api/v1";

let postContainer = document.querySelector(".postContainer");
let updateContainer = document.querySelector(".updateContainer");

/**
 * Initialize the functions for the DOM items
 * @function
 */
function initializeFunctionality() {
  document
    .getElementById("logout-pst")
    .addEventListener("click", logout, false);
  document
    .getElementById("update-btn")
    .addEventListener("click", displayUpdate, false);
  document
    .getElementById("delete-btn")
    .addEventListener("click", deletepst, false);
}

/**
 * The logout function should be moved to utils. This is a temporary function that serves the same
 * purpose as logout in feed. This is something to improve.
 * @function
 */
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

/**
 * get the post of the post pressed from feed. Id can be read from URI
 * @function
 */
async function getpst() {
  updateContainer.innerHTML = "";
  return postManagement.getPost(paramenterManagement.getParameter("id"));
}

/**
 * delete the post of the post pressed from feed. Id can be read from URI
 * @function. Timeout to wait for api
 */
async function deletepst() {
  postManagement.deletePost(paramenterManagement.getParameter("id"));
  setTimeout(displayData, 1000);
}

/**
 * update the post of the post pressed from feed. The values are read after pressing the function to display them
 * under called displayUpdate(). Timeout to wait for api
 * @function
 */
async function updatepst() {
  postManagement.updatePost(
    paramenterManagement.getParameter("id"),
    document.getElementById("update-title").value,
    document.getElementById("update-body").value,
    document.getElementById("update-tags").value,
    "https://images.pexels.com/photos/5929944/pexels-photo-5929944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  setTimeout(displayData, 1000);
}

/**
 * update the post of the post pressed from feed. This displays where you can edit the item
 * @function
 */
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
        <button class="btn-primary btn" id="update-final-btn">
          Update
        </button>
  `;
  document
    .getElementById("update-final-btn")
    .addEventListener("click", updatepst);
}

/**
 * Display the data from the post you pressed from the feed.
 * @function
 */
async function displayData() {
  postContainer.innerHTML = "Loading..";
  let post = await getpst();

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
        >
        ${post.title}
        </div>
        <div
          class="fs-6"
          style="font-family: FreeMono, monospace; font-weight: 300"
        >
        ${post.body}
        </div>
        <img
          src="${post.media}"
          alt="txt"
          class="img-fluid"
          style="height: 400px"
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

initializeFunctionality();
displayData();
