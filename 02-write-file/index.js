const fs = require("fs");
const process = require("process");
const readline = require("readline");
const path = require("path");

const file = path.join(__dirname, "data.txt");

const { stdin, stdout } = require("process");
const logger = fs.createWriteStream(file);
const rl = readline.createInterface({ input: stdin, output: stdout });

rl.question("Write something:\n ", (answer) => {
  logger.write(`${answer}\n`);
  rl.on("line", (input) => {
    if (input.includes("exit")) {
      // console.log("Goodbye!");
      rl.close();
    } else {
      // console.log("input", input);

      logger.write(`${answer}\n`);
      logger.write(`${input}\n`);
    }
  }).on("close", () => {
    stdout.write("Goodbye!");
  });
});
