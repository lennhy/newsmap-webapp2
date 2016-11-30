//--- Shorthand for $( document ).ready()
$(function() {
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
     showArticle(id);
   });
});

//-- Ajax request to show article content on index page
function showArticle(id){
  $.get("/articles/" + id + ".json", function(data){
    let content = data["content"];
    toggleArticle(id, content);
  })

  .done(function(content){
    console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
}

function toggleArticle(id, content){
  let addText = $("#body-" + id);
  let button = $(".js-read-more");
  let article_details = $("#article-details");

  addText.append("<p>" + content + "</p>");
  //-- then check if the body of the text is not visible
  if(button.html() === "Read More"){
    addText.show();
    button.html("Read Less");
  }
  //-- if text is visible then hide it on click
  else{
    addText.hide();
    $(".js-read-more").html("Read More");
  }
}

// function getAllArticles() {
//   $.get("/articles.json", function(data){
//
//   }
// }
  // let title = data["title"];
  // console.log(article_details);
  //-- first make sure the data obj from the ajax reuest is received
  //-- if text is not visible then show it on click
  // article_details.append("<li>" + title + "</li>")
