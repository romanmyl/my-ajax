var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://romanmyl.github.io/my-ajax/json-data/my-proverbs-' + pageCounter + '.json');
ourRequest.onload = function() {
	if (ourRequest.status >= 200 && ourRequest.status < 400) {
	var ourData = JSON.parse(ourRequest.responseText);
	renderHTML(ourData);
	} else {
		console.log("We connected to the server, but it returned an error.");
	}
};

ourRequest.onerror = function() {
	console.log("Connection error");
};

ourRequest.send();
pageCounter++;
if (pageCounter > 3) {
	btn.classList.add("hide-me");
}
});

function renderHTML(data) {
	var htmlString = "";

	for (var i = 0; i < data.length; i++) {
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

		for (var j = 0; j < data[i].foods.likes.length; j++) {
			if (j == 0) {
			htmlString += data[i].foods.likes[j];
			} else {
			  htmlString += " and " + data[i].foods.likes[j];
			}
		}

		htmlString += ' and dislikes ';

		for (var j = 0; j < data[i].foods.dislikes.length; j++) {
			if (j == 0) {
			htmlString += data[i].foods.dislikes[j];
			} else {
			  htmlString += " and " + data[i].foods.dislikes[j];
			}
		}

		htmlString += '.</p>';

	};

	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}
