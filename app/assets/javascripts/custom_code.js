// GLOBAL VARIABLES
var userObjGlobalVar;

//------------------------------------ DOCUMENT READY IN VANILA JAVASCRIPT

$(function() {
  var userId = $("#articlesLink").attr("data-id");
  submitForm();
  loadAllCurrentlUserArticles(userId);
  loadArticleOnClick();
  loadAllArticlesOnClick();
  loadArticleDetails();
});

// ----------------------------------- LOAD ARTICLE DATA ONTO DOM

// Load single article on click
function loadArticleOnClick(){
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
    loadArticle(id);
  });
}

// Load all articles on click
function loadAllArticlesOnClick() {
  $("#articlesLink").on('click', function() {
    // Define new instance of constructor
    let id = $(this).data("id");
    var userArticles = new ToggleAllCurrentUserArticles(userObjGlobalVar);
    // Call prototype
    userArticles.renderUserArticles();
  });
}

// Load article content
function loadArticleDetails(){
  $(".article-info").each(function (i, element){
    let id = $(this).data("id");
    $.get("/articles/" + id + ".json", function(articles){
      content = articles["content"];
      // Console.log(articles);
      let total_credits = (articles["total_credits"]);
      let author = (articles["user"]["name"]);
      $(element).html("Arthor: "+author+"</li>" + "<li>Total Credits: "+total_credits)
    })
    .done(function(content){
    // console.log("request completed");
    })
    .fail(function(jqXHR, textStatus, errorThrown){
    // console.log(errorThrown);
    });
  });
}

//  --------------------------------- REQUEST ARTICLE OBJECT VIA GET REQUEST

function loadArticle(id){
  $.get("/articles/" + id + ".json", function(articles){
     let content = articles["content"];
    // define new instance of constructor
     var userArticleBody = new ToggleArticleBody(id, content);
     userArticleBody.renderArticleBody();
    })
    .done(function(content){
    })
    .fail(function(jqXHR, textStatus, errorThrown){
    });
}

//  ---------------------------------------REQUEST ALL CURRENT USER ARTICLES VIA GET REQUEST

function loadAllCurrentlUserArticles(userId){
  $.get("/users/" + userId + ".json", function(userObj){
   userObjGlobalVar = userObj;
  })
  .done(function(content){
  })
  .fail(function(jqXHR, textStatus, errorThrown){
  });
}

// -------------------------------------- FORMS: ADDING A CREDIT TO ARTICLE

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

// Articles of user show page
function ToggleAllCurrentUserArticles(userObj){
  // Return the articles of object from ajax get response
  this.articles = userObj.articles;
}

// Toggle current user articles
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

// Toggle body of individual article
function ToggleArticleBody(artBodyId, content){
  // return the id and content of object from ajax get response
  this.artBodyId = artBodyId;
  this.content = content;
}

// Toggle article body
ToggleArticleBody.prototype.renderArticleBody = function(){
  let addText = $("#body-" + this.artBodyId);
  let button = $("button#"+this.artBodyId);
  let article_details = $("#article-details");
  addText.html("<p>" + this.content + "</p>");
  // Call other constructor for toggle action
  var toggleUserArticles = new Togglefunction(button, addText, "Read More", "Read Less" );
  toggleUserArticles.makeToggle();
}

// Toggling functionality
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

// ----------------------------------------------- GOOGLE MAPS API

// Global Varaibles
var geocoder;
var map;

// Initialize map
function initMap() {
  // Setup initial point of view on Map
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 4,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  codeAddress(map);
}

// Set all markers by address enterred
function codeAddress(map){
  var addresses=[];
  $.get("/articles.json", function(){
  }).done(function(articles){
    addresses.push(articles.map(function(art, i){
      return art.address.city + ", "+ art.address.country.title;
    }));
    returnAddresses(addresses);
  });

  function returnAddresses(addressArray){
    var marker;
    // Create Marker
    for(let i=0; i < addressArray[0].length; i++){
      geocoder.geocode(
      {
       'address': addressArray[0][i]
      },
      function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          // Place tool tip
          marker.addListener('click', function(){
            console.log("boo");
              var articleContainer = $('.article-container');
              articleContainer.toggle();
          });

        }else{
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
}
