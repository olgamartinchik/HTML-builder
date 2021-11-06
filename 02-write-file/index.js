const fs = require("fs");
const process = require("process");
const readline = require("readline");
const path = require("path");

const file = path.join(__dirname, "data.txt");

const { stdin, stdout } = require("process");
const logger = fs.createWriteStream(file);
const rl = readline.createInterface({ input: stdin, output: stdout });

// fs.open(file, "w", (err, data) => {
//   if (err) throw err;
//   console.log("File created", data);
// });

rl.question("Write something:\n ", (answer) => {
  logger.write(`${answer}\n`);
  rl.on("line", (input) => {
    if (input.includes("exit")) {
      console.log("GoodBye!");
      rl.close();
    } else {
      logger.write(`${input}\n`);
    }
  }).on("close", () => {
    stdout.write("Bye!");
  });
});

// rl.question("Write something:\n ", (answer) => {
//   logger.write(`${answer}\n`);
//   rl.on("line", (input) => {
//     if (input === "exit") {
//       rl.close();
//     } else {
//       logger.write(`${input}\n`);
//     }
//   });
//   rl.on("close", () => {
//     stdout.write("Bye!");
//   });
// });
