const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl");

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

test("normalizeURL capitals", () => {
  const input = "https://BrAnNmarkt.netlify.app/";
  const actual = normalizeURL(input);
  const expected = "brannmarkt.netlify.app";
  expect(actual).toEqual(expected);
});
