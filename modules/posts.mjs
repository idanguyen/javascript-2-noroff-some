import paramenterManagement from "../utils/utils.mjs";
const API_BASE_URL = "https://api.noroff.dev/api/v1";

let postManagement = {
  /**
   * Posting a post to API for social-media at noroff.
   * @function
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} tags - The tags of the post.
   * @param {string} media - The url of a picture for the post.
   */
  postPost: async function (title, body, tags, media) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
        method: "POST",
        body: JSON.stringify({
          title: title, // Required
          body: body, // Optional
          tags: [tags], // Optional
          media: media, // Optional
        }),
      });
    } catch (error) {
      alert(error);
    }
  },
  /**
   * Update a post to API for social-media at noroff.
   * @function
   * @param {string} id - The id of the post.
   * @param {string} title - The title of the post.
   * @param {string} body - The body of the post.
   * @param {string} tags - The tags of the post.
   * @param {string} media - The url of a picture for the post.
   */
  updatePost: async function (id, title, body, tags, media) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts/` + id, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
        method: "PUT",
        body: JSON.stringify({
          title: title, // Required
          body: body, // Optional
          tags: [tags], // Optional
          media: media, // Optional
        }),
      });
    } catch (error) {
      alert(error);
    }
  },
  /**
   * Get a  a post to API for social-media at noroff.
   * @function
   * @param {string} id - The id of the post.
   */
  getPost: async function (id) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/posts/` + id + "?_author=true",
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
    } catch (error) {
      alert(error);
    }
  },
  /**
   * Delete a  a post to API for social-media at noroff.
   * @function
   * @param {string} id - The id of the post.
   */
  deletePost: async function (id) {
    try {
      const response = await fetch(`${API_BASE_URL}/social/posts/` + id, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.token,
        },
        method: "DELETE",
      });
    } catch (error) {
      alert(error);
    }
  },
};

export default postManagement;
