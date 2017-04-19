/**
 * Created by jinyangyu on 4/19/17.
 */
var surveyJSON = { title: "Machine Learning Cloud-based Platform Recommender", pages: [
    { name:"page1", questions: [
        { type: "radiogroup", isRequired: true, name: "MLKnowledge",
            title: "Do you have machine learning background?",
            colCount: 4, choices: ["Yes", "No"]},
        { type: "rating", isRequired: true, name: "Tune", title: "How much do you value the ability to try different schema?", visibleIf: "{MLKnowledge} == Yes" }
    ]},
    { name: "page2", questions: [
        { type: "rating", isRequired: true, name: "runTime", title: "Do you care about algorithm speed?",
            mininumRateDescription: "Don't care", maximumRateDescription: "As fast as possible"},
        { type: "rating", isRequired: true, name: "accuracy", title: "Do you care about algorithm accuracy?",
            mininumRateDescription: "Don't care", maximumRateDescription: "As accurate as possible"},
        { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" } ] },
    { name: "page3",questions: [
        { type: "rating", isRequired: true, name: "video", title: "How important is video tutorials to you?",
            mininumRateDescription: "Don't care", maximumRateDescription: "Very important"},
        { type: "rating", isRequired: true, name: "document", title: "How important is documentation to you",
            mininumRateDescription: "Don't care", maximumRateDescription: "Very important"},
        { type: "rating", isRequired: true, name: "UI", title: "How important is intuitive user interface to you?",
            mininumRateDescription: "Don't care", maximumRateDescription: "Very important"},
        { type: "rating", isRequired: true, name: "visualization", title: "How important is visualization to you?",
            mininumRateDescription: "Don't care", maximumRateDescription: "Very important"}] },
    { name: "page4",questions: [
        {name:"dataSize", type:"text", inputType:"number", title: "Please enter your data size (MB):", placeHolder:"100MB",
            width:"20%",isRequired: true},
        { type: "checkbox", name: "price", title: "Check the platforms that are within your budget:", isRequired: true,
            colCount: 4, choices: ["Amazon", "Microsoft", "BigML"] },
        { type: "radiogroup", isRequired: true, name: "alg",
            title: "Check the tasks that you need to perform:",
            colCount: 4, choices: ["classification", "clustering", "both"]}] }
]
};


Survey.Survey.cssType = "bootstrap";
var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model:survey,
    onComplete:sendDataToServer
});

var q = survey.getQuestionByName('Tune');
q.rateValues = [1,2,3];
survey.render();

var q = survey.getQuestionByName('runTime');
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

function sendDataToServer(survey) {
    var resultAsString = JSON.stringify(survey.data);
    alert(resultAsString); //send Ajax request to your web server.
};
