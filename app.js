/**
 * Created by jinyangyu on 2/2/17.
 */
var express = require('express');
var expressLayouts = require('./express-layouts.js');
var router = require('./routes/router.js');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use('/public',express.static('./public'));
var mongodb = require('./mongo');

app.set('views', './views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.get('/', router.home);
var port = process.env.PORT || 8880;

app.get('/input', function (req, res) {
    mongodb.queryAllPlatforms().then(function (item) {
        res.render('input', {
            platforms : item
        })
    })
});
app.post('/registerNewPlatform', function (req, res) {
    console.log(req);
    res.send('done');
});
app.listen(port, function () {
    console.log(port);
});


