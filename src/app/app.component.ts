import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from "./Components/searchbar/searchbar.component";
import { WeatherService } from './services/weather.service';
import { WeatherForecast, CurrentWeather, Cordinates } from './models/weather.model';
import { CurrentWeatherComponent } from "./Components/current-weather/current-weather.component";
import { ForcastComponent } from './Components/forcast/forcast.component';
import { CommonService } from './services/common.service';
import { LoaderComponent } from "./Components/loader/loader.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, SearchbarComponent, CurrentWeatherComponent, ForcastComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  weatherForcastData?: WeatherForecast | null;
  currentWeatherData?: CurrentWeather | null;
  isCurrentWeatherLoading = false;
  isForcastLoading = false;
  isGpsAccess:boolean = false

  constructor(
    private weatherService: WeatherService,
    private commonService: CommonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.getCurrentLocation();
  }

/**
 * @name getCurrentLocation
 * @description
 * retrives current location of the user & calls weather API's
 */
  getCurrentLocation() {
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.geolocation) {
        this.isGpsAccess = true
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {lat: position.coords.latitude, lon: position.coords.longitude}
            this.onLocationSelected(location)
          },
          (error) => {
            this.isGpsAccess = false;
            this.commonService.showToaster('Error getting location', error?.message, false)
          }
        );
      } else {
        this.isGpsAccess = false;
      }
    }
  }

/**
 * @name onLocationSelected
 * @description
 * on location selection calls getCurrentWeather & getForcast functions
 * @param location
 */
  onLocationSelected(location:Cordinates) {
    if(location){
      this.getCurrentWeather(location);
      this.getForcast(location);
    }
  }

/**
 * @name getCurrentWeather
 * @description
 * calls API to get current weather data of particular location
 * @param location
 */
  getCurrentWeather(location:Cordinates){
    this.isCurrentWeatherLoading = true;
    this.weatherService.getCurrentWeather(`${location?.lat},${location?.lon}`)
    .subscribe((data) => {
      this.currentWeatherData = data;
      this.isCurrentWeatherLoading = false
    });
  }

/**
 * @name getForcast
 * @description
 * calls API to get forcast of 3 days of particular location
 * @param location
 */
  getForcast(location:Cordinates){
    this.isForcastLoading = true;
    this.weatherService.getWeatherForecast(`${location?.lat},${location?.lon}`)
      .subscribe(data => {
        this.weatherForcastData = data;
        this.isForcastLoading = false;
      });
  }
  
}
