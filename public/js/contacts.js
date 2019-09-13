// $("#searchBtn").on("click", (function(event) {
//     event.preventDefault();
//     console.log("you clicked me!")
//        var email = $("#search").val()
//     console.log(email)
//     $.get("/searchresults/" + email, function(data) {
//         console.log(data)
//         renderContacts(data);
//     })
// }))
    
// function renderContacts(data) {
//     if (data.length !== 0) {
  
//       $("#info").empty();
//       $("#info").show();
  
//       for (var i = 0; i < data.length; i++) {

//         $("desc").append("<h3>" + "Contact Search Results" + "<h3>");
//         $("desc").append("<h2>" + data[i].first_name + " " + data[i].last_name + "</h2>");
//         $("desc").append("<p>Author: " + data[i].email + "</p>");
//         $("desc").append("<button class='delete' data-id='" + data[i].id + "'>DELETE BOOK</button>");
  
//         // $("#info").append(div);
  
//       }
  
//       $(".delete").click(function() {
  
//         $.ajax({
//           method: "DELETE",
//           url: "/api/book/" + $(this).attr("data-id")
//         })
//           // On success, run the following code
//           .then(function() {
//             console.log("Deleted Successfully!");
//           });
  
//         $(this).closest("div").remove();
  
//       });
  
//     }
//   }

$("#searchBtn").on("click", (function(event) {
    event.preventDefault();
    console.log("you clicked me!")
       var email = $("#search").val()
    console.log(email)

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