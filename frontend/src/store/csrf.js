import Cookies from "js-cookie";


//"..store/csrf.js"
// easier way to use csrffetch for most of my purposes
export async function ezFetch(url, method = "GET", body) {
  return await csrfFetch(url, { method, body });
}

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || "GET";
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // set appropriate headers when the method isn't get
  if (options.method.toUpperCase() !== "GET") {
    // support multipart form data
    if (options.headers["Content-Type"] === "multipart/form-data") {
      delete options.headers["Content-Type"];
    } else {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }

  // regular old boring fetch call
  const res = await window.fetch(url, options);

  // throw the error as a response if 400+
  if (res.status >= 400) throw res;
  // otherwise just return it
  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}
