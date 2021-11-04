const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "files-copy");

fs.mkdir(file, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  //   console.log("folder added");
  const copyFiles = path.join(__dirname, "files-copy");
  fs.readdir(copyFiles, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join(copyFiles, file), (err) => {
        if (err) throw err;
      });
    });
  });

  getCurrentFilenames();
});

function getCurrentFilenames() {
  //   console.log("Current Filenames:\n");
  const file = path.join(__dirname, "files");

  fs.readdir(file, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      fs.copyFile(
        path.join(__dirname, "files", file),
        path.join(__dirname, "files-copy", file),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    });
  });
}
