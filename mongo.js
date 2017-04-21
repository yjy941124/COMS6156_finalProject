/**
 * Created by jinyangyu on 3/23/17.
 */
var config = require('./config.js'); //config file contains all tokens and other private info
// setup MongoDB connection information
var mongodbUrl = 'mongodb://' + config.mongodbHost + ':27017/coms6156';
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

exports.queryAllPlatforms = function () {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var platforms = db.collection('Platforms');
        return platforms.find({}).toArray();
    }).then(function (item) {

        return item;
    })
};
exports.insertNewPlatform = function (platformName) {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var platforms = db.collection('Platforms');
        platforms.insertOne({
            name : platformName
        }).then(function () {

        });
    })
};
exports.insertFeedbacktoFeedbacks = function (feedback, feedbackID) {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var feedbacks = db.collection('Feedbacks');
        var inputSpeed = feedback.datasize/feedback.runTime
        feedbacks.insertOne({
            id : feedbackID,
            name : feedback.name,
            MLknowledge : feedback.MLknowledge,
            Tune: feedback.Tune,
            video: feedback.video,
            document: feedback.document,
            UI: feedback.UI,
            visualization: feedback.visualization,
            speed: inputSpeed,
            accuracy:feedback.accuracy,
            alg:feedback.alg
        });
    })
};
exports.queryFeedbackFromFeedbacks = function (feedbackID) {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var feedbacks = db.collection('Feedbacks');
        return feedbacks.findOne({
            'id' : feedbackID
        });
    })
};

exports.updatePlatformUsingFeedback = function (feedback) {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var platforms = db.collection('Platforms');
        platforms.findOneAndUpdate(
            {name : feedback.name},
            {$push:{
                MLknowledge : feedback.MLknowledge,
                Tune : feedback.Tune,
                video : feedback.video,
                document : feedback.document,
                UI : feedback.UI,
                visualization : feedback.visualization,
                speed : feedback.speed,
                accuracy : feedback.accuracy

            },
            $addToSet:{
                alg : {$each:feedback.alg}
            }},
            {upsert : true}
        ).then(function (item) {

            return item;
        });
    })
};


exports.insertPlatformFromFeedback = function (platformName) {
    return MongoClient.connect(mongodbUrl).then(function (db) {
        var platforms = db.collection('Platforms');
        platforms.insertOne({
            name : platformName
        }).then(function () {

        });
    })
};
exports.updatePlatformUsingName = function () {
    console.log("in update");

}

/*
users.findOneAndUpdate(
    {'_id': new ObjectId(user_id)},
    {
        $pull: {
            subscriptions: {
                bookId: book_id
            }
        }
    },
    {upsert: true})
    .then(function () {
        db.close();
    }).then(function () {
    res.redirect('/books/' + book_id);
});*/
