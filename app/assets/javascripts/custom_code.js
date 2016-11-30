// Shorthand for $( document ).ready()
$(function() {
  $(".js-read-more").on('click', function() {
    var id = $(this).data("id");
     expand(id);
   });
});

// ajax request to show article content on index page
function expand(id){
  $.get("/articles/" + id + "/body", function(data){
      var addText = $("#body-" + id);
      // first make sure the data obj from the ajax reuest is received
      addText.text(data);
      // 
      if($(`.js-read-more[data-id=${id}]`).html() === "Read More"){
        addText.show();
      $(`.js-read-more[data-id=${id}]`).html("Read Less");
      }
      else{
        addText.hide();
        $(`.js-read-more[data-id=${id}]`).html("Read More");

      }


  }).done(function(data){
    console.log("request completed");

  }).fail(function(jqXHR, textStatus, errorThrown){
    alert(errorThrown);
  });
}
