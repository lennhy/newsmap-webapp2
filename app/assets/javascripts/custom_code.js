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

function toggleArticle(id, content){
  let addText = $("#body-" + id);
  let button = $(".js-read-more");
  let article_details = $("#article-details");

  addText.html("<p>" + content + "</p>");
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
function getAllArticles(id) {
  $("#articlesLink").on('click', function() {
    var id = $(this).data("id");
    $.get("/users/" + id + ".json", function(userObj){

      var articles = userObj.articles;
      var credits = articles.map(function(articelObj) {
        // console.log(e.credits);
        return articelObj.credits
      });
      $.each(articles, function(i, article){
        // console.log(i, article);
        // credits.map(function(credit){
        //   return credit.user.name;
        // });
        $(".index-container ").prepend("<p><a href='/users/3/articles/3'>" + article["title"] +"<a>"  + " Credits: " + article.total_credits + "</p>" + "<p>" + article["content"] + "</p>");

            // // console.log(article[property]["credits"]);

      //   let userArticles = article.id
          // for (object in article) {
          //   console.log(article[object]);
          //   $(".index-container ").append(article[object]);
          //
          //     // $(".index-container ").append("<a href='/users/3/articles/3'>" + article[property]["title"] + "</a>" + " Credits : " + " " + article[property].total_credits );
          //     // // console.log(article[property]["credits"]);
          //     //   $(".index-container").append("<ul><li>" + "Creditors: " + article[property]["credits"] + "</li></ul>");
          //   }

        //   $.each(article, function(i, article){
        // });
      });

  })
    .done(function(content){
      // console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      // console.log(errorThrown);
    });
  });
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
