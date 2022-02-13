'use strict';

const submitBtn = document.querySelector('.submit_btn');
const input = document.querySelector('.search_input');
const cta = document.querySelector('.cta_content');
const weatherContent = document.querySelector('.weather_content');
const unitBtn = document.querySelectorAll('.scale_btn');
const loader = document.querySelector('#loading');
const icons = `https://openweathermap.org/img/w/`; // ${icon}.png

// ? ANIMATIONS
// ? MOBILE

const getCityName = () => {
  // get innerHtml from renderCurrentWeather
  const str = document.querySelector('.cityName').innerHTML;
  const cityName = str.substring(0, str.indexOf(','));
  return cityName;
}

let unit = 'metric';

unitBtn.forEach(btn => {
  const metricBtn = document.querySelector('.metric_btn');
  const imperialBtn = document.querySelector('.imperial_btn');

  btn.addEventListener('click', () => {
    if (btn.value === 'Metric: °C, m/s') {
      // City innerHtml
      const cityName = getCityName()
      // metric btn
      metricBtn.classList.add('active_unit');
      imperialBtn.classList.remove('active_unit')
      unit = 'metric';
      fetchWeatherData(cityName)
      return unit;

    } else if (btn.value === 'Imperial: °F, mph') {
      // City innerHtml
      const cityName = getCityName()
      // imperial btn
      imperialBtn.classList.add('active_unit');
      metricBtn.classList.remove('active_unit')
      unit = 'imperial';
      fetchWeatherData(cityName)
      return unit;
    };
  });
});

const inputQuery = (e) => {
  if (input.value === '') {
    renderError('City Name Required');

  } else if (e.keyCode === 13) {
    fetchWeatherData(input.value.toLowerCase());
    input.value = '';
  };
};

input.addEventListener('keyup', inputQuery);

const buttonQuery = () => {
  if (input.value === '') {
    renderError('City Name Required');

  } else {
    fetchWeatherData(input.value.toLowerCase());
    input.value = '';
  };
};

submitBtn.addEventListener('click', buttonQuery)

const renderError = (msg) => {
  cta.innerHTML = msg;
  cta.style.visibility = 'visible';
};

const fetchWeatherData = async (cityName) => {

  try {
    const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=8dd55712ad3e5e950fb94620922f7ada`);
    if (!currentWeather.ok) throw new Error(`City not found '${cityName}'`);
    const currentResponse = await currentWeather.json();

    renderCurrentWeather(currentResponse);
    const { lat, lon } = currentResponse.coord;

    const dailyWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly,alerts&appid=8dd55712ad3e5e950fb94620922f7ada`);
    if (!dailyWeather.ok) throw new Error(`Forecast not found (${dailyWeather.status})`);
    const dailyResponse = await dailyWeather.json();

    renderDailyWeather(dailyResponse);

    cta.style.visibility = 'hidden';
    cta.innerHTML = '';

    weatherContent.style.opacity = 1;

  } catch (err) {
    renderError(`${err.message}`)
  };
};

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
      <h1 class='cityName'>${name},
        <sup>${country}</sup>
      </h1>
      <div>
        <img src='${icons}${icon}.png' alt='current weather is ${description}'>
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

  document.querySelector('.current_forecast').innerHTML = weatherHTML;
};

const renderDailyWeather = (dailyForecast) => {
  // Clear weekly forecast Nodes
  document.querySelector('.weekly_forecast').innerHTML = '';

  dailyForecast.daily.forEach((day, i) => {

    if (i > 0) {
      const { min, max } = day.temp;
      const { icon, description } = day.weather[0];

      const now = new Date(day.dt * 1000);
      const weekDays = now.toString().slice(0, 3);

      const eachDay = document.createElement('div');
      eachDay.className = 'day_content';
      eachDay.innerHTML =
        `
          <h3>${weekDays}</h3>
          <img src='${icons}${icon}.png' alt='${description} weather description for ${weekDays}'>
          <h3>${max.toFixed(0)}&deg</h3>
          <h4>${min.toFixed(0)}&deg</h4>
        `;

      document.querySelector('.weekly_forecast').appendChild(eachDay);
    };
  });
};

const getUserPosition = function () {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    renderError('Geolocation is not supported by this browser');
  };
};

function displayLoading() {
  loader.classList.add('display');
  // stop loading 
  setTimeout(() => {
    loader.classList.remove('display');
  }, 10000);
};

function hideLoading() {
  loader.classList.remove('display');
};

window.addEventListener('load', async () => {

  displayLoading();

  try {
    // Geo
    const pos = await getUserPosition();
    const { latitude: lat, longitude: lon } = pos.coords;

    // Rev geo 
    const resGeo = await fetch(`https://locationiq.com/v1/reverse.php?key=pk.7854eeb280aa85d18b2cf4a1bc13a228&lat=${lat}&lon=${lon}&format=json`);
    if (!resGeo.ok) throw new Error('Problem accessing your location data');
    const dataGeo = await resGeo.json();

    hideLoading();

    fetchWeatherData(dataGeo.address.town);

  } catch (err) {
    renderError(`Something went wrong ( ${err} )`);
    throw err;
  };
}, false);