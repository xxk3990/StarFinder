"use strict"

//Event
window.onload = (e) => {document.querySelector("button").onclick = getAllCharacters};

//Proxy URL is used due to SWAPI not having CORS enabled.
const proxyurl = "https://cors-anywhere.herokuapp.com/";

//Google API key
const googleKey = "AIzaSyD_zvFPiBpHdqe-_uWzyNxgaw0PU9YMi-E";

//Get all characters
function getAllCharacters() {
    const STAR_URL = "http://swapi.co/api/";
    let url = STAR_URL;
    
    let searchTerm = document.querySelector("#search");
    let displayTerm = "";
    searchTerm = displayTerm;
    searchTerm = searchTerm.trim();
    searchTerm = encodeURIComponent(searchTerm);
    if(searchTerm.length > 1) {
        return;
    }

    let filter = document.querySelector("#filter");
    url += "films/" + filter.options[filter.selectedIndex].value + "/";

    console.log(url);

    //Now that the url is created, request the character data
    requestCharacterData(proxyurl + url);
}


function requestCharacterData(url){
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = filmDataLoaded;

    xhr.open("GET", url);
    xhr.send();
}

function filmDataLoaded(e){
    let xhr = e.target;

    //Loads characters on successful request
    getCharactersFromFilm(xhr.responseText);
}

//Gets three random characters from a film.
function getCharactersFromFilm(data){

    //Parse response data
    let object = JSON.parse(data); //Usabale JS object
    let possibleCharacters = object.characters; //All of the characters

    //Randomly selects three characters
    let selectedCharacters =[];
    for(let i = 0; i< 3; i++)
    {
        selectedCharacters.push(possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)]);

        //Now access character data
        getCharacterData(selectedCharacters[i]);
    }
    
   console.log(possibleCharacters);
}

//Get specific character info from a supplied URL
function getCharacterData(url){
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = characterDataLoaded;

    xhr.open("GET", proxyurl + url);
    xhr.send();
}

function characterDataLoaded(e){
    let xhr = e.target;

    //Parse character data on successful request
    parseCharacterData(xhr.responseText)
}

//Called to parse in character data
function parseCharacterData(data)
{
    let object = JSON.parse(data);

    //All info about the characters is grabbed here.
    //For now these are debug logs, but eventually will generate HTML elements.
    console.log("Name: " + object.name);
    console.log("Gender: " + object.gender);
    console.log("Birth Year: " + object.birth_year);
    console.log("Hair Color: " + object.hair_color);
    console.log("Eye Color: " + object.eye_color);
        let backData = document.querySelector(".data");
        backData.innerHTML =  "Name: " + object.name + "<br>" +
          "Gender: " + object.gender + "<br>" + "Birth Year: " + object.birth_year + "<br>" +"Hair Color: " + object.hair_color + "<br>" + 
          "Eye Color: " + object.eye_color;

}

//Function will report an error fetching data
function dataError(e){
    console.log("An error occured when requesting data!");
}

//jQuery flipping behaviour
$(".flip").flip({
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