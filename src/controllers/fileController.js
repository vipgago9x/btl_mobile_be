const fs = require("fs");
const viewFile = async (req, res) => {
  let filepath = `src/assets/images/${req.params.filename}`;
  let stat = fs.statSync(filepath);
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Content-Length": stat.size,
  });
  let readStream = fs.createReadStream(filepath);
  readStream.pipe(res);
};

module.exports = {
  viewFile,
};
