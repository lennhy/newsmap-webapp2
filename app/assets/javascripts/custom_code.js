var userObjGlobalVar;

//------------------------------------ DOCUMENT READY

$(function() {
  var userId = $("#articlesLink").attr("data-id");
  submitForm();
  loadAllCurrentlUserArticles(userId);
  loadArticleOnClick();
  loadAllArticlesOnClick();
  loadArticleDetails();
});

function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
     let id = $(this).data("id");
     loadArticle(id);
   });
 }


function loadAllArticlesOnClick() {
  $("#articlesLink").on('click', function() {
    // define new instance of constructor
    let id = $(this).data("id");
    var userArticles = new ToggleAllCurrentUserArticles(userObjGlobalVar);
    // call prototype
    userArticles.renderUserArticles();
  });
}


function loadArticleDetails(){
  $(".article-info").each(function (i, element){
    let id = $(this).data("id");
    $.get("/articles/" + id + ".json", function(articles){
      content = articles["content"];

      let total_credits = (articles["total_credits"]);
      let author = (articles["user"]["name"]);

      $(element).html("Arther: "+author+"</li>" + "<li>Total Credits: "+total_credits)
    })
    .done(function(content){
      console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      console.log(errorThrown);
    });
  });
}


//  ---------------------------------LOAD ARTICLE VIA GET REQUEST

function loadArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
    let content = articles["content"];
    // define new instance of constructor
    var userArticleBody = new ToggleArticleBody(id, content);
    // call the prototype method of this instance
    userArticleBody.renderArticleBody();
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
   $('form.new_credit').submit(function(event) {
      event.preventDefault();

      let artId = $(this).find("span").data("id");
      let values = $(this).serialize();
      let crediting = $.post('/credits', values);

      crediting.done(function(creditObj, textStatus, jqXHR ){

        $('input[type="submit"]').prop("disabled", false);
        loadArticleDetails();

        let articleId = $("#notify-"+artId);

        articleId.css("color", "red");

        if(jqXHR.status === 200){
          if((articleId).html("")){
            articleId.prepend("<p>You have already credited this article</p>").show().fadeOut(5000);
          }
        }
        else if(jqXHR.status === 201){
          if((articleId).html("")){
              articleId.prepend("<p>You have now added a new credit to the article</p>").show().fadeOut(5000);
          }
        }
      });
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
function ToggleArticleBody(artBodyId, content){
  // return the id and content of object from ajax get response
  this.artBodyId = artBodyId;
  this.content = content;
}

// Prototype
ToggleArticleBody.prototype.renderArticleBody = function(){
  let addText = $("#body-" + this.artBodyId);
  let button = $("button#"+this.artBodyId);
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
