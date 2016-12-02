//---------------- DOCUMENT READY

$(function() {
  console.log("your javascript files are responding");
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

function Togglefunction(button, element, stringOne, stringTwo){
  this.button = button;
  this.element = element;
  this.stringOne = stringOne;
  this.stringTwo = stringTwo;

  this.makeToggle = function() {
    if(button.html() === stringOne){
      element.show();
      button.html(stringTwo);
    }
    else{
      element.hide();
      button.html(stringOne);
    }
  }
}
// toggle action
// if(button.html() === "See Your Articles"){
//   container.show();
//   button.html("Hide Your Articles");
// }
// // if text is visible then hide it on click
// else{
//   container.hide();
//   $(".js-read-more").html("See Your Articles");
// }

// toggleUserArticles = new Togglefunction($("#articlesLink"), $(".index-container "));
// toggleUserArticles.Togglefunction();



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

    let toggleUserArticles = new Togglefunction(button, container, "See Your Articles", "Hide Your Articles" );
    toggleUserArticles.makeToggle();

    // toggle action
    // if(button.html() === "See Your Articles"){
    //   container.show();
    //   button.html("Hide Your Articles");
    // }
    // // if text is visible then hide it on click
    // else{
    //   container.hide();
    //   $(".js-read-more").html("See Your Articles");
    // }
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
