var userObjGlobalVar;
var id;
var content;
//------------------------------------ DOCUMENT READY

$(function() {
  var userId = $(".index-container").attr("data-id");
  // console.log(userId);
  //
  // loadAllCurrentlUserArticles(userId);
  // // console.log("your javascript files are responding");
  // submitForm();
  loadArticleOnClick();
  // loadAllArticlesOnClick();
  id = $(".js-read-more").data("id");
  loadArticle(id);
});

function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
    var userArticleBody = new ToggleArticleBody(id, content);
    // call prototypes
    userArticleBody.renderArticleBody();
   });
 }


function loadAllArticlesOnClick() {
  $("#articlesLink").on('click', function() {
    // define new instance of constructor
      let id = $(this).data("id");
      // console.log(id);
    var userArticles = new ToggleAllCurrentUserArticles(userObjGlobalVar);
    // call prototype
    userArticles.renderUserArticles();
  });
}



//  ---------------------------------LOAD ARTICLE VIA GET REQUEST

function loadArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
    // content should load on click
    // everything else should load when window loads
       content = articles["content"];

      let total_credits = (articles["total_credits"]);
      let aurther = (articles["user"]["name"]);
      $("#credit_detail ul").append("<li>Arther: "+aurther+"</li>" + "<li>Total Credits: "+total_credits+"</li>")

    // let credits = articles["content"];
    // console.log(articles);
    // define new instance of constructor

  })
  .done(function(content){
    // console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    // console.log(errorThrown);
  });
}



//  ---------------------------------------LOAD ALL CURRENT USER ARTICLES VIA GET REQUEST

function loadAllCurrentlUserArticles(userId) {
  $.get("/users/" + userId + ".json", function(userObj){
    userObjGlobalVar = userObj;
    console.log(userId);


    // // define new instance of constructor
    var userArticles = new ToggleAllCurrentUserArticles(userObj);
    // // call prototype
    userArticles.renderUserArticles();
  })
    .done(function(content){
      console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    });
  }




// -------------------------------------- FORM FOR ADDING A CREDIT TO ARTICLE

function submitForm(){
   $('form#new_credit').submit(function(event) {
     event.preventDefault();
     var values = $(this).serialize();
     var crediting = $.post('/credits', values);

     crediting.done(function(creditObj) {
       let total_credits = (creditObj["article"]["total_credits"]);
       let creditor = (creditObj["user"]["name"]);
       $("#credit_detail ul").prepend("<li>Creditor: "+creditor+"</li>")
     });
    //  crediting.fail(function(creditObj) {
    //    let errorMsg ="You have already created this article";
    //    $("#credit_detail ul").prepend(errorMsg);
    //  });
});
}



//  ---------------------------------- OBJECT CONSTRUCTOR FUNCTIONS

// constructor function for articles of user show page
function ToggleAllCurrentUserArticles(userObj){
    // return the articles of object from ajax get response
    this.articles = userObj.articles;
}

//  -------------------------------------------TOGGLE CURRENT USER ARTICLES
// Prototype
ToggleAllCurrentUserArticles.prototype.renderUserArticles = function(){
  let button = $("#articlesLink");
  let container =  $(".index-container ");
  container.html("");
  $.each(this.articles, function(i, article){
    container.prepend("<p><a href='/users/3/articles/3'>" + article["title"] +"<a>"  + " Credits: " + article.total_credits + "<p>" + article["content"] + "</p>" + "</p>" );
  });
  // Call other constructor for toggle action
  var toggleUserArticles = new Togglefunction(button, container, "See Your Articles", "Hide Your Articles" );
  toggleUserArticles.makeToggle();
}





// Constructor for toggling body of individual article on index page
function ToggleArticleBody(id, content){
  // return the id and content of object from ajax get response
  this.id = id;
  this.content = content;
}

// Prototype
ToggleArticleBody.prototype.renderArticleBody = function(){
  let addText = $("#body-" + this.id);
  let button = $("button#"+this.id);
  let article_details = $("#article-details");
  addText.html("<p>" + this.content + "</p>");

  // Call other constructor for toggle action
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
