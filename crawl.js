const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const urlObj = new URL(baseURL);
  const origin = urlObj.origin;
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (el of linkElements) {
    if (el.href.slice(0, 1) === "/") {
      try {
        const isURL = new URL(`${origin}${el.href}`);
        urls.push(isURL.href);
      } catch (error) {
        console.log(`Relative url validation failed: ${error.message}`);
      }
    } else {
      try {
        const isURL = new URL(`${el.href}`);
        urls.push(isURL.href);
      } catch (error) {
        console.log(`Absolute url validation failed: ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
