// у производной readline.createInterface есть метод close
// rl.on('close', () => {
//     console.log('Goodbye!');
//     process.exit(0);
//   });
const fs = require("fs");
const process = require("process");
const readline = require("readline");
const path = require("path");

const file = path.join(__dirname, "data.txt");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let text = "";

// if (file === null) {
fs.open(file, "w", (err, data) => {
  if (err) throw err;
  console.log("File created", data);
});
// }

rl.question("Write something :", function (answer) {
  text += `${answer.split("\n")}`;
  // console.log("!!!!!!", rl.input);
  process.on("exit", (cod) => {
    console.log("Thank you for your valuable feedback:", text);
  });
  if (answer.includes("exit")) {
    console.log("Thank you for your valuable feedback:", text);
    // rl.close();
    process.exit(0);
  }
  // if (answer === "exit\n") {
  //   console.log("Thank you for your valuable feedback:", answer);
  //   process.exit();
  // }

  console.log("text", text);
  fs.appendFile(file, `${text} '\n'`, (err, data) => {
    if (err) throw err;
    console.log("Data has been added!");
  });
});

///
// fs.appendFile(file, `${answer}'\n'`, (err, data) => {
//   if (err) throw err;
//   answer.replace("exit", "");
//   console.log("Data has been added!");
// });
// writeFile.write(`${answer}\n`);
// process.on("exit", () => {
//   console.log("Bye!");
// });
// if (answer.includes("exit")) {
//   console.log("Bye!");
//   rl.close();
// }
