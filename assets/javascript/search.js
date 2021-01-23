// API defaults
let api = "https://api.datamuse.com/";
let endpoint = [
	"words?rel_syn=",
	"words?rel_ant=",
	"words?rel_rhy=",
	"words?ml=",
	"words?sl=",
];

let responseField = document.querySelector("#results");
let searchQuery;

// Query builder function to add '+' to build search query
let userQuery = (searchString) => {
	return searchString.split(" ").join("+");
};

// Formatting results to display them in results div
const displayResponse = (res) => {
	if (!res) {
		console.log(res.status);
	}
	if (!res.length) {
		responseField.innerHTML = "";
		responseField.innerHTML =
			"<p>Try again!</p><p>There were no suggestions found!</p>";
		return;
	}

	// Creates an empty array to contain the HTML strings
	let wordList = [];

	// Loops through the response and caps off at 25
	for (let i = 0; i < Math.min(res.length, 25); i++) {
		wordList.push(`<li>${i + 1}. ${res[i].word}</li>`); //word is the JSON object property look Datamuse API
	}
	wordList = wordList.join("");

	//styling resultField
	responseField.innerHTML = "";
	responseField.style.textTransform = "capitalize";
	responseField.innerHTML = `<p>You might be interested in:</p><ul>${wordList}</ul>`;
	return;
};

// Get index of selected search option
function getIndex() {
	return document.getElementById("select").options.selectedIndex;
}

// Search function with API throttling enabled
let throttleTimeout;

const queryResult = () => {
	if (throttleTimeout) {
		return;
	}
	throttleTimeout = setTimeout(async () => {
		searchQuery = document.getElementById("query").value;
		let url = api + endpoint[getIndex()] + userQuery(searchQuery);
		try {
			const response = await fetch(url);
			if (response.ok) {
				const jsonResponse = await response.json();
				displayResponse(jsonResponse);
			}
		} catch (error) {
			console.error(error);
		}
		throttleTimeout = undefined;
	}, 500);
};
