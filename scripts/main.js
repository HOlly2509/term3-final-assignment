// When the document loads
$(document).ready(function(){

    console.log("hello");

    // --------------------------------
    //Home Page


    //When the hero image loads, animate it upwards
    $(".hero-image").animate({top: '-=100px'})

// ------------------------------------
//Browse Page

$("#descriptiontext").hide();
    
});

//when the card is clicked
$(".card").click(function() {

    //toggle the price and description text
    $("#pricetext").toggle();
    $("descriptiontext").toggle();

    //resize the image to fit additional content
    $(".car-img-top").toggleclass("small");
})


