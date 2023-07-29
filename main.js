const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    console.log("No website url provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("Too many arguments provided");
    process.exit(1);
  }
  const baseURL = process.argv[2];

  console.log(`crawl started: ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});

  printReport(pages);
}

main();
