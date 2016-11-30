// Shorthand for $( document ).ready()
$(function() {
  $(".js-read-more").on('click', function() {
    let id = $(this).data("id");
     showArticle(id);
   });
});

// ajax request to show article content on index page
function showArticle(id){
  $.get("/articles/" + id + "/body", function(data){
    toggleArticle(id, data);
  }).done(function(data){
    console.log("request completed");
  }).fail(function(jqXHR, textStatus, errorThrown){
    alert(errorThrown);
  });
}

function toggleArticle(id, data){
  let addText = $("#body-" + id);
  let button = $(".js-read-more");
  // first make sure the data obj from the ajax reuest is received
  // if text is not visible then show it on click
  addText.text(data);
  // then check if the body of the text is not visible
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
