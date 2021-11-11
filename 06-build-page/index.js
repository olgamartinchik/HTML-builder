const fs = require("fs");
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
  getCurrentIndex();
  getCurrentAssets();
  getCurrentStyles();
});
function getCurrentAssets() {
  fs.readdir(currentAssets, (err, folders) => {
    if (err) throw err;

    folders.forEach((folder) => {
      // if (folder !== undefined) {
      //   fs.rmdir(folder, (err) => {
      //     if (err) throw err;
      //   });
      // }
      // add folder assets
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
  if (projectIndex !== undefined) {
    fs.truncate(projectIndex, 0, function () {});
  }
  fs.readFile(currentTemplate, "utf-8", (err, data) => {
    if (err) throw err;
    fs.readdir(currentComponents, (err, files) => {
      if (err) throw err;
      const getDataComponents = (fileIdx) => {
        if (fileIdx >= files.length) return;
        const file = files[fileIdx];
        // console.log(fileIdx);

        fs.readFile(
          path.join(__dirname, "components", file),
          "utf-8",
          (err, content) => {
            if (err) throw err;
            let fileName = path.parse(file).name;
            // console.log("fileName", fileName);
            if (data.includes(`{{${fileName}}}`)) {
              let reg = new RegExp(`{{${fileName}}}`);
              data = data.replace(reg, `${content}`);
            }
            fs.writeFile(projectIndex, data, (err) => {
              getDataComponents(fileIdx + 1);
              if (err) throw err;
            });
          }
        );
      };
      getDataComponents(0);
    });
  });
}
