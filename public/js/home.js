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
    var speedscores = [];
    var accuracyscores = [];
    var totalscores = [];
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
                videoScore(videoAvg, parseInt(surveyAnswer.video)) +
                documentScore(documentAvg, parseInt(surveyAnswer.document)) +
                UIScore(UIAvg, parseInt(surveyAnswer.UI)) +
                visualizationScore(visualizationAvg, parseInt(surveyAnswer.visualization));

        totalscores.push(score);

        speedscores.push(speedScore(speedAvg, parseInt(surveyAnswer.runTime)));
        accuracyscores.push(accuracyScore(accuracyAvg, parseInt(surveyAnswer.accuracy)));
        var runtime = surveyAnswer.dataSize / speedAvg;
        var satisfyAlg;

        if (surveyAnswer.alg == "both" && platforms[i].alg.length >= 2) {
            satisfyAlg = true;
        } else if (surveyAnswer.alg == "classification" && platforms[i].alg.includes("classification")) {
            satisfyAlg = true;
        } else if (surveyAnswer.alg == "clustering" && platforms[i].alg.includes("clustering")) {
            satisfyAlg = true;
        } else {
            satisfyAlg = false;
        }
        var evaluationSinglePlatform = {
            name : platforms[i].name,
            score : score,
            satisfyAlg : satisfyAlg,
            runtime : runtime,
            MLKnowledge : MLknowledgeAvg,
            speed : speedAvg,
            accuracy : accuracyAvg,
            video : videoAvg,
            document : documentAvg,
            UI : UIAvg,
            visualization : visualizationAvg
        };
        console.log(evaluationSinglePlatform.name + "      " + evaluationSinglePlatform.satisfyAlg);
        evaluation.push(evaluationSinglePlatform);

    }

    var evaluationContent = "";
    var data = [];
    var maxScoreIdx = -1;
    var maxScore = -1;
    for (var i = 0; i < evaluation.length; i++) {
        evaluation[i].speed = surveyAnswer.runTime * evaluation[i].speed / Math.max.apply(Math, speedscores) * 3;
        evaluation[i].accuracy = surveyAnswer.accuracy * evaluation[i].accuracy / Math.max.apply(Math, accuracyscores) * 3;
        evaluation[i].score = evaluation[i].score + evaluation[i].accuracy * surveyAnswer.runTime+ evaluation[i].speed * surveyAnswer.accuracy;
        console.log(evaluation[i].score);
        var singlePlatform = {
            x :['ML skill required','speed','accuracy','video tutorial','documentation','UI','data visualization'],
            y :[evaluation[i].MLKnowledge, evaluation[i].speed, evaluation[i].accuracy,
                evaluation[i].video, evaluation[i].document, evaluation[i].UI, evaluation[i].visualization],
            name : evaluation[i].name,
            type :'bar'
        };
        if (!evaluation[i].satisfyAlg) {
            evaluation[i].score = 0;
        }
        if (maxScore < evaluation[i].score) {
            maxScore = evaluation[i].score;
            maxScoreIdx = i;
        }
        data.push(singlePlatform);
    }
    var layout = {barmode: 'group'};
    Plotly.newPlot('bar-plot', data, layout);

    evaluationContent += "<p>Based on your survey, we recommend you to use : <strong>" + evaluation[maxScoreIdx].name +
            "</strong> Platform.";

    evaluationContent += "<p>We also estimated the time this platform will approximately take you "
        + (Math.round(surveyAnswer.dataSize / evaluation[maxScoreIdx].speed)).toString() + " Seconds to run your experiment." +
        " This estimate is based on the datasize you provided in the survey and our historical records of this platform.</p>";
    evaluationContent += "<p>We are unable to estimate the cost of your experiment. But the cost table should be generally " +
            "easy to access at the platform's website.</p>";
    evaluationContent += "<p>We also provide a bar graph of all different perspectives we considered during" +
        " the recommendation. You can view it below. This bar graph is generated by taking average on all of the" +
        "community feedback we have received so far. If you would like to submit your own feedback and " +
        "to help us improve, please click <a href='/input'>Here</a>. Any feedback is appreciated.</p>";
    for (var i = 0; i <evaluation.length; i++) {
        if (!evaluation[i].satisfyAlg) {
            evaluationContent += "<p>Note, even though the performance of <strong>" + evaluation[i].name + " </strong>might" +
                " be higher than our recommended platform, it does not fit your requirement because it " +
                "does not have the " + surveyAnswer.alg + " algorithm you selected in the survey.</p>"
        }
    }
    $('#evaluation').html(evaluationContent);
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