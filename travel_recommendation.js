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
      console.log(condition);
       if(condition){
        console.log(condition);
        console.log(condition.places);
        let places = condition.places;
        result.innerHTML = '';
        places.forEach(function(data, index) {
        if(data.timezone){
        var options = { timeZone: data.timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        var timezone = new Date().toLocaleTimeString('en-US', options); 
        }
        result.innerHTML += `<h2>${data.name.toUpperCase()}</h2>`;
        result.innerHTML += `<img src="${data.imagesrc}"/>`;
        result.innerHTML += `<div>${data.description}</h2>`;
        if(timezone){
        result.innerHTML += `<div>Current Time in ${data.name} is: ${timezone}</div>`;
        } else if(data.place){
        result.innerHTML += `<div>Place: ${data.place}</div>`;    
        }
        });
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
