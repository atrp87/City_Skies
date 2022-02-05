"use strict";
const submitBtn = document.querySelector('.submit_btn');
const input = document.querySelector(".search_input");
const cta = document.querySelector(".cta_content");
const metricBtn = document.querySelector('.metric_btn');
const imperialBtn = document.querySelector('.imperial_btn');
const scaleBtn = document.querySelectorAll('.scale_btn');

const icons = `http://openweathermap.org/img/w/` // ${icon}.png

// ? Error Function
// ? Handle Errors



scaleBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const buttonTxt = btn.innerHTML;

    if (buttonTxt.includes('Metric')) {
      console.log('Metric');
    } else if (buttonTxt.includes('Imperial')) {
      console.log('Imperial');
    };
  });
});


const inputQuery = (e) => {
  if (e.keyCode === 13) {
    // fetchWeatherData(input.value.toLowerCase())
    input.value = '';
  }
};

input.addEventListener("keypress", inputQuery);

submitBtn.addEventListener("click", () => {
  if (input.value === '') {
    cta.innerHTML = 'Input City Name'
  } else {
    // fetchWeatherData(input.value.toLowerCase())
    input.value = '';
  }
});

// const renderError = msg => {
//   cta.insertAdjacentText('beforeend', msg);
//   cta.style.opacity = 1;
// };



// const fetchWeatherData = async (cityName) => {

//   try {
//     const currentWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8dd55712ad3e5e950fb94620922f7ada`);
//     if (!currentWeather.ok) throw new Error(`City not found (${currentWeather.status})`)
//     const currentResponse = await currentWeather.json();

//     // renderCurrentWeather(currentResponse)
//     console.log(currentResponse);
//     const { lat, lon } = currentResponse.coord;

//     const dailyWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=8dd55712ad3e5e950fb94620922f7ada`);
//     if (!dailyWeather.ok) throw new Error(`Forecast not found (${dailyWeather.status})`)
//     const dailyResponse = await dailyWeather.json();


//     // renderDailyWeather(dailyResponse)
//     console.log(dailyResponse);

//   } catch (err) {
//     renderErrors(err.message)

//     console.log(err);
//   }
// }

const currentWeather = {
  "coord": {
    "lon": -3.1965,
    "lat": 55.9521
  },
  "weather": [
    {
      "id": 801,
      "main": "Clouds",
      "description": "few clouds",
      "icon": "02d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 3.69,
    "feels_like": 0.24,
    "temp_min": 2.61,
    "temp_max": 6.32,
    "pressure": 1002,
    "humidity": 80
  },
  "visibility": 10000,
  "wind": {
    "speed": 4.02,
    "deg": 230,
    "gust": 8.05
  },
  "clouds": {
    "all": 20
  },
  "dt": 1643985551,
  "sys": {
    "type": 2,
    "id": 2038102,
    "country": "GB",
    "sunrise": 1643961719,
    "sunset": 1643993483
  },
  "timezone": 0,
  "id": 2650225,
  "name": "Edinburgh",
  "cod": 200
}

const renderCurrentWeather = (currentWeather) => {

  const currentForecast = document.querySelector(".current_forecast");

  const time = new Date(currentWeather.dt * 1000);
  const dayTime = time.toString().slice(0, 10)

  const { name, visibility } = currentWeather;
  const { country } = currentWeather.sys;
  const { description, icon } = currentWeather.weather[0];
  const { speed: windSpeed } = currentWeather.wind;
  const { temp, feels_like: feelsLike, humidity } = currentWeather.main;

  const weatherHTML =
    `
    <p>${dayTime}</p>
      <h1 class='location'>${name},
        <sup>${country}</sup>
      </h1 >
      <div>
        <img src="${icons}${icon}.png" alt="${description} current weather">
      <h2>${temp.toFixed(0)}&deg</h2>
      </div>
      <div>
        <h3>${description}, feels like: ${feelsLike.toFixed(0)}&deg </h3>
      </div>
      <div>
        <ul>
          <li>Wind Speed: ${windSpeed}</li>
          <li>Humidity: ${humidity}</li>
          <li>Visibility: ${visibility}</li>
        </ul>
      </div>
    `;

  currentForecast.innerHTML = weatherHTML;
};


renderCurrentWeather(currentWeather)

const dailyWeather = {
  "lat": 51.5085,
  "lon": -0.1257,
  "timezone": "Europe/London",
  "timezone_offset": 0,
  "daily": [
    {
      "dt": 1643976000,
      "sunrise": 1643960063,
      "sunset": 1643993664,
      "moonrise": 1643966760,
      "moonset": 1644008820,
      "moon_phase": 0.12,
      "temp": {
        "day": 6.21,
        "min": 4.07,
        "max": 10,
        "night": 4.57,
        "eve": 6.55,
        "morn": 9.98
      },
      "feels_like": {
        "day": 2.45,
        "night": 0.85,
        "eve": 3.17,
        "morn": 6.96
      },
      "pressure": 1011,
      "humidity": 73,
      "dew_point": 1.74,
      "wind_speed": 7.68,
      "wind_deg": 222,
      "wind_gust": 17.25,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 84,
      "pop": 1,
      "rain": 2.9,
      "uvi": 0.84
    },
    {
      "dt": 1644062400,
      "sunrise": 1644046365,
      "sunset": 1644080174,
      "moonrise": 1644054000,
      "moonset": 1644099720,
      "moon_phase": 0.15,
      "temp": {
        "day": 8.04,
        "min": 3.19,
        "max": 9.53,
        "night": 9.53,
        "eve": 8.75,
        "morn": 3.19
      },
      "feels_like": {
        "day": 4.6,
        "night": 5.96,
        "eve": 5.15,
        "morn": -0.07
      },
      "pressure": 1021,
      "humidity": 60,
      "dew_point": 0.63,
      "wind_speed": 8.4,
      "wind_deg": 243,
      "wind_gust": 18.91,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0,
      "uvi": 0.89
    },
    {
      "dt": 1644148800,
      "sunrise": 1644132666,
      "sunset": 1644166685,
      "moonrise": 1644141240,
      "moonset": 1644190560,
      "moon_phase": 0.18,
      "temp": {
        "day": 10.24,
        "min": 5.05,
        "max": 10.85,
        "night": 5.05,
        "eve": 8.13,
        "morn": 9.64
      },
      "feels_like": {
        "day": 9.15,
        "night": 0.3,
        "eve": 4.16,
        "morn": 6.01
      },
      "pressure": 1007,
      "humidity": 70,
      "dew_point": 4.99,
      "wind_speed": 10.17,
      "wind_deg": 267,
      "wind_gust": 24.28,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 1,
      "rain": 4.28,
      "uvi": 0.44
    },
    {
      "dt": 1644235200,
      "sunrise": 1644218964,
      "sunset": 1644253195,
      "moonrise": 1644228480,
      "moonset": 0,
      "moon_phase": 0.22,
      "temp": {
        "day": 7.35,
        "min": 3.39,
        "max": 9.26,
        "night": 7.9,
        "eve": 7.76,
        "morn": 3.39
      },
      "feels_like": {
        "day": 5.02,
        "night": 4.98,
        "eve": 4.84,
        "morn": 0.02
      },
      "pressure": 1029,
      "humidity": 56,
      "dew_point": -0.79,
      "wind_speed": 7.17,
      "wind_deg": 297,
      "wind_gust": 15.16,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 20,
      "pop": 0.41,
      "uvi": 1.11
    },
    {
      "dt": 1644321600,
      "sunrise": 1644305261,
      "sunset": 1644339706,
      "moonrise": 1644315840,
      "moonset": 1644281280,
      "moon_phase": 0.25,
      "temp": {
        "day": 11.4,
        "min": 9.57,
        "max": 11.4,
        "night": 10.05,
        "eve": 11.09,
        "morn": 10.34
      },
      "feels_like": {
        "day": 10.21,
        "night": 8.89,
        "eve": 9.87,
        "morn": 9.31
      },
      "pressure": 1029,
      "humidity": 62,
      "dew_point": 4.49,
      "wind_speed": 5.63,
      "wind_deg": 248,
      "wind_gust": 12.6,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 100,
      "pop": 0,
      "uvi": 1.02
    },
    {
      "dt": 1644408000,
      "sunrise": 1644391556,
      "sunset": 1644426216,
      "moonrise": 1644403440,
      "moonset": 1644372000,
      "moon_phase": 0.28,
      "temp": {
        "day": 12.61,
        "min": 9.78,
        "max": 12.61,
        "night": 9.88,
        "eve": 10.79,
        "morn": 9.87
      },
      "feels_like": {
        "day": 11.49,
        "night": 8.85,
        "eve": 9.86,
        "morn": 8.19
      },
      "pressure": 1024,
      "humidity": 60,
      "dew_point": 5.05,
      "wind_speed": 5.19,
      "wind_deg": 242,
      "wind_gust": 9.94,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "clouds": 41,
      "pop": 0.22,
      "uvi": 2
    },
    {
      "dt": 1644494400,
      "sunrise": 1644477849,
      "sunset": 1644512727,
      "moonrise": 1644491340,
      "moonset": 1644462600,
      "moon_phase": 0.31,
      "temp": {
        "day": 6.86,
        "min": 4.59,
        "max": 7.49,
        "night": 4.64,
        "eve": 5.95,
        "morn": 5.08
      },
      "feels_like": {
        "day": 4.03,
        "night": 1.46,
        "eve": 3.31,
        "morn": 3.34
      },
      "pressure": 1029,
      "humidity": 53,
      "dew_point": -2.08,
      "wind_speed": 4.63,
      "wind_deg": 301,
      "wind_gust": 8.59,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 0.73,
      "rain": 1.85,
      "uvi": 2
    },
    {
      "dt": 1644580800,
      "sunrise": 1644564141,
      "sunset": 1644599237,
      "moonrise": 1644579720,
      "moonset": 1644552960,
      "moon_phase": 0.34,
      "temp": {
        "day": 5.95,
        "min": 1.61,
        "max": 7.13,
        "night": 4.24,
        "eve": 6.16,
        "morn": 1.61
      },
      "feels_like": {
        "day": 2.93,
        "night": 0.7,
        "eve": 3.07,
        "morn": -0.99
      },
      "pressure": 1038,
      "humidity": 48,
      "dew_point": -4.29,
      "wind_speed": 4.94,
      "wind_deg": 298,
      "wind_gust": 10.04,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 2,
      "pop": 0,
      "uvi": 2
    }
  ]
}

const renderDailyWeather = (dailyWeather) => {

  const weeklyForecast = document.querySelector('.weekly_forecast');

  dailyWeather.daily.map((day, i) => {

    if (i > 0) {
      const { min, max } = day.temp;
      const { icon, description } = day.weather[0];

      const now = new Date(day.dt * 1000);
      const days = now.toString().slice(0, 3);

      const eachDay = document.createElement("div");

      eachDay.className = 'day_content';
      eachDay.innerHTML =
        `
        <h3>${days}</h3>
        <img src="${icons}${icon}.png" alt="${description} weather description for ${days}">
        <h3>${max.toFixed(0)}&deg</h3>
        <h4>${min.toFixed(0)}&deg</h4>
      `;

      weeklyForecast.appendChild(eachDay);
    };
  });
};
renderDailyWeather(dailyWeather)

const loader = document.querySelector('.loader')

const getUserPosition = function () {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  } else {
    console.error("Geolocation is not supported by this browser!");
  };
};


window.addEventListener('load', async () => {
  try {
    // Geo
    const pos = await getUserPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    // Reverse geo
    const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=73e5a63b180947468b1efdca93d18cdc`);
    if (!resGeo.ok) throw new Error('Problem getting your location data');
    const dataGeo = await resGeo.json();

    // pass API CALL CITYNAME
    console.log(dataGeo.features[0].properties.city);
    console.log(dataGeo);
    return `${dataGeo.features[0].properties.city}`

  } catch (err) {
    console.error(`${err} 💥`);
    // Reject promise returned from async function
    throw err;
  }
}, false)
