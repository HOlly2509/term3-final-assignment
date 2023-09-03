
$(document).ready(function(){
    const arrDestinations = [
        {
            name: "Polar Odyssey",
            price: "15 000",
            descriptiontext: "4 Nights, perfect getaway for those who want to learn while they relax!",
            image: "image1.webp",
            addedDate: "2023-03-25",
            destinations: "single",
            origin: "Antarctica",
            duration: "short",
            code: "#6266",
            ticketQuantity: "1"
        },
        {
            name: "Frozen Safari",
            price: "20 000",
            description: "6 nights! As exciting as it sounds, if you like adventure this is the one for you! Going to multiple locations!",
            image: "safari.jpeg",
            addedDate: "2023-05-26",
            destinations: "multiple",
            origin: "Antarctica",
            code: "#6256",
            duration: "long",
            ticketQuantity: "1"
        },
        {
            name: "Antarctic Adventure",
            price: "10 000",
            description: "2 nights, short and sweet, the most comfortable way to see the Antarctic",
            image: "2 day.jpeg",
            addedDate: "2023-07-20",
            destinations: "single",
            origin: "Antarctica",
            duration: "short",
            code: "#6296",
            ticketQuantity: "1"
        },
        {
            name: "Ice Explorer",
            price: "30 000",
            description: "8 nights! Want to see the Antarctic up close? Become the ultimate explorer on this 8-day adventure to multiple destinations on the way",
            image: "ice.jpeg",
            addedDate: "2023-05-03",
            destinations: "multiple",
            origin: "Antarctica",
            duration: "long",
            code: "#6216",
            ticketQuantity: "1"
        }
    ];

    let appliedFilter = "all";
    let appliedSort = "date";

    function renderCards() {
        const cardsContainer = $("#cruiseContainer");
        cardsContainer.empty();

        // Filter and sort the destinations
        const filteredAndSortedDestinations = arrDestinations
            .filter(destination => {
                if (appliedFilter === "all") return true;
                if (appliedFilter === "short" && destination.duration === "short") return true;
                if (appliedFilter === "long" && destination.duration === "long") return true;
                if (appliedFilter === "single" && destination.destinations === "single") return true;
                if (appliedFilter === "multi" && destination.destinations === "multiple") return true;
                if (appliedFilter === "round" && destination.origin === "Antarctica") return true;
                return false;
            })
            .sort((a, b) => {
                if (appliedSort === "date") {
                    return new Date(a.addedDate) - new Date(b.addedDate);
                } else if (appliedSort === "price") {
                    // Adjust the sorting logic for price without spaces
                    return parseFloat(a.price.replace("R", "").replace(",", "")) - parseFloat(b.price.replace("R", "").replace(",", ""));
                }
                return 0;
            });

        filteredAndSortedDestinations.forEach(destination => {
            const cardHtml = `
                <div class="col-6">
                    <div class="card">
                        <img src="assets/${destination.image}" class="card-img-top small" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${destination.name}</h5>
                            <p class="card-text pricetext">R${destination.price}</p>
                            <p class="card-text descriptiontext" style="display: none;">${destination.description}</p>
                            <button class="button-class purchase-button" style="display: none;">Purchase ticket</button>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.append(cardHtml);
        });
    }

    // Click event for filter buttons
    $(".filterRadio").click(function () {
        appliedFilter = $(this).val();
        renderCards();
    });

    // Click event for sort buttons
    $(".sortRadio").click(function () {
        appliedSort = $(this).val();
        renderCards();
    });

    // Initial render
    renderCards();

    // Click event to toggle description and purchase button
  
// Click event to toggle description and purchase button
$(document).ready(function () {
    // Add a click event listener to all cards
    $(".card").click(function () {
        console.log("Card clicked"); // Check if the click event is triggered
        // Find the elements within the clicked card
        var pricetext = $(this).find(".pricetext");
        var descriptiontext = $(this).find(".descriptiontext");
        var button = $(this).find(".purchase-button");

        console.log(pricetext, descriptiontext, button); // Check if the elements are correctly selected
        
        // Toggle the visibility of price text, description text, and button
        pricetext.toggle();
        descriptiontext.toggle();
        button.toggle();

        // Toggle the class for image resizing
        $(this).find(".card-img-top").toggleClass("small");
    });
});


// Click event for purchase buttons using event delegation
$("#cruiseContainer").on("click", ".purchase-button", function () {
    const card = $(this).closest(".card");
    const title = card.find(".card-title").text();
    const price = card.find(".pricetext").text();
    const code = card.find(".code").text(); // Add this line to retrieve the trip code

    const selectedTrip = {
        code: code,
        name: title,
        price: price,
        ticketQuantity: "1" // You can set the quantity as needed
    };

    let purchases = JSON.parse(localStorage.getItem("purchases")) || [];
    purchases.push(selectedTrip);

    localStorage.setItem("purchases", JSON.stringify(purchases));
});


// Display purchases from localStorage
$(document).ready(function () {
    const purchaseTable = $("#purchaseTable tbody");
    const purchasesJSON = localStorage.getItem("purchases");

    if (purchasesJSON) {
        const purchases = JSON.parse(purchasesJSON);

        purchases.forEach(function (purchase) {
            // Filter based on trip code (e.g., "code123")
            const matchingTrip = arrDestinations.find(trip => trip.code === purchase.code);

            if (matchingTrip) {
                const newRow = $("<tr>");
                const codeCell = $("<td>").text(matchingTrip.code);
                const nameCell = $("<td>").text(matchingTrip.name);
                const priceCell = $("<td>").text(purchase.price);
                const quantityCell = $("<td>").text(purchase.ticketQuantity);
                const totalCostCell = $("<td>").text(calculateTotalCost(purchase.price, purchase.ticketQuantity));

                newRow.append(codeCell, nameCell, priceCell, quantityCell, totalCostCell);
                purchaseTable.append(newRow);
            }
        });
    }
});


// Function to calculate the total cost
function calculateTotalCost(price, quantity) {
    const numericPrice = parseFloat(price.replace("R", "").replace(",", ""));
    const numericQuantity = parseInt(quantity, 10);
    return (numericPrice * numericQuantity).toFixed(2);
}

// Add an event listener to the "Remove All" button
document.getElementById("removeAll").addEventListener("click", function () {
    // Get a reference to the table's <tbody> element
    var tbody = document.querySelector("#purchaseTable tbody");

    // Remove all rows from the <tbody>
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
});





    // Weather API
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Antarctica&appid=a4754813252c3de29072269c15c91406",
        success: function (data) {
            const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
            const weatherDescription = data.weather[0].description;

            // Populate the weather data in the card
            $("#temperature").text(temperature);
            $("#weather").text(weatherDescription);
        }
    });
});
