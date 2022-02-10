"use strict";

const submitBtn = document.querySelector('.submit_btn');
const input = document.querySelector(".search_input");
const cta = document.querySelector(".cta_content");
const weatherContent = document.querySelector('.weather_content');
const unitBtn = document.querySelectorAll('.scale_btn');
const loader = document.querySelector("#loading");

const icons = `http://openweathermap.org/img/w/`; // ${icon}.png

// ! FONT & CSS
// * FUNC & VARIABLE NAMES * '' ""
// * JEST
// ! fade in & out
// ? MAKE AN OBJECT FOR URLS
// ? CHANGE F & C + MPH & KPH ON BUTTON CLICK

let unit = 'metric';

const unitButtons = () => {

  const metricBtn = document.querySelector('.metric_btn');
  const imperialBtn = document.querySelector('.imperial_btn');

  unitBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.value === 'Metric: °C, m/s') {
        // metric btn
        metricBtn.classList.add('active_unit');
        imperialBtn.classList.remove('active_unit')
        unit = 'metric';

      } else if (btn.value === 'Imperial: °F, mph') {
        // imperial btn
        imperialBtn.classList.add('active_unit');
        metricBtn.classList.remove('active_unit')
        unit = 'imperial';
      };
    });
  });

  return unit;
};

unitButtons()

// * INPUT FIELD
const inputQuery = (e) => {
  if (input.value === '') {
    renderError('City Name Required');
  } else if (e.keyCode === 13) {
    // passing unit val
    const unit = unitButtons()
    fetchWeatherData(input.value.toLowerCase(), unit);
    input.value = '';
  };
};

input.addEventListener("keyup", inputQuery);

// * SUBMIT BUTTON
const buttonQuery = () => {
  if (input.value === '') {
    renderError('City Name Required');
  } else {
    // passing unit val
    const unit = unitButtons()
    fetchWeatherData(input.value.toLowerCase(), unit);
    input.value = '';
  };
};

submitBtn.addEventListener('click', buttonQuery)


// * ERROR
const renderError = (msg) => {
  cta.innerHTML = msg;
  cta.style.visibility = 'visible';
};

// * API
const fetchWeatherData = async (cityName) => {

  try {
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=8dd55712ad3e5e950fb94620922f7ada`);
    if (!currentWeather.ok) throw new Error(`City not found "${cityName}"`);
    const currentResponse = await currentWeather.json();

    renderCurrentWeather(currentResponse);
    const { lat, lon } = currentResponse.coord;

    const dailyWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly,alerts&appid=8dd55712ad3e5e950fb94620922f7ada`);
    if (!dailyWeather.ok) throw new Error(`Forecast not found (${dailyWeather.status})`);
    const dailyResponse = await dailyWeather.json();

    renderDailyWeather(dailyResponse);

    cta.style.visibility = 'hidden';
    cta.innerHTML = '';

  } catch (err) {
    renderError(`${err.message}`)
  };
};

// const currentWeather = {
//   "coord": {
//     "lon": -3.1888,
//     "lat": 55.6519
//   },
//   "weather": [
//     {
//       "id": 501,
//       "main": "Rain",
//       "description": "moderate rain",
//       "icon": "10d"
//     }
//   ],
//   "base": "stations",
//   "main": {
//     "temp": 2.77,
//     "feels_like": -0.6,
//     "temp_min": 1.78,
//     "temp_max": 3.4,
//     "pressure": 1010,
//     "humidity": 82
//   },
//   "visibility": 10000,
//   "wind": {
//     "speed": 3.58,
//     "deg": 261,
//     "gust": 6.26
//   },
//   "rain": {
//     "1h": 3.79
//   },
//   "clouds": {
//     "all": 34
//   },
//   "dt": 1644486697,
//   "sys": {
//     "type": 2,
//     "id": 2034958,
//     "country": "GB",
//     "sunrise": 1644479313,
//     "sunset": 1644512733
//   },
//   "timezone": 0,
//   "id": 2640526,
//   "name": "Peebles",
//   "cod": 200
// }

const renderCurrentWeather = (currentWeather) => {

  const time = new Date(currentWeather.dt * 1000);
  const dayTime = time.toString().slice(0, 10)

  const { name, visibility } = currentWeather;
  const { country } = currentWeather.sys;
  const { description, icon } = currentWeather.weather[0];
  const { speed: windSpeed } = currentWeather.wind;
  const { temp, feels_like, humidity } = currentWeather.main;

  const weatherHTML =
    `
    <p>${dayTime}</p>
      <h1 class='location'>${name},
        <sup>${country}</sup>
      </h1 >
      <div>
        <img src="${icons}${icon}.png" alt="current weather is ${description}">
      <h2>${temp.toFixed(0)}&deg</h2>
      </div>
      <div>
        <h3>${description}, feels like: ${feels_like.toFixed(0)}&deg</h3>
      </div>
      <div>
        <ul>
          <li>Wind Speed: ${windSpeed}</li>
          <li>Humidity: ${humidity}</li>
          <li>Visibility: ${visibility}</li>
        </ul>
      </div>
    `;

  document.querySelector(".current_forecast").innerHTML = weatherHTML;

  weatherContent.style.opacity = 1;
};
// renderCurrentWeather(currentWeather)

// const weekForecast = {
//   "lat": 55.6519,
//   "lon": -3.1888,
//   "timezone": "Europe/London",
//   "timezone_offset": 0,
//   "daily": [
//     {
//       "dt": 1644494400,
//       "sunrise": 1644479313,
//       "sunset": 1644512733,
//       "moonrise": 1644490560,
//       "moonset": 1644464880,
//       "moon_phase": 0.31,
//       "temp": {
//         "day": 3.22,
//         "min": -0.94,
//         "max": 4.22,
//         "night": -0.94,
//         "eve": 1.61,
//         "morn": 1.51
//       },
//       "feels_like": {
//         "day": -3.29,
//         "night": -3.09,
//         "eve": -3.32,
//         "morn": -4.35
//       },
//       "pressure": 1010,
//       "humidity": 83,
//       "dew_point": 0.62,
//       "wind_speed": 11.98,
//       "wind_deg": 249,
//       "wind_gust": 20.82,
//       "weather": [
//         {
//           "id": 600,
//           "main": "Snow",
//           "description": "light snow",
//           "icon": "13d"
//         }
//       ],
//       "clouds": 38,
//       "pop": 0.38,
//       "snow": 0.66,
//       "uvi": 0.54
//     },
//     {
//       "dt": 1644580800,
//       "sunrise": 1644565585,
//       "sunset": 1644599264,
//       "moonrise": 1644578700,
//       "moonset": 1644555540,
//       "moon_phase": 0.34,
//       "temp": {
//         "day": 3.3,
//         "min": -1.55,
//         "max": 4.62,
//         "night": 4.11,
//         "eve": 3.01,
//         "morn": -1.44
//       },
//       "feels_like": {
//         "day": -0.69,
//         "night": -1.17,
//         "eve": -1.63,
//         "morn": -4.3
//       },
//       "pressure": 1029,
//       "humidity": 60,
//       "dew_point": -4.55,
//       "wind_speed": 8.78,
//       "wind_deg": 202,
//       "wind_gust": 17.71,
//       "weather": [
//         {
//           "id": 803,
//           "main": "Clouds",
//           "description": "broken clouds",
//           "icon": "04d"
//         }
//       ],
//       "clouds": 54,
//       "pop": 0.25,
//       "uvi": 0.8
//     },
//     {
//       "dt": 1644667200,
//       "sunrise": 1644651855,
//       "sunset": 1644685795,
//       "moonrise": 1644667500,
//       "moonset": 1644645720,
//       "moon_phase": 0.37,
//       "temp": {
//         "day": 6.9,
//         "min": 3.94,
//         "max": 7.5,
//         "night": 5.58,
//         "eve": 6.22,
//         "morn": 5.91
//       },
//       "feels_like": {
//         "day": 2.35,
//         "night": 1.24,
//         "eve": 2.14,
//         "morn": 0.64
//       },
//       "pressure": 1005,
//       "humidity": 94,
//       "dew_point": 5.18,
//       "wind_speed": 10.61,
//       "wind_deg": 211,
//       "wind_gust": 20.28,
//       "weather": [
//         {
//           "id": 501,
//           "main": "Rain",
//           "description": "moderate rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": 100,
//       "pop": 1,
//       "rain": 8.51,
//       "uvi": 0.3
//     },
//     {
//       "dt": 1644753600,
//       "sunrise": 1644738124,
//       "sunset": 1644772325,
//       "moonrise": 1644757260,
//       "moonset": 1644735120,
//       "moon_phase": 0.4,
//       "temp": {
//         "day": 5.1,
//         "min": 4.12,
//         "max": 5.61,
//         "night": 4.12,
//         "eve": 4.44,
//         "morn": 4.67
//       },
//       "feels_like": {
//         "day": 5.1,
//         "night": 0.36,
//         "eve": 1.67,
//         "morn": 2.16
//       },
//       "pressure": 990,
//       "humidity": 97,
//       "dew_point": 3.77,
//       "wind_speed": 7.28,
//       "wind_deg": 223,
//       "wind_gust": 14.91,
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": 100,
//       "pop": 0.93,
//       "rain": 4,
//       "uvi": 0.55
//     },
//     {
//       "dt": 1644840000,
//       "sunrise": 1644824391,
//       "sunset": 1644858855,
//       "moonrise": 1644847800,
//       "moonset": 1644823740,
//       "moon_phase": 0.43,
//       "temp": {
//         "day": 4.24,
//         "min": 1.82,
//         "max": 4.86,
//         "night": 1.82,
//         "eve": 2.44,
//         "morn": 2.98
//       },
//       "feels_like": {
//         "day": -1.05,
//         "night": -1.72,
//         "eve": -2.28,
//         "morn": -1.62
//       },
//       "pressure": 997,
//       "humidity": 84,
//       "dew_point": 0.97,
//       "wind_speed": 8.74,
//       "wind_deg": 289,
//       "wind_gust": 14.16,
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": 84,
//       "pop": 0.32,
//       "rain": 0.76,
//       "uvi": 0.73
//     },
//     {
//       "dt": 1644926400,
//       "sunrise": 1644910657,
//       "sunset": 1644945386,
//       "moonrise": 1644938880,
//       "moonset": 1644911700,
//       "moon_phase": 0.46,
//       "temp": {
//         "day": 4.74,
//         "min": 1.97,
//         "max": 4.99,
//         "night": 1.97,
//         "eve": 2.17,
//         "morn": 3.42
//       },
//       "feels_like": {
//         "day": -0.07,
//         "night": -1.1,
//         "eve": -0.48,
//         "morn": -2.03
//       },
//       "pressure": 1001,
//       "humidity": 78,
//       "dew_point": 0.38,
//       "wind_speed": 8.46,
//       "wind_deg": 264,
//       "wind_gust": 15.73,
//       "weather": [
//         {
//           "id": 500,
//           "main": "Rain",
//           "description": "light rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": 63,
//       "pop": 0.68,
//       "rain": 2.59,
//       "uvi": 1
//     },
//     {
//       "dt": 1645012800,
//       "sunrise": 1644996921,
//       "sunset": 1645031916,
//       "moonrise": 1645030140,
//       "moonset": 1644999180,
//       "moon_phase": 0.5,
//       "temp": {
//         "day": 10.71,
//         "min": 4.55,
//         "max": 11.55,
//         "night": 6.42,
//         "eve": 11.55,
//         "morn": 10.14
//       },
//       "feels_like": {
//         "day": 10,
//         "night": 1.09,
//         "eve": 11.11,
//         "morn": 9.66
//       },
//       "pressure": 996,
//       "humidity": 83,
//       "dew_point": 7.22,
//       "wind_speed": 12.35,
//       "wind_deg": 248,
//       "wind_gust": 23.22,
//       "weather": [
//         {
//           "id": 501,
//           "main": "Rain",
//           "description": "moderate rain",
//           "icon": "10d"
//         }
//       ],
//       "clouds": 91,
//       "pop": 1,
//       "rain": 7.67,
//       "uvi": 1
//     },
//     {
//       "dt": 1645099200,
//       "sunrise": 1645083185,
//       "sunset": 1645118445,
//       "moonrise": 1645121520,
//       "moonset": 1645086360,
//       "moon_phase": 0.53,
//       "temp": {
//         "day": 4.93,
//         "min": 1.48,
//         "max": 4.93,
//         "night": 1.48,
//         "eve": 2.5,
//         "morn": 2.96
//       },
//       "feels_like": {
//         "day": -0.3,
//         "night": -1.65,
//         "eve": -1.58,
//         "morn": -2.4
//       },
//       "pressure": 1009,
//       "humidity": 71,
//       "dew_point": -0.63,
//       "wind_speed": 10.77,
//       "wind_deg": 257,
//       "wind_gust": 22.36,
//       "weather": [
//         {
//           "id": 616,
//           "main": "Snow",
//           "description": "rain and snow",
//           "icon": "13d"
//         }
//       ],
//       "clouds": 72,
//       "pop": 1,
//       "rain": 0.16,
//       "snow": 5.51,
//       "uvi": 1
//     }
//   ]
// }

const renderDailyWeather = (weekForecast) => {

  // Clear weekly forecast Nodes
  document.querySelector('.weekly_forecast').innerHTML = ''

  weekForecast.daily.map((day, i) => {

    if (i > 0) {
      const { min, max } = day.temp;
      const { icon, description } = day.weather[0];

      const now = new Date(day.dt * 1000);
      const weekDays = now.toString().slice(0, 3);

      const eachDay = document.createElement("div");

      eachDay.className = 'day_content';
      eachDay.innerHTML =
        `
          <h3>${weekDays}</h3>
          <img src="${icons}${icon}.png" alt="${description} weather description for ${weekDays}">
          <h3>${max.toFixed(0)}&deg</h3>
          <h4>${min.toFixed(0)}&deg</h4>
        `;

      document.querySelector('.weekly_forecast').appendChild(eachDay);
    };
  });
  weatherContent.style.opacity = 1;
};
// renderDailyWeather(weekForecast)

// * Geo loc
const getUserPosition = function () {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    renderError("Geolocation is not supported by this browser!");
  };
};

// * LOAD
function displayLoading() {
  loader.classList.add("display");
  // stop loading 
  setTimeout(() => {
    loader.classList.remove("display");
  }, 10000);
}

// * HIDE LOAD
function hideLoading() {
  loader.classList.remove("display");
}

window.addEventListener('load', async () => {

  displayLoading()
  try {
    // Geo
    const pos = await getUserPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    // Rev geo 
    const resGeo = await fetch(`https://locationiq.com/v1/reverse.php?key=pk.7854eeb280aa85d18b2cf4a1bc13a228&lat=${lat}&lon=${lon}&format=json`);
    if (!resGeo.ok) throw new Error('Problem accessing your location data');

    const dataGeo = await resGeo.json();
    hideLoading()

    fetchWeatherData(dataGeo.address.town);

  } catch (err) {
    renderError(`Something went wrong ( ${err} )`);
    throw err;
  };
}, false)
