/**
 * Created by jinyangyu on 4/19/17.
 */
Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";


var surveyJSON = { title: "Submit your own feedback!", pages: [
    { name:"page1", questions: [
        { type: "dropdown", name: "name", title: "What platform do you want to rate?", isRequired: true, colCount: 0,
            choices: ["Amazon", "Microsoft", "BigML", "other"]
        }
    ]},
    { name: "page2", questions: [
        { type: "radiogroup", isRequired: true, name: "MLknowledge", title: "Does this platform require having machine learning background?",
            colCount: 1, choices: [{value: 1, text:"Do not need any background knowledge"},
            {value:2, text:"Need basic understanding"},
            {value:3, text:"Need to have machine learning background"}]},
        { type: "radiogroup",isRequired: true, name: "Tune", title: "How much flexibility to tune parameters this platform give?",
            colCount: 1, choices: [{value: 1, text:"Cannot change parameters at all"},
            {value:2, text:"Offer some flexibility"},
            {value:3, text:"A lot of flexibility"}]},
        { type: "radiogroup", isRequired: true, name: "video", title: "How's the video tutorial of this platform:?",
            colCount: 1, choices: [{value: 1, text:"No tutorial or only bad tutorials"},
            {value:2, text:"Can find some good video tutorials"},
            {value:3, text:"A lot of great video tutorials"}]},
        { type: "radiogroup", isRequired: true, name: "document", title: "How's the documentation of this platform:?",
            colCount: 1, choices: [{value: 1, text:"No documentation or only bad documentation"},
            {value:2, text:"Decent documentation"},
            {value:3, text:"A lot of great documentation"}]},
        { type: "radiogroup", isRequired: true, name: "UI", title: "How's the user interface of this platform:?",
            colCount: 1, choices: [{value: 1, text:"Hard to use"},
            {value:2, text:"Average user interface"},
            {value:3, text:"Very intuitive"}]},
        { type: "radiogroup", isRequired: true, name: "visualization", title: "How's the visualization functionality of this platform:?",
            colCount: 1, choices: [{value: 1, text:"No visualization functionality"},
            {value:2, text:"Offer some or a little visualization functionality"},
            {value:3, text:"Provide great visualization functionality!"}]}
        ] },
    { name: "page3",questions: [
        { type: "text", isRequired: true, name: "datasize", inputType:"number", title:"What's your datasize? (MB)", placeHolder:"100",
             width:"20%"},
        { type: "text", isRequired: true, name: "runTime", inputType:"number", title:"How long is the total runtime of this data? (Seconds)",
            placeHolder:"50", width:"20%"},
        { type: "text", isRequired: true, name: "accuracy", inputType:"number", title: "Please provide us your recorded accuracy?",
            placeHolder:"0.95", width:"20%"},
        { type: "checkbox", sRequired: true, name: "alg",
            title: "Check the tasks that this platform provide:",
            colCount: 2, choices: ["classification", "clustering"]}]}
]
};

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model:survey,
    onComplete:sendDataToServer
});

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