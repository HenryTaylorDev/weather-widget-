(function () {
  // Randomise the chances of showing the weather widget
  let show = localStorage.getItem("showWeatherWidget");
  if (show === null) {
    show = Math.random() < 0.5;
    localStorage.setItem("showWeatherWidget", show.toString());
  } else {
    show = show === "true";
  }
  if (!show) return;

  function getLocation() {
    const location = getCoordsFromMaps();
    if (location) return location;
    console.error("Could not determine property location.");
    return null;
  }

  // Using the coordinates from the map image URL
  function getCoordsFromMaps() {
    const map = document.querySelector(
      'picture > source[srcset*="maps.googleapis.com"]'
    );
    if (map) {
      const srcset = map.getAttribute("srcset").split(",");
      for (let i = 0; i < srcset.length; i++) {
        const src = srcset[i].trim().split(" ")[0];
        const location = extractCoordsFromMapURL(src);
        if (location) return location;
      }
    }
    return null;
  }

  // Extracting the required coordinates from the map URL
  function extractCoordsFromMapURL(url) {
    try {
      const mapUrl = new URL(url);
      const center = mapUrl.searchParams.get("center");
      if (center) {
        const coords = center.split(",");
        if (coords.length === 2) {
          return { lat: parseFloat(coords[0]), lon: parseFloat(coords[1]) };
        }
      }
      const markers = mapUrl.searchParams.get("markers");
      if (markers) {
        const parts = decodeURIComponent(markers).split("|");
        for (let i = 0; i < parts.length; i++) {
          if (parts[i].includes(",")) {
            const coords = parts[i].split(",");
            if (coords.length === 2) {
              return { lat: parseFloat(coords[0]), lon: parseFloat(coords[1]) };
            }
          }
        }
      }
    } catch (e) {
      console.error("Error parsing map URL:", e);
    }
    return null;
  }

  // Creating the HTML element to display the weather information
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
