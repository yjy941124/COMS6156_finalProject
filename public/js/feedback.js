function approve(feedback) {
    console.log(feedback);
    $.ajax({
        type: 'POST',
        url: '/approve',
        data:feedback, // or JSON.stringify ({name: 'jonas'}),
        success: function(data) {
        }, error: function (data) {
            console.log(data);
        }
    });
}
function disapprove() {
    console.log("disapproved")
}