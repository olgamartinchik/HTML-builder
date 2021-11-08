const fs = require("fs");
const readline = require("readline");
const process = require("process");
const path = require("path");
const projectFile = path.join(__dirname, "project-dist", "bundle.css");
const currentFolder = path.join(__dirname, "styles");

fs.readdir(currentFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (path.extname(file) === ".css") {
      if (projectFile !== undefined) {
        fs.truncate(projectFile, 0, function () {});
      }
      fs.readFile(
        path.join(__dirname, "styles", file),
        "utf-8",
        (err, data) => {
          if (err) throw err;

          fs.appendFile(projectFile, data + "\n", (err) => {
            if (err) throw err;
          });
        }
      );
    } else {
      return;
    }
  });
});
