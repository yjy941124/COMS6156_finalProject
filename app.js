/**

 * Created by jinyangyu on 2/2/17.

 */

var express = require('express');

var expressLayouts = require('./express-layouts.js');

var router = require('./routes/router.js');

var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressLayouts);

app.use('/public', express.static('./public'));

var mongodb = require('./mongo');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {

        user: 'mlstreet6156@gmail.com',

        pass: 'mlstreettest'

    }

});


app.set('views', './views');  // Specify the folder to find templates

app.set('view engine', 'ejs');    // Set the template engine

app.get('/', function (req, res) {

    mongodb.queryAllPlatforms().then(function (item) {

        res.render('home', {

            platforms: item

        })

    })

});

var port = process.env.PORT || 8880;


app.get('/input', function (req, res) {

    mongodb.queryAllPlatforms().then(function (item) {

        res.render('input', {

            platforms: item

        })

    })

});


app.post('/registerNewPlatform', function (req, res) {

    console.log(req);

    res.send('done');

});


app.post('/approve', function (req, res) {

    mongodb.updatePlatformUsingFeedback(req.body).then(function () {

        res.send('The feedback has been saved!')

    })

});


app.post('/input/:inputID', function (req, res) {

    var feedbackID = req.params.inputID;

    var mailOptions = {

        from: 'mlstreet6156@gmail.com', // sender address

        to: 'mlstreet6156@gmail.com', // list of receivers

        subject: 'Pending feedback approval', // Subject line

        text: "hello", // plain text body

        html: '<a>localhost:8880/input/' + feedbackID + '</a>' // html body

    };

    var feedback = req.body;


    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {

            return console.log(error);

        }

        console.log('Message %s sent: %s', info.messageId, info.response);

    });

    mongodb.insertFeedbacktoFeedbacks(feedback, feedbackID).then(function () {

        res.send('done');

    });

});


app.get('/input/:inputID', function (req, res) {

    var feedbackID = req.params.inputID;


    mongodb.queryFeedbackFromFeedbacks(feedbackID).then(function (item) {

        res.render('feedback', {

            feedback: item,

            feedbackID: feedbackID

        })

    })

});

app.get('/platforms', function (req, res) {

    mongodb.queryAllPlatforms().then(function (item) {

        res.send(item);

    })

});


app.get('/recommendation', function (req, res) {

    res.render('recommendation');

});


app.listen(port);

console.log("Listening on " + port + "!");

console.log("Go to http://localhost:" + port);

