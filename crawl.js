const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;
  console.log(`crawl active: ${currentURL}`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `crawl fetch error, code: ${resp.status}, page: ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `crawl fetch non html response, content type: ${contentType}, page: ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.log(`crawl fetch failed: ${error.message}`);
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const urlObj = new URL(baseURL);
  const origin = urlObj.origin;
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const el of linkElements) {
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
  crawlPage,
};
