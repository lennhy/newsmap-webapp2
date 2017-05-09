// GLOBAL VARIABLES
var userObjGlobalVar;

// Credit form
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

// ----------------------------------------------- GOOGLE MAPS API

// --------------------------------- Global Varaibles

var geocoder;
var map;



// --------------------------------- Initialize map

function initMap() {



  // ------------------------------- Starting view on Map

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



// ----------------------------- Set all markers by address enterred

function codeAddress(map){
  var current_user_id = function(){
    var id = $("#user_id").attr("data-id");
    return id;
  };
  var TOKEN = $("meta[name='csrf-token']").attr('content');
  console.log(TOKEN);
  var addresses=[];
  var articlesArr =[];
  var marker;

  $.get("/articles.json", function(){
  }).done(function(articles){
    console.log(articles);
    addresses.push(articles.map(function(art, i){
      return art.address.city + ", "+ art.address.country.title;
    }));
    returnAddresses(addresses, articles, current_user_id);
  });



  // ---------------------------- Create Marker with address

  function returnAddresses(addressArray, articles, current_user_id){
    // console.log(articlesArray[0][0]);
    var infowindow = new google.maps.InfoWindow({
      content: '',
      minWidth: 300,
      backgroundClassName: 'phoney',
    });
    for(let i=0; i < addressArray[0].length; i++){
      geocoder.geocode(
      {
       'address': addressArray[0][i]
      },



      // ------------------------- Check if promise was returned successfully

      function(results, status) {
        if (status == 'OK') {
          map.setCenter(results[0].geometry.location);
            // Set marker
            var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            id: i
          });



        // ------------------------- Execute info window
        console.log(articles[i]["total_credits"]);
        // let content = articles[i]["content"];
        // let current_user_id = articles[i]["current_user"]["id"];
        // let article_id = articles[i]["id"];
        // let total_credits = (articles[i]["total_credits"]);
        // let author = (articles[i]["user"]["name"]);
        articlesArr.push(articles.map(function(art, i){
           return "Arthor: "+articles[i]["user"]["name"]+"</li>" +
                        "<li>Total Credits: "+
                        articles[i]["total_credits"]+
                        "<li class='city'>"+
                        articles[i]["address"]["city"]+
                        ", "+
                        articles[i]["address"]["country"]["title"]+
                        "</li>"+
                        articles[i].title +
                        ": "+
                         articles[i].content+
                        //  $('.credits')
                        '<form action="/credits" accept-charset="UTF-8" method="post">'+
                          '<input name="utf8" type="hidden" value="✓">'+
                          `<input type="hidden" name="authenticity_token" value="${TOKEN}">`+
                          `<input type = "hidden" name = "credit[user_id]"  value = "${current_user_id()}"/>`+
                          '<input type = "hidden" name = "credit[vote]" value = 1 checked = "checked"/>' +
                          `<input type = "hidden" name = "credit[article_id]"  value = "${articles[i]["id"]}" />`+
                          '<input type="submit" value="Credit Article">'
                        '</form>'
        }));

        openInfoWindow(results, marker, infowindow, articlesArr, i);

        }else{
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
}



// ------------------------- Create info window

function openInfoWindow(results, marker, infowindow, articlesArray, index){
  marker.addListener('click', function(){
    infowindow.setContent(articlesArray[0][index]);
    infowindow.setPosition(results[0].geometry.location);
    infowindow.open(map, marker);
  });
}
