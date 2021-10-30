const fs = require("fs");
const path = require("path");
// console.log(path.join(__dirname, "text.txt"));
const file = path.join(__dirname, "text.txt");
const stream = fs.createReadStream(file, "utf-8");
stream.on("data", (partData) => console.log(partData.trim()));
