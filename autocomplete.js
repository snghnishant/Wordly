let sugApi = "https://api.datamuse.com/";
let sugEndpoint = "sug?s=";
const suglimit = "&max=10";
const sugQuery = document.getElementById("query");
const suggestions = document.getElementById("suggestions");

// Debouncing variable
let timeoutFunction;

let mySug = (search) => {
	return search.split(" ").join("+");
};

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

const querySug = () => {
	if (timeoutFunction) {
		clearTimeout(timeoutFunction);
	}
	timeoutFunction = setTimeout(async () => {
		if (sugQuery.value.length) {
			let url = sugApi + sugEndpoint + mySug(sugQuery.value) + suglimit;
			const sugResponse = await fetch(url);
			const sugjsonResponse = await sugResponse.json();
			displaySug(sugjsonResponse);
			//console.log(sugjsonResponse);
		} else {
			suggestions.innerHTML = "";
		}
	}, 500);
};

sugQuery.addEventListener("input", querySug);

function replaceText(e) {
	sugQuery.value = e.target.innerText;
	suggestions.innerHTML = "";
}
