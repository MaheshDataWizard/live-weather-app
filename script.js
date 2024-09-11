const apiKey = "Add your API Key here....";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cardBackground = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (!city) {
        document.querySelector(".error p").innerHTML = "Please enter a city name!";
        document.querySelector(".weather").style.display = "none";
        document.querySelector('.error').style.display = "block";
        return;
    }

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error p").innerHTML = "City Name is Incorrect!";
        document.querySelector('.error').style.display = "block";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        const weatherCondition = data.weather[0].main.toLowerCase();

        changeBackground(weatherCondition);
    }
}

function changeBackground(weatherCondition) {
    let gradient;
    let path;

    switch (weatherCondition) {
        case 'clear':
            gradient = 'linear-gradient(145deg, #87CEEB, #FFD700, #FFA500)';
            path = './images/clear.png';
            break;
        case 'clouds':
            gradient = 'linear-gradient(145deg, #B0C4DE, #D3D3D3, #778899)';
            path = './images/clouds.png';
            break;
        case 'drizzle':
            gradient = 'linear-gradient(145deg, #C0C0C0, #A9A9A9, #B0E0E6)';
            path = './images/drizzle.png';
            break;
        case 'mist':
        case 'haze':
            gradient = 'linear-gradient(145deg, #E0E0E0, #BEBEBE, #C0C0C0)';
            path = './images/mist.png';
            break;
        case 'rain':
            gradient = 'linear-gradient(145deg, #708090, #778899, #4682B4)';
            path = './images/rain.png';
            break;
        case 'snow':
            gradient = 'linear-gradient(145deg, #F0F8FF, #E6E6FA, #DCDCDC)';
            path = './images/snow.png';
            break;
        case 'wind':
            gradient = 'linear-gradient(145deg, #B0C4DE, #87CEFA, #5F9EA0)';
            path = './images/wind.png';
            break;
        default:
            gradient = 'linear-gradient(145deg, skyblue, yellow, orange)'; // Default gradient
    }

    cardBackground.style.backgroundImage = gradient;
    weatherIcon.src = path;

    document.querySelector(".weather").style.display = "block";
    document.querySelector('.error').style.display = "none";
}

// Add an event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

// Call checkWeather with 'Pune' as the default city when the page loads
checkWeather("Pune");

// Optional: Add 'Enter' key functionality for search
searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
