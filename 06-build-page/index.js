const fs = require("fs");
const readline = require("readline");
const process = require("process");
const path = require("path");
const projectFolder = path.join(__dirname, "project-dist");
const projectStyles = path.join(__dirname, "project-dist", "style.css");
const projectIndex = path.join(__dirname, "project-dist", "index.html");
const currentAssets = path.join(__dirname, "assets");
const currentStyles = path.join(__dirname, "styles");
const currentComponents = path.join(__dirname, "components");
const currentTemplate = path.join(__dirname, "template.html");

fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
  //   console.log("projectFile", projectFolder);
  if (projectIndex !== undefined) {
    fs.truncate(projectIndex, 0, function () {});
  }
  getCurrentAssets();
  getCurrentStyles();
  getCurrentIndex();
});
function getCurrentAssets() {
  fs.readdir(currentAssets, (err, folders) => {
    if (err) throw err;
    folders.forEach((folder) => {
      //add folder assets
      fs.mkdir(
        path.join(__dirname, "project-dist", "assets", folder),
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      //read subfolders
      fs.readdir(path.join(__dirname, "assets", folder), (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          fs.copyFile(
            path.join(__dirname, "assets", folder, file),
            path.join(__dirname, "project-dist", "assets", folder, file),
            (err) => {
              if (err) throw err;
            }
          );
        });
      });
    });
  });
}
function getCurrentStyles() {
  fs.readdir(currentStyles, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (path.extname(file) === ".css") {
        if (projectStyles !== undefined) {
          fs.truncate(projectStyles, 0, function () {});
        }
        fs.readFile(
          path.join(__dirname, "styles", file),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            fs.appendFile(projectStyles, data + "\n", (err) => {
              if (err) throw err;
            });
          }
        );
      } else {
        return;
      }
    });
  });
}

function getCurrentIndex() {
  fs.readdir(currentComponents, (err, files) => {
    let header;
    let articles;
    let footer;
    if (err) throw err;
    files.forEach((file) => {
      fs.readFile(
        path.join(__dirname, "components", file),
        "utf-8",
        (err, content) => {
          if (err) throw err;
          let fileName = path.parse(file).name;
          //   console.log(path.parse(file).name);
          if (fileName === "header") {
            header = content;
          }
          if (fileName === "articles") {
            articles = content;
          }
          if (fileName === "footer") {
            footer = content;
          }
        }
      );
    });
    fs.readFile(currentTemplate, "utf-8", (err, data) => {
      if (err) throw err;

      if (data.includes("{{header}}")) {
        data = data.replace(/{{header}}/g, header);
      }
      if (data.includes("{{articles}}")) {
        data = data.replace(/{{articles}}/g, articles);
      }
      if (data.includes("{{footer}}")) {
        data = data.replace(/{{footer}}/g, footer);
      }

      fs.appendFile(projectIndex, data, (err) => {
        if (err) throw err;
      });
    });

    // if (data.includes("{{header}}") && fileName.includes("header")) {
    //   console.log(
    //     data.includes("{{header}}"),
    //     fileName.includes("header")
    //   );
    //   data.replace("{{header}}", content);
    // }
    // if (
    //   data.includes("{{articles}}") &&
    //   fileName.includes("articles")
    // ) {
    //   data.replace("{{articles}}", content);
    // }
    // if (data.includes("{{footer}}") && fileName.includes("footer")) {
    //   data.replace("{{footer}}", content);
    // }
  });
}
