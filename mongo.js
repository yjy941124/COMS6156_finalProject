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
