(function () {
  // A/B testing logic to determine if the weather widget should be shown
  let show = localStorage.getItem("showWeatherWidget");
  if (show === null) {
    show = Math.random() < 0.5;
    localStorage.setItem("showWeatherWidget", show.toString());
  } else {
    show = show === "true";
  }
  if (!show) return;

  // Get location latitude and longitude from local storage data
  function getLocation() {
    try {
      const weatherData = JSON.parse(
        localStorage.getItem("weather-53.337002--2.05322")
      );
      if (weatherData && weatherData.city && weatherData.city.coord) {
        return {
          lat: weatherData.city.coord.lat,
          lon: weatherData.city.coord.lon,
        };
      }
    } catch (e) {
      console.error("Could not parse location data from local storage:", e);
    }
    console.error("Could not determine property location.");
    return null;
  }

  // Display weather information
  function displayWeather(data) {
    const weatherWidget = document.createElement("div");
    weatherWidget.classList.add(
      "weather-widget",
      "Typographystyle__Paragraph-sc-86wkop-4"
    );

    const forecast = data.list?.[0];
    if (forecast) {
      const temperature = forecast.main.temp.toFixed(1);
      let conditions = forecast.weather?.[0]?.description;
      conditions = conditions.charAt(0).toUpperCase() + conditions.slice(1);

      weatherWidget.innerHTML = `
              <p style="color: rgb(31, 31, 31); margin-top:10px; font-weight: normal"><strong>Temperature:</strong> ${temperature}°C <strong>Conditions:</strong> ${conditions}</p>
            `;
    } else {
      weatherWidget.innerHTML = `<p>Weather data is not available.</p>`;
    }

    // Display weather information under location address at top of page
    const placeSummaryHeader = document.querySelector(
      ".Typographystyle__Paragraph-sc-86wkop-4.eKznUe.Placestyle__StyledAddress-sc-7yy3d-4.jiGhBZ"
    );

    if (placeSummaryHeader) {
      placeSummaryHeader.appendChild(weatherWidget);
    }
  }

  // Fetch weather data from mock API
  function fetchWeather(lat, lon) {
    const appid = "a2ef86c41a";
    const url = `https://europe-west1-amigo-actions.cloudfunctions.net/recruitment-mock-weather-endpoint/forecast?appid=${appid}&lat=${lat}&lon=${lon}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayWeather(data))
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }

  const location = getLocation();
  if (location) {
    fetchWeather(location.lat, location.lon);
  }
})();
