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


function loadCruises(cruisesToShow) {

    $("#cruiseContainer").empty();

//loop throught the list of plants
for (let i = 0; i < cruisesToShow.length; i++) {
    const cruise = cruisesToShow[i];



    // 1: select the plants containter and add the current array plant to it
    $("#cruiseContainer").append($("#cruiseCardTemplate").html())

    // 2: create a variable that contains the most recently added plant card
    let currentChild = $("#cruiseContainer").children().eq(i)

    //3: set the content for the current plant card from the plants list array
    $(currentChild).find("nameText").text("Hello");

}
}
