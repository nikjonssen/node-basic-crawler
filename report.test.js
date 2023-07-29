const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report");

test("sortPages 2 pages", () => {
  const input = {
    "http://www.website.com/path": 1,
    "http://www.website.com": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["http://www.website.com", 3],
    ["http://www.website.com/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "http://www.website.com/path1": 1,
    "http://www.website.com/path3": 3,
    "http://www.website.com/path2": 2,
    "http://www.website.com/path4": 4,
    "http://www.website.com/path5": 5,
  };
  const actual = sortPages(input);
  const expected = [
    ["http://www.website.com/path5", 5],
    ["http://www.website.com/path4", 4],
    ["http://www.website.com/path3", 3],
    ["http://www.website.com/path2", 2],
    ["http://www.website.com/path1", 1],
  ];
  expect(actual).toEqual(expected);
});
