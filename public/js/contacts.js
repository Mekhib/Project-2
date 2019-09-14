$("#searchBtn").on("click", (function(event) {
    event.preventDefault();
    console.log("you clicked me!")
       var email = $("#search").val()
    console.log(email)

    $.get("/searchresults/" + email, function(data) {
        console.log(data)
    $("#newContact").empty();
    for (var i = 0; i < data.length; i++) {
    console.log(data[i]

    $.get("/searchresults/" + email, function(data) {
        console.log(data)

    $("#newContact").empty();

    for (var i = 0; i < data.length; i++) {
    console.log(data[i])
  
    if (!data.id === 0) {
    $("#newContact").append("Nobody exists with that email, try again :)");
    }
    else {

    $("#newContact").append(data[i].first_name);
    $("#newContact").append("<h2>" + data[i].email + "</h2>");
 }
 }
 })
 }))

    $("#newContact").append(data[i].first_name);
    $("#newContact").append("<h2>" + data[i].email + "</h2>");
   
}
}
})
}))