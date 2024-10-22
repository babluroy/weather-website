import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchbarComponent } from "./Components/searchbar/searchbar.component";
import { WeatherService } from './services/weather.service';
import { WeatherForecast, CurrentWeather } from './models/weather.model';
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
    private commonService: CommonService
  ) {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      this.isGpsAccess = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {lat: position.coords.latitude, lon: position.coords.longitude}
          this.onLocationSelected(location)
        },
        (error) => {
          this.isGpsAccess = false;
          this.commonService.showToaster('Error getting location', error, false)
        }
      );
    } else {
      this.isGpsAccess = false;
    }
  }

  onLocationSelected(location:any) {
    if(location){
      this.getCurrentWeather(location);
      this.getForcast(location);
    }
  }

  getCurrentWeather(location:any){
    this.isCurrentWeatherLoading = true;
    this.weatherService.getCurrentWeather(`${location?.lat},${location?.lon}`)
    .subscribe((data) => {
      this.currentWeatherData = data;
      this.isCurrentWeatherLoading = false
    });
  }

  getForcast(location:any){
    this.isForcastLoading = true;
    this.weatherService.getWeatherForecast(`${location?.lat},${location?.lon}`)
      .subscribe(data => {
        this.weatherForcastData = data;
        this.isForcastLoading = false;
      });
  }
  
}
