var express = require('express')
var multer = require('multer')

const {
    createGzip
} = require('zlib');
const {
    pipeline
} = require('stream');
let path = require('path')

const {
    createReadStream,
    createWriteStream
} = require('fs');


var storage = multer.memoryStorage()
var upload = multer({
    storage: storage
})

var app = express()


const {
    promisify
} = require('util');
const pipe = promisify(pipeline);


async function do_gzip(input, output) {
    const gzip = createGzip();
    const source = createReadStream(

    );
    const destination = createWriteStream(output);
    await pipe(source, gzip, destination);
}

app.post('/compress', upload.single('file'), (req, res) => {
    do_gzip(req.file.buffer, `compressed/${req.file.originalname}.gz`)
        .catch((err) => {
            console.error('An error occurred:', err);
            process.exitCode = 1;
        });
})


app.listen(3000, () => {
    console.log("testApp is runnuing on port 3000")
})