const express = require('express');
const app = express();
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const tradeController = require('../controllers/tradeController')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage});

// upload trade data to db
app.post('/importData', upload.single('file'), tradeController.importData)

// post method to get balance before given timestamp
app.post('/balance', tradeController.checkBalance);


module.exports = app