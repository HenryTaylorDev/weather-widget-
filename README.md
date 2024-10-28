# Weather Widget Script

## Overview

This script adds a weather information feature to the "Visit" page for any National Trust location, displaying the current weather conditions.

## Versions

**Weather.js**:
The script automatically detects the property's location by analyzing coordinates embedded within a Google Maps URL on the page. This allows the widget to fetch accurate weather data based on the detected latitude and longitude.
   
**WeatherMock.js**:
This version uses pre-existing mock coordinate data stored in local storage

## How It Works

1. **Randomized Display (A/B Testing)**  
   The script uses an A/B testing approach to determine whether to show the widget. Each visitor has a 50% chance of seeing the widget, controlled by a random decision saved to their browser's local storage. This ensures that a visitor will either consistently see the widget or not at all.

2. **Location Detection**  
   The script detects the property's location either from the Google Maps URL or the coordiate data in local storage, depending on the script.

3. **Fetching Weather Data**  
   Once the location coordinates are identified, the script makes an API call to a weather service. It retrieves the forecast data, including temperature and weather conditions, and displays this information on the webpage.

4. **Displaying the Weather Information**  
   The fetched weather data is styled and presented below the location address on the webpage.


## Display

![Screenshot 2024-10-28 at 13 35 27](https://github.com/user-attachments/assets/c4aff87d-d877-4c7c-aba8-4ca2345a2160)



