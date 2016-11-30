//--- Shorthand for $( document ).ready()
$(function() {
  getAllArticles();
  loadArticleOnClick()
});

function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
     showArticle(id);
   });
 }

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

// -- Ajax request for loadinf all article titles, creditors, authors etc on index page
function getAllArticles() {
  $.get("/articles.json", function(data){
    let title = data[0]["title"];
    let author = data[0]["user"]["name"];
    let articleDetails = $("#article-details");
    var creditor = function(){
      $.each(data[0]["credits"],  function(i, credit){
        $("#user-type").append("<li>" + "Creditors:" + credit["user"]["name"] + "</li>");
      });
    }
    $("#user-type").append("<li>" + author + "</li>");
    articleDetails.append("<h4>" + title + "</h4>");

  })
  .done(function(content){
    console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    console.log(errorThrown);
  });
}
