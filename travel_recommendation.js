const travelPlaces = [];
const btnSearch = document.getElementById('serach-place');
const resetSearch = document.getElementById('reset-place');


function searchTravelPlaces(){
    const input = document.getElementById('search-input');
    const result = document.getElementById('main-container');
    fetch('travel_recommendation_api.json',{ method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}})
    .then(response => response.json())
    .then(data => {
       const condition = data.Travel.find(item => item.name.toLowerCase() === input);
       if(condition){
        const desc = condition.description.join(', ');
        const options = { timeZone: condition.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const timezone = new Date().toLocaleTimeString('en-US', options); 
        result.innerHTML += `<h2>${condition.name}</h2>`;
        result.innerHTML += `<img src="${condition.image}"/>`;
        result.innerHTML += `<div>${condition.description}</h2>`;
        result.innerHTML += `<div>Current Time in ${condition.name} is: ${timezone}</div>`
       } else {
        result.innerHTML = `<h2 style="color: red;">Travel Place Not found</h2>`;
       }
})
.catch(error => {
    console.log('Error: ', error);
    result.innerHTML = 'An error occurred while fetching data.';
});
}

function resetSearchPlace(){
    const input = document.getElementById('search-input');
    input.value = "";
}

btnSearch.addEventListener('click', searchTravelPlaces);
resetSearch.addEventListener('click', resetSearchPlace);
