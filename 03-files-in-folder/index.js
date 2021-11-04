const fs = require("fs");
const path = require("path");
const link = path.join(__dirname, "secret-folder");

console.log(link);

fs.readdir(link, { withFileTypes: true }, (err, files) => {
  console.log("\nCurrent directory files:");
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (!file.isDirectory()) {
        fs.stat(path.join(link, file.name), (err, states) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(states.size);
            console.log(
              `${path.parse(file.name).name} - ${path
                .parse(file.name)
                .ext.replace(".", "")} - ${states.size}`
            );
          }
        });
        // console.log(file.name);
      }
    });
  }
});
