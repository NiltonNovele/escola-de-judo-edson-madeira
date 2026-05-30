const fs = require("fs");
const path = require("path");

const folder = path.join(
    process.cwd(),
    "public/images/martial-fest-2022"
);

const files = fs
    .readdirSync(folder)
    .filter(
        (file) =>
            file.endsWith(".jpg") ||
            file.endsWith(".jpeg") ||
            file.endsWith(".png")
    )
    .sort();

const images = files.map(
    (file) => `/images/martial-fest-2022/${file}`
);

console.log(JSON.stringify(images, null, 2));