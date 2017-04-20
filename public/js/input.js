/**
 * Created by jinyangyu on 4/19/17.
 */
Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";


var surveyJSON = { title: "Submit a new platform that you used!", pages: [
    { name:"page1", questions: [
        { type: "dropdown", name: "name", title: "What platform do you want to rate?", isRequired: true, colCount: 0,
            choices: ["Amazon", "Microsoft", "BigML", "other"]}
    ]},
    { name: "page2", questions: [
        { type: "rating", isRequired: true, name: "MLknowledge",
            title: "Does this platform require machine learning background to use?",
            mininumRateDescription: "Do not need any background knowledge",
            maximumRateDescription: "Need to understand Machine learning terms"},
        { type: "rating", name: "Tune",
            title: "How much flexibility to tune parameters this platform give?",
            mininumRateDescription: "Cannot change parameters at all",
            maximumRateDescription: "A lot of flexibility"},
        { type: "rating", name: "video", title: "Please rate the video tutorial of this platform:",
            mininumRateDescription: "No tutorial or only bad tutorials",
            maximumRateDescription: "Great video tutorials"},
        { type: "rating", name: "document", title: "Please rate the documentation of this platform",
            mininumRateDescription: "No documentation or only bad documentation",
            maximumRateDescription: "Great documentation"},
        { type: "rating", name: "UI", title: "Please rate the user interface of this platform",
            mininumRateDescription: "Hard to use", maximumRateDescription: "Very intuitive"},
        { type: "rating", name: "visualization", title: "Please rate the visualization functionality of this platform",
            mininumRateDescription: "No visualization", maximumRateDescription: "Provide great visualization tools!"}
        ] },
    { name: "page3",questions: [
        { type: "multipletext", name: "speed", title: "What's your recorded speed of this platform?", colCount: 1,
            items: [{ name: "datasize(MB)", title: "What's your datasize?" },
                { name: "runTime", title: "How long is the total runtime of this data?" }]},
        { type: "text", name: "accuracy", title: "Please provide us your recorded accuracy?",
            placeHolder:"0.95", width:"20%"},
        // { type: "text", name: "price", title: "Please provide us your recorded price spent (MB/dollar)?",
        //     placeHolder:"300 (MB/per dollar)", width:"20%"},
        { type: "radiogroup", name: "alg",
            title: "Check the tasks that this platform provide:",
            colCount: 2, choices: ["classification", "clustering", "other"]}]},
]
};

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model:survey,
    onComplete:sendDataToServer
});

var q = survey.getQuestionByName('name');
q.otherText = false;
survey.render();

var q = survey.getQuestionByName('MLknowledge');
q.rateValues = [1,2,3];
survey.render();

var q = survey.getQuestionByName('Tune');
q.rateValues = [1,2,3];
survey.render();

var q = survey.getQuestionByName('accuracy');
q.rateValues = [1,2,3];
survey.render();
var q = survey.getQuestionByName('video');
q.rateValues = [1,2,3];
survey.render();
var q = survey.getQuestionByName('document');
q.rateValues = [1,2,3];
survey.render();
var q = survey.getQuestionByName('UI');
q.rateValues = [1,2,3];
survey.render();
var q = survey.getQuestionByName('visualization');
q.rateValues = [1,2,3];
survey.render();

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function sendDataToServer(survey) {

    var resultAsString = JSON.stringify(survey.data);

    alert(resultAsString); //send Ajax request to your web server.

    var uniqueID = makeid();
    $.ajax({
        type: 'POST',
        url: '/input/'+uniqueID,
        data: resultAsString, // or JSON.stringify ({name: 'jonas'}),
        success: function(data) {
        }, error: function (data) {
            console.log(data);
        },
        contentType: "application/json",
        dataType: 'json'
    });

}