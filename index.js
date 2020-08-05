var express = require('express')
var multer = require('multer')
var zlib = require('zlib');
let fs = require('fs');
const http = require('http');


var app = express()

//multer
var storage = multer.memoryStorage()
var upload = multer({
  storage: storage
})

app.post('/compress', upload.single('file'), async (req, res) => {
  try {
    const destination = `compressed/${req.file.originalname}.gz`;
    await zlib.gzip(req.file.buffer, async (err, response) => {
      if (err) {
        return res.json('error')
      } else {
        await fs.appendFile(destination, response, (err, data) => {
          if (err) {
            return res.json('error')
          } else {
            res.json(response)

          }
        })
      }

    })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})
app.listen(3000, () => {
  console.log("App is runnuing on port 3000")
})
