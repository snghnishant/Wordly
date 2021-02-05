let sugApi = "https://api.datamuse.com/";
let sugEndpoint = "sug?s=";
const suglimit = "&max=10";
const sugQuery = document.getElementById("query");
const suggestions = document.getElementById("suggestions");

// Query builder
let mySug = (searchString) => {
	return searchString.split(" ").join("+");
};

// To display suggestions coming from API
const displaySug = (sugRes) => {
	if (sugRes.length) {
		const sugHtml = sugRes
			.map(
				(
					sugReults
				) => `<p id="suggestion-result" onclick="replaceText(event)">
            ${sugReults.word}</p>`
			)
			.join("");
		suggestions.innerHTML = sugHtml;
	}
};

// This replaces search text with the user selected suggestion
function replaceText(e) {
	sugQuery.value = e.target.innerText;
	suggestions.innerHTML = "";
}

// Autocomplete with Debouncing enabled
let debounceTimeout;

const querySug = () => {
	if (debounceTimeout) {
		clearTimeout(debounceTimeout);
	}
	debounceTimeout = setTimeout(async () => {
		let url = sugApi + sugEndpoint + mySug(sugQuery.value) + suglimit;
		try {
			if (sugQuery.value.length) {
				const sugResponse = await fetch(url);
				if (sugResponse.ok) {
					const sugJsonResponse = await sugResponse.json();
					displaySug(sugJsonResponse);
				}
			} else {
				suggestions.innerHTML = "";
			}
		} catch (error) {
			console.error(error);
		}
	}, 300);
};

sugQuery.addEventListener("input", querySug);
