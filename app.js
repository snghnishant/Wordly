let api = "https://api.datamuse.com/";
let endpoint = ["words?rel_syn=","words?rel_ant=","words?rel_rhy=","words?ml=","words?sl="];
let responseField = document.querySelector('#results');
let query;


//querybuilder function
let myQuery=(search)=>{
   return search.split(' ').join('+'); 
}

// Formatting results to display them in results div tag
const displayResponse = (res) => {

    if (!res) {
        console.log(res.status);
    }
    if (!res.length) {
        responseField.innerHTML = "";
        responseField.innerHTML = "<p>Try again!</p><p>There were no suggestions found!</p>";
        return;
    }

    // Creates an empty array to contain the HTML strings
    let wordList = [];
    // Loops through the response and caps off at 25
    for (let i = 0; i < Math.min(res.length, 25); i++) {
        wordList.push(`<li>${i+1}. ${res[i].word}</li>`); //word is the JSON object property look Datamuse Api
    }
    wordList = wordList.join('');

    //styling resultField
    responseField.innerHTML = "";
    responseField.style.padding = "5px";
    responseField.style.margin = "5px";
    responseField.style.textTransform = "capitalize";
    responseField.innerHTML = `<p>You might be interested in:</p><ul>${wordList}</ul>`;
    return
}
function index(){
    return document.getElementById('select').options.selectedIndex;
}

// main calling function using fetch api to collect JSON object 
const queryResult = async() =>{
    query = document.getElementById('query').value;
    let url = api+endpoint[index()]+myQuery(query);
    try{
        const response = await fetch(url);
        if(response.ok){
            const jsonResponse = await response.json();
           displayResponse(jsonResponse);
        }
    }catch(error){
        console.log(error);
    }
}
