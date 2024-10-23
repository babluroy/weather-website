# Angular Interview Assignment: Weather Dashboard

### Objective
This project is an interactive weather dashboard built using Angular. It allows users to search for and display the current weather conditions and the forecast for the next three days for any chosen location.

## Screenshot
![Preview](https://github.com/babluroy/weather-website/blob/main/public/img/ss.png?raw=true)


### Core Features
**Location Search:** Users can search by city or zip code to retrieve weather information for the selected location.
API: http://api.weatherapi.com/v1/search.json

**Current Weather Display:** Displays the current weather including temperature, wind speed, humidity, and an icon representing the weather condition.
API: http://api.weatherapi.com/v1/current.json

**3-Day Forecast:** Provides a three day weather forecast with high/low temperatures, weather descriptions, and icons for each day.
API: http://api.weatherapi.com/v1/forecast.json

**Responsive Design:** Optimized for both desktop and mobile devices.

### Technology Stack

**Framework:** Angular (v18) 

**Styling:** SCSS

**CSS Framework:** Bootstrap

**Component Library:** Angular Material

## Installation
1. Clone the repository:
git clone https://github.com/babluroy/weather-website.git

2. Install dependencies:
npm install

3. Run the development server:
ng serve
Visit http://localhost:4200 to view It.

## Architecture Overview

**HttpInterceptor:** Intercepts HTTP requests to automatically append the API key to every outgoing request to the WeatherAPI.

**SearchbarComponent:** Handles input for searching locations.

**CurrentWeatherComponent:** Displays current weather data.

**ForecastComponent:** Shows the 3 day weather forecast.

**LoaderComponent:** A reusable loader.

**WeatherService:** WeatherAPI API calls service file for data fetching.

## Key Angular Features:
**Services:** WeatherService handles all API calls and data retrieval.

**Reactive Forms:** The location search uses Reactive Forms for data binding.

SCSS: Custom styles using SCSS with media queries for responsive design.
Deployment

**RxJS:** RxJS is used to manage asynchronous data streams.
