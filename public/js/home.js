/**
 * Created by jinyangyu on 4/19/17.
 */
var platforms;
var surveyJSON = {
    title: "Machine Learning Cloud-based Platform Recommender", pages: [
        {
            name: "page1", questions: [
            {
                type: "radiogroup", isRequired: true, name: "MLKnowledge",
                title: "Do you have machine learning background?",
                colCount: 4, choices: ["Yes", "No"]
            },
            {
                type: "rating",
                isRequired: true,
                name: "Tune",
                title: "How much do you value the ability to try different schema?",
                visibleIf: "{MLKnowledge} == Yes"
            }
        ]
        },
        {
            name: "page2", questions: [
            {
                type: "rating", isRequired: true, name: "runTime", title: "Do you care about algorithm speed?",
                mininumRateDescription: "Don't care", maximumRateDescription: "As fast as possible"
            },
            {
                type: "rating", isRequired: true, name: "accuracy", title: "Do you care about algorithm accuracy?",
                mininumRateDescription: "Don't care", maximumRateDescription: "As accurate as possible"
            },
            {
                type: "checkbox",
                choices: ["AngularJS", "KnockoutJS", "React"],
                hasOther: true,
                isRequired: true,
                name: "mvvm",
                title: "What MVVM framework do you use?",
                visibleIf: "{mvvmUsing} = 'Yes'"
            }]
        },
        {
            name: "page3", questions: [
            {
                type: "rating", isRequired: true, name: "video", title: "How important is video tutorials to you?",
                mininumRateDescription: "Don't care", maximumRateDescription: "Very important"
            },
            {
                type: "rating", isRequired: true, name: "document", title: "How important is documentation to you",
                mininumRateDescription: "Don't care", maximumRateDescription: "Very important"
            },
            {
                type: "rating",
                isRequired: true,
                name: "UI",
                title: "How important is intuitive user interface to you?",
                mininumRateDescription: "Don't care",
                maximumRateDescription: "Very important"
            },
            {
                type: "rating",
                isRequired: true,
                name: "visualization",
                title: "How important is visualization to you?",
                mininumRateDescription: "Don't care",
                maximumRateDescription: "Very important"
            }]
        },
        {
            name: "page4", questions: [
            {
                name: "dataSize",
                type: "text",
                inputType: "number",
                title: "Please enter your data size (MB):",
                placeHolder: "100MB",
                width: "20%",
                isRequired: true
            },
            {
                type: "radiogroup", isRequired: true, name: "alg",
                title: "Check the tasks that you need to perform:",
                colCount: 4, choices: ["classification", "clustering", "both"]
            }]
        }
    ]
};
Survey.Survey.cssType = "bootstrap";
var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: makeRecommendation
});

var q = survey.getQuestionByName('Tune');
q.rateValues = [1, 2, 3];
survey.render();

var q = survey.getQuestionByName('runTime');
q.rateValues = [1, 2, 3];
survey.render();
var q = survey.getQuestionByName('accuracy');
q.rateValues = [1, 2, 3];
survey.render();
var q = survey.getQuestionByName('video');
q.rateValues = [1, 2, 3];
survey.render();
var q = survey.getQuestionByName('document');
q.rateValues = [1, 2, 3];
survey.render();
var q = survey.getQuestionByName('UI');
q.rateValues = [1, 2, 3];
survey.render();
var q = survey.getQuestionByName('visualization');
q.rateValues = [1, 2, 3];
survey.render();

function makeRecommendation(survey) {
    var surveyAnswer = JSON.parse(JSON.stringify(survey.data));
    console.log(surveyAnswer);
    //Define arrays for the N platforms.
    var MLknowledges = [];
    var Tunes = [];
    var videos = [];
    var documents = [];
    var UIs = [];
    var visualizations = [];
    var speeds = [];
    var accuracys = [];
    var algs = [];
    var evaluation = [];
    for (var i = 0; i < platforms.length; i++) {
        var MLknowledgeAvg = (platforms[i].MLknowledge).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].MLknowledge.length;
        MLknowledges.push(MLknowledgeAvg);
        var TuneAvg = (platforms[i].Tune).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].Tune.length;
        Tunes.push(TuneAvg);
        var videoAvg = (platforms[i].video).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].video.length;
        videos.push(videoAvg);
        var documentAvg = (platforms[i].document).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].document.length;
        documents.push(documentAvg);
        var UIAvg = (platforms[i].UI).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].UI.length;
        UIs.push(UIAvg);
        var visualizationAvg = (platforms[i].visualization).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].visualization.length;
        visualizations.push(visualizationAvg);
        var speedAvg = (platforms[i].speed).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].speed.length;
        speeds.push(speedAvg);
        var accuracyAvg = (platforms[i].accuracy).map(Number).reduce(function (a, b) {
                return a + b;
            }) / platforms[i].accuracy.length;
        accuracys.push(accuracyAvg);

        var score = 0;

        score = MLKnowledgeScore(surveyAnswer.MLKnowledge, TuneAvg, MLknowledgeAvg, parseInt(surveyAnswer.Tune)) +
                speedScore(speedAvg, parseInt(surveyAnswer.runTime)) +
                accuracyScore(accuracyAvg, parseInt(surveyAnswer.accuracy)) +
                videoScore(videoAvg, parseInt(surveyAnswer.video)) +
                documentScore(documentAvg, parseInt(surveyAnswer.document)) +
                UIScore(UIAvg, parseInt(surveyAnswer.UI)) +
                visualizationScore(visualizationAvg, parseInt(surveyAnswer.visualization));
        console.log('total score of ' +platforms[i].name +' is ' + score);
        var runtime = surveyAnswer.dataSize / speedAvg;
        var satisfyAlg;
        console.log(surveyAnswer.alg);
        console.log(platforms[i].alg.length);
        if (surveyAnswer.alg == "both" && platforms[i].alg.length == 2) {
            satisfyAlg = true;
        } else if (surveyAnswer.alg == "classification" && platforms[i].alg.includes("classification")) {
            satisfyAlg = true;
        } else if (surveyAnswer.alg == "clustering" && platforms[i].alg.includes("clustering")) {
            satisfyAlg = true;
        } else {
            satisfyAlg = false;
        }
        var evaluationSinglePlatform = {
            score : score,
            satisfyAlg : satisfyAlg,
            runtime : runtime
        };

        evaluation.push(evaluationSinglePlatform);

    }
    console.log(evaluation[0]);
    console.log(evaluation[1]);
    console.log(evaluation[2]);


}
function MLKnowledgeScore(knowML, tune, MLKnowedge, weight) {
    var MLscore = 0;
    var blackboxWeight = 3;
    var blackboxscore = 4 - MLKnowedge;
    if (knowML == "Yes") {
        MLscore = weight * tune;
    } else {
        MLscore = blackboxWeight * blackboxscore;
    }
    return MLscore;
}
function videoScore(video, weight) {
    var videoscore;
    videoscore = video * weight;

    return videoscore;
}
function documentScore(document, weight) {
    var documentscore = document * weight;
    return documentscore;
}
function UIScore(UI, weight) {
    var UIscore = UI * weight;
    return UIscore;
}
function visualizationScore(visualization, weight) {
    var visualizationscore = visualization * weight;
    return visualizationscore;
}
function speedScore(speed, weight) {
    var speedscore = speed * weight;
    return speedscore;
}
function accuracyScore(accuracy, weight) {
    return accuracy * weight;
}

$(document).ready(function () {

    $.ajax({
        type: 'GET',
        url: '/platforms',

        success: function (data) {
            platforms = data;

        }, error: function (data) {
        },
        contentType: "application/json",
        dataType: 'json'
    });


});