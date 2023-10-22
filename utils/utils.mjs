let inputParameter = "";

let paramenterManagement = {
  /**
   * Get the parameter from the URI.
   * @function
   * @param {string} parameter - the value in the URI that you want to extract "?parameter=".
   */
  getParameter: function (parameter) {
    let parameters = new URLSearchParams(window.location.search);
    inputParameter = parameter;
    return parameters.get(inputParameter);
  },
};

export default paramenterManagement;
