let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

let containerEl1 = document.createElement("div");
searchResults.appendChild(containerEl1);
containerEl1.classList.add("col-12");


let spinnerEl = document.getElementById("loader");


function displayResults(results) {
    let {
        title,
        imageLink,
        author
    } = results;


    let containerEl2 = document.createElement("div");
    searchResults.appendChild(containerEl2);
    containerEl2.classList.add("col-6", "mt-4");

    let imageEl = document.createElement("img");
    containerEl2.appendChild(imageEl);
    imageEl.src = imageLink;
    imageEl.classList.add("img2");

    let paraEl = document.createElement("p");
    containerEl2.appendChild(paraEl);
    paraEl.textContent = author;

}

function createAndAppendBook(searchResultsValue) {
    let headingEl = document.createElement("h1");
    containerEl1.appendChild(headingEl);
    headingEl.classList.add("mt-4");
    if (searchResultsValue.length === 0) {
        headingEl.textContent = "No Results Found";
    } else {
        headingEl.textContent = "No Results Found";
        headingEl.textContent = "Popular Book";
        for (let results of searchResultsValue) {
            displayResults(results);
        }
    }
}



searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinnerEl.classList.remove("d-none");
                spinnerEl.classList.add("d-none");
                let searchResultsValue = jsonData.search_results;
                createAndAppendBook(searchResultsValue);
            });
    }
});