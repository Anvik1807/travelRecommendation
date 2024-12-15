const travelPlaces = [];
const btnSearch = document.getElementById('serach-place');
const resetSearch = document.getElementById('reset-place');


function searchTravelPlaces(){
    const input = document.getElementById('search-input').value;
    console.log(input);
    const result = document.getElementById('result-container');
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      // const condition = data.Travel.find(item => item.name.toLowerCase() === input.toLowerCase());
      const condition = data.Travel.find(item => item.name.toLowerCase().includes(input.toLowerCase()));
      //string.toLowerCase().includes(substring.toLowerCase())
       if(condition){
        console.log(condition);
        // const options = { timeZone: condition.timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        // const timezone = new Date().toLocaleTimeString('en-US', options); 
        // result.innerHTML = `<h2>${condition.name.toUpperCase()}</h2>`;
        // result.innerHTML += `<img src="${condition.imagesrc}"/>`;
        // result.innerHTML += `<div>${condition.description}</h2>`;
        // result.innerHTML += `<div>Current Time in ${condition.name} is: ${timezone}</div>`
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
    const result = document.getElementById('result-container');
    result.innerHTML = "";
}

btnSearch.addEventListener('click', searchTravelPlaces);
resetSearch.addEventListener('click', resetSearchPlace);
