var express = require('express')
var multer = require('multer')
var zlib = require('zlib');
let fs = require('fs');

var app = express()

//multer
var storage = multer.memoryStorage()
var upload = multer({
  storage: storage
})

app.post('/compress', upload.single('file'), async (req, res) => {
  try {
    const destination = `compressed/${req.file.originalname}.gz`;
    zlib.gzip(req.file.buffer, (err, response) => {
      fs.appendFile(destination, response, (err, response) => {
        if (err) {
          return res.json('error')
        } else {
          res.json(response)

        }
      })
    })

  } catch (err) {
    console.log(err)
    res.json(err)
  }
})







app.listen(3000, () => {
  console.log("App is runnuing on port 3000")
})


// var listOfFiles = ['firstFile.txt', 'secondFile.txt', 'thirdFile.txt'];

// function compressFile(filename, callback) {
//     var compress = zlib.createGzip(),
//         input = fs.createReadStream(filename),
//         output = fs.createWriteStream(filename + '.gz');

//     input.pipe(compress).pipe(output);

//     if (callback) {
//         output.on('end', callback);
//     }
// }