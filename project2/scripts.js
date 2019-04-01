"use strict"

function search() {
    const STAR_URL = "http://swapi.co/api/";
    let url = STAR_URL;
    let searchTerm = document.querySelector("#search");
    let displayTerm = "";
    searchTerm = displayTerm;
    searchTerm.searchTerm.trim();
    searchTerm = encodeURIComponent(searchTerm);
    if(searchTerm.length > 1) {
        return;
    }
    url += "&q=" + searchTerm;
    let filter = document.querySelector("#filter");
    url += "films/" + filter + "/";

}



$("#flip").flip({
    trigger: 'click',
    reverse: false,
    axis: 'y'
});