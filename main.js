// get all elements
const input = document.querySelector('#search');
const button = document.querySelector('#button');
const message = document.querySelector('.message .error');
const country = document.querySelector('.location h3');
const lat = document.querySelector('.location p');
const temperature = document.querySelector('.temperature h1');
const weather_description = document.querySelector('.weather_description');
const wind_speed = document.querySelector('.wind_speed');
const wind_degree = document.querySelector('.wind_degree');
const local_time = document.querySelector('.local_time span');
const img = document.querySelector('img');
const humidity = document.querySelector('.humidity');
const feelslike = document.querySelector('.feelslike');
const cloudcover = document.querySelector('.cloudcover');
const visibility = document.querySelector('.visibility');
const loader = document.querySelector('.loader_container');
const outputs = document.querySelector('.outputs');
const favicon = document.getElementById('favicon');

//when site loaded
const default_city = 'agadir';

async function search(city) {
    const api_key = '2d3f84bcc26067ea1d41a0856f77'; // it's fake visit: https://weatherstack.com to get your own
    loader.style.display = 'flex';
    outputs.style.display = 'none';
    try { 
        const response = await fetch(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`);

        if(!response.ok) {
            throw new Error('error');
        }
        outputs.style.display = 'flex';
        const data = await response.json();
        
        // show data
            img.src = data.current.weather_icons[0];
            country.innerHTML = `${data.location.name},${data.location.country}`;
            lat.textContent = `lat/lon ${data.location.lat}°, ${data.location.lon}°`;
            temperature.textContent = `${data.current.temperature} C°`;
            weather_description.textContent = data.current.weather_descriptions[0];
            wind_speed.textContent = `💨 ${data.current.wind_speed}km/h ${data.current.wind_degree}°`;
            wind_degree.textContent = data.current.wind_dir;
            local_time.textContent = `${data.location.localtime} (${data.location.timezone_id})`;
            humidity.textContent = `${data.current.humidity}%`;
            feelslike.textContent = `${data.current.feelslike} C°`;
            cloudcover.textContent = `${data.current.cloudcover}%`;
            visibility.textContent = `${data.current.visibility}km`; 
            document.title = `Weather - ${data.location.name},${data.location.country}`;
            favicon.href =  data.current.weather_icons[0];

    } catch(error) {
        message.textContent = 'faild to load data';
        outputs.style.display = 'none';
    } finally {
        loader.style.display = 'none';
    }

}

search(default_city);

button.addEventListener('click', ()=> {
    if(input.value != '') {
        search(input.value.trim().toLowerCase());
        input.value = '';
        message.textContent = '';
    } else {
        message.textContent = 'type country or city name to see weather';
    }
    
})
