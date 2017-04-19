/**
 * Created by jinyangyu on 4/19/17.
 */
Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";
var survey = new Survey.Model({questions:[
    { type: "rating", name: "satisfaction", title: "How satisfied are you with the Product?",
        mininumRateDescription: "Not Satisfied", maximumRateDescription: "Completely satisfied" }]
});

$("#surveyElement").Survey({model:survey});
var q = survey.getQuestionByName('satisfaction');
q.mininumRateDescription = 0;
q.maximumRateDescription = 5;
survey.render();

