import * as fs from "fs";
import * as path from "path";

const distDir = "./dist/assets";

fs.readdir(distDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(distDir, file);

    if (!file.endsWith(".css") && !file.endsWith(".js")) {
      fs.unlink(filePath, (err) => {
        if (err) return;
      });
    }
  });
});
