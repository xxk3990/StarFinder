"use strict"

let characterNumber = 0;
let status;

//Load event
window.onload = (e) => {
    document.querySelector("#filter").onchange = getAllCharacters;
    document.querySelector("#searchButton").onclick = getSearchCharacter;
    document.querySelector("#newRandom").onclick = getAllCharacters;
    status = document.querySelector("#status");
    status.innerHTML = "Status: Ready to search!";
};

//Proxy URL is used due to SWAPI not having CORS enabled.
const proxyurl = "https://cors-anywhere.herokuapp.com/";

//Google API key
const googleKey = "AIzaSyD_zvFPiBpHdqe-_uWzyNxgaw0PU9YMi-E";

//Form the proper URL
function getAllCharacters() {
    status.innerHTML = "Status: Initiating Search";

    const STAR_URL = "http://swapi.co/api/";
    let url = STAR_URL;

    
    let filter = document.querySelector("#filter");
    let selectedMovie = filter.options[filter.selectedIndex].value;

    //Pick a random movie if the user didn't pick one
    while (selectedMovie == 0) {
        selectedMovie = Math.floor(Math.random() * 6)
    }
    url = STAR_URL;
    url += "films/" + selectedMovie + "/";

    //Now that the url is created, request the character data
    requestCharacterData(proxyurl + url);
}
function getSearchCharacter() {
    const STAR_URL = "http://swapi.co/api/";
    let url = STAR_URL;
    let searchTerm = document.querySelector("#search").value;

    console.log(searchTerm);

    if (searchTerm != "") {
        searchTerm = searchTerm.trim();
        searchTerm = encodeURIComponent(searchTerm);
        url += "people/?search=" + searchTerm;
        console.log("URL to search for: " + url);
        requestSearch(proxyurl + url);
    }

}

//Responsible for making the server request
function requestCharacterData(url) {
    status.innerHTML = "Status: Requesting info from SWAPI"
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = filmDataLoaded;

    xhr.open("GET", url);
    xhr.send();
}

function requestSearch(url) {
    status.innerHTML = "Status: Searching for character by name..."
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = searchDataLoaded;

    xhr.open("GET", url);
    xhr.send();
}

//When data is loaded, this grabs the response
function filmDataLoaded(e) {
    let xhr = e.target;

    //Loads characters on successful request
    getCharactersFromFilm(xhr.responseText);
}

function searchDataLoaded(e) {
    let xhr = e.target;
    getSearchResult(xhr.responseText);
}

function getSearchResult(data) {
    //let myResults = object.result;
    console.log("Data, which is from xhr.responseText: " + data);

    let object = JSON.parse(data).results[0];
    console.log(object);

    
    parseSearchData(object);
}

//Gets three random characters from a film.
function getCharactersFromFilm(data) {

    //Parse response data
    let object = JSON.parse(data); //Usabale JS object
    console.log(object);
    let possibleCharacters = object.characters; //All of the characters

    //Randomly selects three characters
    let selectedCharacters = [];
    for (let i = 0; i < 3; i++) {
        selectedCharacters.push(possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]);

        //Now access character data
        getCharacterData(selectedCharacters[i]);
    }
}

//Get characters from film gave us url's to character info; now we request data from those urls
function getCharacterData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onerror = dataError;
    xhr.open("GET", proxyurl + url);
    xhr.send();
    xhr.onload = (e) => {
        status.innerHTML = "Status: Parsing character data..."
        let xhr = e.target;

        //Parse character data on successful request
        parseCharacterData(xhr.responseText);
    };
}

//Called to parse in character data
function parseCharacterData(data) {

    let object = JSON.parse(data);

    if (characterNumber == 3) {
        characterNumber = 0
    } else if (characterNumber == 2) {
        status.innerHTML = "Status: Complete!";
    }
    characterNumber++;
    let front = document.querySelector(".front" + characterNumber);
    front.innerHTML = object.name;
    let backData = document.querySelector(".data" + characterNumber);
    backData.innerHTML = "Name: " + object.name + "<br>" +
        "Gender: " + object.gender + "<br>" + "Birth Year: " + object.birth_year + "<br>" + "Height: " + object.height + "<br>" + "Mass: " + object.mass + "<br>" + "Skin Color: " + object.skin_color + "<br>" + "Hair Color: " + object.hair_color + "<br>" +
        "Eye Color: " + object.eye_color;



}

function parseSearchData(data) {
    let searchFront = document.querySelector(".searchFront");
    searchFront.innerHTML = data.name;
    let searchData = document.querySelector(".searchData");
    searchData.innerHTML = "Name: " + data.name + "<br>" +
        "Gender: " + data.gender + "<br>" + "Birth Year: " + data.birth_year + "<br>" +"Height: " + data.height + "<br>" + "Mass: " + data.mass + "<br>" + "Skin Color: " + data.skin_color + "<br>" + "Hair Color: " + data.hair_color + "<br>" +
        "Eye Color: " + data.eye_color;

}

//Function will report an error fetching data
function dataError(e) {
    console.log("An error occured when requesting data!");
}

//jQuery flipping behaviour
$(".flip").flip({
    trigger: 'click',
    reverse: false,
    axis: 'y'
});
$(".searchResult").flip({
    trigger: 'click',
    reverse: false,
    axis: 'y'
});

/* //Eventually used for image lookup
//Get data from google
function getGoogleImageData(url)
{
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = googleImageDataLoaded;

    xhr.open("Get", url);
    xhr.send();
}

this might be useful
https://www.googleapis.com/customsearch/v1?key=YOUR-KEY&cx=017576662512468239146:omuauf_lfve&q=tomato&callback=hndlr
*/