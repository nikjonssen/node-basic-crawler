const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

test("normalizeURL remove https protocol", () => {
  const input = "https://brannmarkt.netlify.app/about";
  const actual = normalizeURL(input);
  const expected = "brannmarkt.netlify.app/about";
  expect(actual).toEqual(expected);
});

test("normalizeURL remove http protocol", () => {
  const input = "http://brannmarkt.netlify.app/about";
  const actual = normalizeURL(input);
  const expected = "brannmarkt.netlify.app/about";
  expect(actual).toEqual(expected);
});

test("normalizeURL remove trailing slash", () => {
  const input = "https://brannmarkt.netlify.app/";
  const actual = normalizeURL(input);
  const expected = "brannmarkt.netlify.app";
  expect(actual).toEqual(expected);
});

test("normalizeURL capital letters", () => {
  const input = "https://BrAnNmarkt.netlify.app/";
  const actual = normalizeURL(input);
  const expected = "brannmarkt.netlify.app";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="https://brannmarkt.netlify.app/path/"></a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://brannmarkt.netlify.app/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://brannmarkt.netlify.app/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="/path/"></a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://brannmarkt.netlify.app/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://brannmarkt.netlify.app/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute and relative", () => {
  const inputHTMLBody = `
    <html>
      <body>
      <a href="https://brannmarkt.netlify.app/path1/"></a>
        <a href="/path2/"></a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://brannmarkt.netlify.app/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    "https://brannmarkt.netlify.app/path1/",
    "https://brannmarkt.netlify.app/path2/",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
    <html>
      <body>
        <a href="invalid"></a>
      </body>
    </html>
  `;
  const inputBaseURL = "https://brannmarkt.netlify.app/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
