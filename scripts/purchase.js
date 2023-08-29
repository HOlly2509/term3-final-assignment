document.addEventListener("DOMContentLoaded", function () {
    const purchaseTable = document.getElementById("purchaseTable");
    const selectedTripJSON = localStorage.getItem("selectedTrip");

    if (selectedTripJSON) {
        const selectedTrip = JSON.parse(selectedTripJSON);

        const newRow = purchaseTable.insertRow();
        const titleCell = newRow.insertCell(0);
        const priceCell = newRow.insertCell(1);

        titleCell.textContent = selectedTrip.title;
        priceCell.textContent = selectedTrip.price;

        // Add other cells and content as needed
        // ...
    }
});

