const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "../dist/index.html");

if (!fs.existsSync(indexPath)) {
  process.exit(0);
}

const html = fs.readFileSync(indexPath, "utf8");
const fixed = html
  .replaceAll('src="/assets/', 'src="./assets/')
  .replaceAll('href="/assets/', 'href="./assets/')
  .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"');

fs.writeFileSync(indexPath, fixed, "utf8");
