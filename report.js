const fs = require("fs");

function textReport(pages) {
  const pagesArr = Object.entries(pages);
  if (pagesArr.length > 0) {
    const fileName = pagesArr[0][0].split("/")[0];
    const sortedPages = sortPages(pages);

    if (fs.existsSync(`reports/${fileName}-report.txt`)) {
      fs.writeFileSync(`reports/${fileName}-report.txt`, "", (err, data) => {
        if (err) return false;
        return true;
      });
    }

    for (const sortedPage of sortedPages) {
      fs.appendFileSync(
        `reports/${fileName}-report.txt`,
        `Found ${sortedPage[1]} links to page ${sortedPage[0]}\n`,
        (err) => {
          if (err) throw err;
          console.log("Data added to report file");
        }
      );
    }

    console.log("Report file created");
  } else {
    return false;
  }
}

function printReport(pages) {
  console.log("==============");
  console.log(" REPORT START");
  console.log("==============");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    console.log(` Found ${sortedPage[1]} links to page ${sortedPage[0]}`);
  }
  console.log("============");
  console.log(" REPORT END");
  console.log("============");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
  textReport,
};
