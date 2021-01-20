let sugApi = "https://api.datamuse.com/";
let sugEndpoint = "sug?s=";
const suglimit = "&max=10";
const sugQuery = document.getElementById('query');
const suggestions = document.getElementById('suggestions');

let mySug = (search) => {
    return search.split(' ').join('+');
}

const displaySug = (sugRes) =>{
    if(sugRes.length){
        const sugHtml = sugRes.map(
            sugReults =>`<p id="suggestion-result" onclick="replaceText(event)">
            ${sugReults.word}</p>`
        ).join('');
    suggestions.innerHTML = sugHtml;
    }
    if(sugQuery.value.length === 0){
        suggestions.innerHTML = '';
    }
}

const querySug = async () => {
    if(sugQuery.value.length){
        let url = sugApi+sugEndpoint+mySug(sugQuery.value)+suglimit;
        const sugResponse = await fetch(url);
        const sugjsonResponse = await sugResponse.json();
        displaySug(sugjsonResponse);
        console.log(sugjsonResponse);
    }
}


sugQuery.addEventListener('input', querySug);


function replaceText(e){
    sugQuery.value = e.target.innerText;
    suggestions.innerHTML = '';
}