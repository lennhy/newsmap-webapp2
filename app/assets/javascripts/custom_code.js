//------------------------------------ DOCUMENT READY

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

//  ---------------------------------LOAD ARTICLE VIA GET REQUEST

function loadArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
    let content = articles["content"];

    // execution of constructor function
    var userArticles = new ToggleArticleBody(id, content);
    userArticles.renderArticleBody();
  })
  .done(function(content){
    // console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    // console.log(errorThrown);
  });
}

//  ---------------------------------- CONSTRUCTOR FUNCTIONS

//  Constructor for toggling body of individual article on index page
function ToggleArticleBody(id, content){
  this.id = id;
  this.content = content;
}

// Use of prototype from ToggleArticleBody constructor
ToggleArticleBody.prototype.renderArticleBody = function(){
  let addText = $("#body-" + this.id);
  let button = $(".js-read-more");
  let article_details = $("#article-details");
  addText.html("<p>" + this.content + "</p>");

  // call on other constructor for toggle action
  var toggleUserArticles = new Togglefunction(button, addText, "Read More", "Read Less" );
  toggleUserArticles.makeToggle();
}

// Constructor function for toggle functionality
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

//  ---------------------------------------LOAD ALL CURRENT USER ARTICLES VIA GET REQUEST

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

//  -------------------------------------------TOGGLE CURRENT USER ARTICLES


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
// toggleArticleBody and toggleAllCurrentUserArticles will be my constructor functions
