// ----------------------------------------------- GOOGLE MAPS API
var userObjGlobalVar;

// ------------------------------------ DOCUMENT READY

$(function() {
  var userId = $("#articlesLink").attr("data-id");
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
    // -- define new instance of constructor
    let id = $(this).data("id");
    var userArticles = new ToggleAllCurrentUserArticles(userObjGlobalVar);
    // -- call prototype
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

      $(element).html("Arthor: "+author+"</li>" + "<li>Total Credits: "+total_credits)
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
    // -- define new instance of constructor
    var userArticleBody = new ToggleArticleBody(id, content);
    // -- call the prototype method of this instance
    userArticleBody.renderArticleBody();
  })
  .done(function(content){
    // -- console.log("request completed");
  })
  .fail(function(jqXHR, textStatus, errorThrown){
    // -- console.log(errorThrown);
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


//  ---------------------------------- OBJECT CONSTRUCTOR FUNCTIONS

// -- constructor function for articles of user show page
function ToggleAllCurrentUserArticles(userObj){
    // -- return the articles of object from ajax get response
    this.articles = userObj.articles;
}

//  -------------------------------------------TOGGLE CURRENT USER ARTICLES
// -- Prototype
ToggleAllCurrentUserArticles.prototype.renderUserArticles = function(){
  let button = $("#articlesLink");
  let container =  $(".index-container ");
  container.html("");
  $.each(this.articles, function(i, article){
    container.prepend("<p><a href='/users/3/articles/3'>" + article["title"] +"<a>"  + " Credits: " + article.total_credits + "<p>" + article["content"] + "</p>" + "</p>" );
  });
  // -- Call other constructor for toggle action
  var toggleUserArticles = new Togglefunction(button, container, "See Your Articles", "Hide Your Articles" );
  toggleUserArticles.makeToggle();
}



// --------------------------------------------- TOGGLE BODY OF INDIVIDUAL ARTICLE ON INDEX PAGE

function ToggleArticleBody(artBodyId, content){
  // -- return the id and content of object from ajax get response
  this.artBodyId = artBodyId;
  this.content = content;
}

// -- Prototype
ToggleArticleBody.prototype.renderArticleBody = function(){
  let addText = $("#body-" + this.artBodyId);
  let button = $("button#"+this.artBodyId);
  let article_details = $("#article-details");
  addText.html("<p>" + this.content + "</p>");

  // -- Call other constructor for toggle action
  var toggleUserArticles = new Togglefunction(button, addText, "Read More", "Read Less" );
  toggleUserArticles.makeToggle();
}

// -- Constructor function for toggle functionality
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

// -- Global Varaibles
var geocoder;
var map;

// -- Initialize map
function initMap() {
  // -- Starting view on Map
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 3,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_CENTER
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    fullscreenControl: true
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  codeAddress(map);
}


// -- Set all markers by address enterred
function codeAddress(map){
  var current_user_id = function(){
    var id = $("#user_id").attr("data-id");
    return id;
  };
  var TOKEN = $("meta[name='csrf-token']").attr('content');
  var addresses=[];
  var articlesArr =[];
  var marker;

  $.get("/articles.json", function(){
  }).done(function(articles){
    addresses.push(articles.map(function(art, i){
      return art.address.city + ", "+ art.address.country.title;
    }));
    returnAddresses(addresses, articles, current_user_id);
  });


  // -- Create Marker with address
  function returnAddresses(addressArray, articles, current_user_id){
    var infowindow = new google.maps.InfoWindow({
      content: '',
      minWidth: 300,
      backgroundColor: '#333'
    });
    for(let i=0; i < addressArray[0].length; i++){
      geocoder.geocode(
      {
       'address': addressArray[0][i]
      },

      // -- Check if promise was returned successfully
      function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
            // Set marker
            var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            id: i
          });

        // -- Fill info window with data content
        articlesArr.push(articles.map(function(art, i){
                return '<ul>'+
                        '<li>'+
                        'Arthor: ' + `<a href="/users/${articles[i]["user"]["id"]}">`+ articles[i]["user"]["name"]+"</li></a>" +
                        'Total Credits: '+
                        articles[i]["total_credits"]+
                        '</li>'+
                        "<li class='city'>"+
                        articles[i]["address"]["city"]+
                        ", "+
                        articles[i]["address"]["country"]["title"]+
                        "</li>"+
                        '<li>'+
                        '<span class="bold">'+
                        articles[i].title +
                        '</span>' +
                        '</li>'+
                        '<li>'+
                         articles[i].content+
                         '</li>'+
                        `<form action="/credits" accept-charset="UTF-8" method="post" id="${articles[i]["id"]}">`+
                          '<input name="utf8" type="hidden" value="✓">'+
                          `<input type="hidden" name="authenticity_token" value="${TOKEN}">`+
                          `<input type = "hidden" name = "credit[user_id]"  value = "${current_user_id()}"/>`+
                          '<input type = "hidden" name = "credit[vote]" value = 1 checked = "checked"/>' +
                          `<input type = "hidden" name = "credit[article_id]"  value = "${articles[i]["id"]}" />`+
                          '<input type="submit" value="Credit Article">'+
                        '</form>'+
                        '<div class="private-message"></div>'
        }));
        openInfoWindow(results, marker, infowindow, articlesArr, i);
        submitForm(`${articles[i]["id"]}`, articles[i]["total_credits"]+1)
        }else{
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
}

// -- Create info window
function openInfoWindow(results, marker, infowindow, articlesArray, index){
  marker.addListener('click', function(){
    infowindow.setContent(articlesArray[0][index]);
    infowindow.setPosition(results[0].geometry.location);
    infowindow.open(map, marker);
  });
}

// -- Credit form
function submitForm(id, updated_total_articles){
  document.addEventListener("click", function(){
    $(`form#${id}`).submit(function(event) {
      event.preventDefault();
      let values = $(this).serialize();
      let crediting = $.post('/credits', values);
      crediting.done(function(creditObj, textStatus, jqXHR ){
        $('input[type="submit"]').prop("disabled", false);
        let articleId = $(".private-message");
        if(jqXHR.status === 201){
          if((articleId).html("")){
            $(".gm-style-iw li").first().html("Total Credits: " + updated_total_articles);
            articleId.prepend("<p>You have now added a new credit to the article</p>").show().fadeOut(5000);
          }
        }
        else if(creditObj.errors.role){
          if((articleId).html("")){
               articleId.prepend(`<p>${creditObj.errors.role[0]}</p>`).show().fadeOut(5000);
             }
        }
        else {
          if((articleId).html("")){
           articleId.prepend("<p>You have already credited this article</p>").show().fadeOut(5000);
        }
      }
      });
    });
  });
};
