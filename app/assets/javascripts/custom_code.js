//--- Shorthand for $( document ).ready()
$(function() {
  getAllArticles();
  loadArticleOnClick();
});

function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
     showArticle(id);
   });
 }

// Request to show article content on index page
function showArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
    let content = articles["content"];
    toggleArticle(id, content);
  })
  .done(function(content){
    // console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    // console.log(errorThrown);
  });
}

// toggle article in index page
function toggleArticle(id, content){
  let addText = $("#body-" + id);
  let button = $(".js-read-more");
  let article_details = $("#article-details");
  addText.html("<p>" + content + "</p>");

  // toggle action
  if(button.html() === "Read More"){
    addText.show();
    button.html("Read Less");
  }
  // if text is visible then hide it on click
  else{
    addText.hide();
    $(".js-read-more").html("Read More");
  }
}

// Ajax request for loading all article titles, creditors, authors etc on index page
function getAllArticles(id) {
  $("#articlesLink").on('click', function() {
    let id = $(this).data("id");

    })
    .done(function(content){
      console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    });
  });
}
function toggleUserArticles(id, content){
  $.get("/users/" + id + ".json", function(userObj){
    //  save each part of the user Object that you want to spit out on the DOM
    let articles = userObj.articles;

    let credits = articles.map(function(articleObj) {
      if(articleObj.credits.length !== 0){
         return articleObj.credits
      }else{
        return "There are no creditors for this article";
      }
    });
    // spit out the save variables in the
    $.each(articles, function(i, article){
      $(".index-container ").prepend("<p><a href='/users/3/articles/3'>" + article["title"] +"<a>"  + " Credits: " + article.total_credits + "<p>" + article["content"] + "</p>" + "</p>" );
    });
    // toggle action
    if(button.html() === "Read More"){
      addText.show();
      button.html("Read Less");
    }
    // if text is visible then hide it on click
    else{
      addText.hide();
      $(".js-read-more").html("Read More");
    }
}
// '<a href="/users/3/articles/3">article["title"]</a>'
// ============================= FORM =============================
// $(function () {
// function submitForm(){
//    $('form#new_article').submit(function(event) {
//      //prevent form from submitting the default way
//      event.preventDefault();
//      alert("we r hack3rz");
//    });
//  }
//  // });
