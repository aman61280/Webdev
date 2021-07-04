const form = document.getElementById('form');
const ul = document.querySelector('ul');
const a = document.getElementById('temp');
const city = document.getElementById('city');
const visibility = document.getElementById('visibility');
const minmax = document.getElementById('min-max');


function getWeather(searchText) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchText + "&appid=cc902bf40c4544b4ec3f72a5b82bc1a1")
        .then(data => {
            return data.json();
        })
        .then(parsedData => {
            console.log(parsedData);
            console.log(parsedData['weather']['0']['description']);
            city.innerText = parsedData.name + ", IN"
            visibility.innerText = parsedData['weather']['0']['description'];
            a.innerText = Math.floor(parsedData.main.temp) - 273 + "°C";
            minmax.innerText = Math.floor(parsedData.main.temp_min - 273) + "°C" + " / " + Math.floor(parsedData.main.temp_max - 273) + "°C";

        })
        .catch(err => {
            alert("Enter right city name");
            city.innerText = "";
            visibility.innerText = "";
            a.innerText = "";
            minmax.innerText = "";

        })


}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchText = form.elements[0].value;

    getWeather(searchText);
    form.elements[0].value = "";

})

