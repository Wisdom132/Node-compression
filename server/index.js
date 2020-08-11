var express = require('express')
var multer = require('multer')
var zlib = require('zlib');
var cors = require('cors')
let fs = require('fs');
let path = require('path')
const http = require('http');


var app = express()
app.use(cors())

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
        return res.status(500).json({error:err})
      } else {
        await fs.writeFile(path.join(__dirname,destination), response, (err, data) => {
          if (err) {
            return res.status(500).json({error:err})
          } else {
            res.download(path.join(__dirname,destination) );
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
