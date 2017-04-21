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
app.get('/', function (req, res) {
    mongodb.queryAllPlatforms().then(function (item) {
        res.render('home', {
            platforms : item
        })
    })
});
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

// app.post('/approve', function (req, res) {
//     // var feedbackID = req.params.inputID;
//     console.log("approved");
//     var feedbackID = req.body.feedbackID;
//     console.log(feedbackID);
//     mongodb.queryFeedbackFromFeedbacks(feedbackID).then(function (item) {
//         var feedbackName = item.name;
//         console.log(item);
//         console.log(feedbackName);
//         return {feedback:item, feedbackName:feedbackName};
//     }).then(function(item){
//         var platformFound = mongodb.queryPlatformUsingName(item.feedbackName);
//     return {feedback:item.feedback, platformFound: platformFound}}
//     ).then(function (item) {
//         console.log("platformFound");
//         console.log(item.platformFound);
//         if (item.platformFound != null) {
//             mongodb.updatePlatformUsingName();
//         }
//         else {
//             console.log("insert new platform");
//             console.log(item.feedback);
//             mongodb.insertNewPlatform();
//         }
//     });
//     res.render('approve');
// });

app.post('/approve', function (req, res) {
    console.log(req.body);
    console.log(mongodb.queryPlatformUsingName(req.body.name));
});

app.post('/input/:inputID', function (req, res) {
    console.log('here');
    var feedback = req.body;
    var feedbackID = req.params.inputID;
    mongodb.insertFeedbacktoFeedbacks(feedback, feedbackID).then(function () {
        res.send('done');
    });
});

app.get('/input/:inputID', function (req, res) {
    var feedbackID = req.params.inputID;
    mongodb.queryFeedbackFromFeedbacks(feedbackID).then(function (item) {
        res.render('feedback',{
            feedback : item,
            feedbackID : feedbackID
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
})