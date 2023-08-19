const arrDestinations = [
    {
        name: "Polar Odyssey",
        price: "15 000",
        description: "4 Nights, perfect getaway for those who want to learn while they relax! ",
        image: "image1.webp",
        addedDate: "2023-03-25",
        destinations: "single",
        origin: "Antarctica"
    },
    {
        name: "Frozen Safari",
        price: "20 000",
        description: " 6 nights! As exciting as it sounds, if you like adventure this is the one for you! Going to multiple loactions! ",
        image: "safari.jpeg",
        addedDate: "2023-05-26",
        destinations: "multiple",
        origin: "Antarctica"
    },
    {
        name: "Antarctic Adventure",
        price: "10 000",
        description: "2 nights, short and sweet, the most comfortable way to see the antarctic",
        image: "2 day.jpeg",
        addedDate: "2023-07-20",
        destinations: "single",
        origin: "Antarctica"
    },
    {
        name: "Ice Explorer",
        price: "30 000",
        description: "8 nights! Want to see the antarctic up close? Become the ultimate explorer on this 8-day adventure to multiple destinations on the way",
        image: "ice.jpeg",
        addedDate: "2023-05-03",
        destinations: "multiple",
        origin: "Antarctica"
    }
];

let appliedFilter = "all"; // Default to "all" destinations
let appliedSort = "date";  // Default to sorting by date added

// Function to render the destination cards based on appliedFilter and appliedSort
function renderCards() {
    const cardsContainer = $("#cruiseContainer");
    cardsContainer.empty();

    arrDestinations.forEach(destination => {
        if (appliedFilter === "all" || destination.destinations === appliedFilter) {
            const cardHtml = `
                <div class="col-6">
                    <div class="card">
                        <img src="assets/${destination.image}" class="card-img-top small" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${destination.name}</h5>
                            <p class="card-text" id="pricetext">R${destination.price}</p>
                            <p class="card-text" id="descriptiontext">${destination.description}</p>
                            <button class="button-class">Purchase ticket</button>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.append(cardHtml);
        }
    });
}

// Click event for filter buttons
$(".filterRadio").click(function() {
    appliedFilter = $(this).val();
    renderCards();
});

// Click event for sort buttons
$(".sortRadio").click(function() {
    appliedSort = $(this).val();
    renderCards();
});

// Initial render
$(document).ready(function() {
    renderCards();
});


//----------------------------------------------------//

//TITLE CHANGING ON LOAD//

$(document).ready(function() {
    // Get the <h1> element by its ID
    const h1Element = document.getElementById("cruiseName");
    
    // Store the initial value
    const initialValue = h1Element.getAttribute("data-initial");

    // Update the text content
    h1Element.textContent = "Welcome to " + initialValue;
});

//---------------------------------------//





//-----CLICKING DISPLAY ON CARDS TRIPS PAGE-----//

$(document).ready(function() {
    // Add a click event listener to all cards
    $(".card").click(function() {
        // Find the elements within the clicked card
        var pricetext = $(this).find("#pricetext");
        var descriptiontext = $(this).find("#descriptiontext");
        var button = $(this).find(".button-class");

        // Toggle the visibility of price text, description text, and button
        pricetext.toggle();
        descriptiontext.toggle();
        button.toggle();
        
        // Toggle the class for image resizing
        $(this).find(".car-img-top").toggleClass("small");
    });
});

//---------------------------------------------//



function loadCruises(cruisesToShow) {

    $("#cruiseContainer").empty();

//loop throught the list of plants
for (let i = 0; i < cruisesToShow.length; i++) {
    const cruise = cruisesToShow[i];

    $("#cruiseContainer").append($("#cruiseCardTemplate").html())
    let currentChild = $("#cruiseContainer").children().eq(i)
    $(currentChild).find("nameText").text("Hello");

}
}


//PURCHASES TABLE//
$("#removeone").click(function(){
    $("#one").hide();
})

$("#removetwo").click(function(){
    $("#two").hide();
})

$("#removethree").click(function(){
    $("#three").hide();
})
//------------------------------//


//WEATHER//

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Antarctica&appid=a4754813252c3de29072269c15c91406",
        success: function(data) {
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
            const weatherDescription = data.weather[0].description;

            // Populate the weather data in the card
            $("#temperature").text(temperature);
            $("#weather").text(weatherDescription);
        }
    });
});

// $(document).ready(function(){
//     $ajax({
//         type:"GET",
//         url:"https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=a4754813252c3de29072269c15c91406",
//         success: function(data){
//         temp = data;
//         console.log(temp);
//         }
//     })
// })
//---------------------//


//FILTER & SORT CRUISES//

filterSortCruises()

$("#descriptiontext").hide();
loadCruises(arrDestinations);

    


$(document).ready(function() {
    $(".filterRadio").click(function() {
        var filterValue = $(this).val();
        
        $(".card").each(function() {
            var card = $(this);
            var description = card.find("#descriptiontext");
            
            if (filterValue === "all" || description.data("filter") === filterValue) {
                card.show();
            } else {
                card.hide();
            }
        });
    });

    $(".sortRadio").click(function() {
        var sortValue = $(this).val();
        
        var cardsContainer = $("#cruiseContainer");
        var cards = cardsContainer.find(".card").toArray();
        
        cards.sort(function(a, b) {
            var aValue = $(a).find("#pricetext").text().replace("R", "");
            var bValue = $(b).find("#pricetext").text().replace("R", "");
            
            if (sortValue === "date") {
                // For sorting by date, you would use appropriate criteria here
                // For simplicity, let's just compare the price values
                return aValue - bValue;
            } else if (sortValue === "price") {
                return aValue - bValue;
            }
        });

        cardsContainer.empty().append(cards);
    });
});
//-----------------------------------------------------//


