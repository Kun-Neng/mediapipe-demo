import path from "path";

const __dirname = path.resolve();

function sendFileWithFallback(filePath) {
  return (req, res, next) => {
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
      }
    });
  };
}

export default sendFileWithFallback;
