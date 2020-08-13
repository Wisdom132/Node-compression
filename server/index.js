var express = require("express");
var multer = require("multer");
var zlib = require("zlib");

var cors = require("cors");
let fs = require("fs");
let path = require("path");

var app = express();
app.use(cors());

//multer
var storage = multer.memoryStorage();
var upload = multer({
  storage: storage,
});

app.post("/compress", upload.single("file"), async (req, res) => {
  try {
    const destination = `compressed/${req.file.originalname}.gz`;
    let fileBuffer = req.file.buffer;
    await zlib.gzip(fileBuffer, (err, response) => {
      if (err) {
        console.log(err);
      }
      fs.writeFile(path.join(__dirname, destination), response, (err, data) => {
        if (err) {
          console.log(err);
        }
        res.download(path.join(__dirname, destination));
      });
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


app.listen(3000, () => {
  console.log("App is runnuing on port 3000");
});
