//---------------- DOCUMENT READY

$(function() {
  submitForm();
  loadArticleOnClick();
  loadAllArticlesOnClick();
});

function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
     loadArticle(id);
   });
 }

function loadAllArticlesOnClick() {
  $("#articlesLink").on('click', function() {
    let id = $(this).data("id");
    loadAllCurrentlUserArticles(id);
  });
}

//  ----------------LOAD ARTICLE VIA GET REQUEST

function loadArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
    let content = articles["content"];
    toggleArticleBody(id, content);
  })
  .done(function(content){
    // console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    // console.log(errorThrown);
  });
}

//  ----------------TOGGLE ARTICLE

function toggleArticleBody(id, content){
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

//  ----------------LOAD ALL CURRENT USER ARTICLES VIA GET REQUEST

function loadAllCurrentlUserArticles(id) {
  $.get("/users/" + id + ".json", function(userObj){

    toggleAllCurrentUserArticles(userObj);
  })
    .done(function(content){
      console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    });
  }

//  ----------------TOGGLE CURRENT USER ARTICLES

function toggleAllCurrentUserArticles(userObj){
  let button = $("#articlesLink");
  let container =  $(".index-container ");
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
    container.prepend("<p><a href='/users/3/articles/3'>" + article["title"] +"<a>"  + " Credits: " + article.total_credits + "<p>" + article["content"] + "</p>" + "</p>" );
    });

    // toggle action
    if(button.html() === "See Your Articles"){
      container.show();
      button.html("Hide Your Articles");
    }
    // if text is visible then hide it on click
    else{
      container.hide();
      $(".js-read-more").html("See Your Articles");
    }
}


// -------------- FORM FOR ADDING A CREDIT TO ARTICLE

function submitForm(){
   $('form#new_credit').submit(function(event) {
     //prevent form from submitting the default way
    //  event.preventDefault();
     var values = $(this).serialize();
     var crediting = $.post('/credits', values);

     crediting.done(function(data) {
       console.log(data);
  });
});
}
