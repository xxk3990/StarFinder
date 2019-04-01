"use strict"

//Event
window.onload = (e) => {document.querySelector("button").onclick = search};

function search() {
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

    //Logs URL for debug, request data
    console.log(url);
    getData(url);

}

//Gets data from generated URL
function getData(url){
    let xhr = new XMLHttpRequest();

    xhr.onerror = dataError;
    xhr.onload = dataLoaded;

    xhr.open("GET", url);
    xhr.send();
}

//Callback functions
function dataLoaded(e){
    let xhr = e.target;

    console.log(xhr.responseText);
}

function dataError(e){
    console.log("An error occured when requesting data!");
}


$("#flip").flip({
    trigger: 'click',
    reverse: false,
    axis: 'y'
});