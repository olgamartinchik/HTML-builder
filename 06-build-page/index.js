const fs = require("fs");
const readline = require("readline");
const process = require("process");
const path = require("path");
const projectFolder = path.join(__dirname, "project-dist", "assets");
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
    let arrComponents = {};
    if (err) throw err;
    files.forEach((file) => {
      fs.readFile(
        path.join(__dirname, "components", file),
        "utf-8",
        (err, content) => {
          if (err) throw err;
          let fileName = path.parse(file).name;
          arrComponents[`${fileName}`] = content;
        }
      );
    });
    fs.readFile(currentTemplate, "utf-8", (err, data) => {
      if (err) throw err;
      for (let key in arrComponents) {
        // console.log("wwwww", key);
        if (arrComponents.hasOwnProperty(key)) {
          if (data.includes(`{{${key}}}`)) {
            data = data.replace(`{{${key}}}`, arrComponents[key]);
            // console.log("aaaa", arrComponents[key]);
          }
        }
      }
      fs.appendFile(projectIndex, data, (err) => {
        if (err) throw err;
        // console.log("arrComponents", arrComponents);
      });
    });
  });
}
