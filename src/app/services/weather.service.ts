import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrentWeather, Location, WeatherForecast } from '../models/weather.model';
import { environment } from '../../environments/environment';
import { API_CONSTANTS } from '../constants/API_CONSTANTS';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private CommonService: CommonService
  ) {}

  searchLocations(query: string): Observable<Location[] | null> {
    return this.http.get<Location[]>(`${environment.WEATHER_API_URL}/${API_CONSTANTS.SEARCH_LOCATION}`, {
      params: { q: query }
    }).pipe(
      catchError(error => {
        this.CommonService.showToaster('Error fetching locations', 'Error', false)
        return of([]); 
      })
    );
  }

  getWeatherForecast(query: string): Observable<WeatherForecast | null> {
    return this.http.get<WeatherForecast>(`${environment.WEATHER_API_URL}/${API_CONSTANTS.FORCAST}`, {
      params: { q: query, days: '3' }
    }).pipe(
      catchError(error => {
        this.CommonService.showToaster('Error fetching weather forecast:', 'Error', false)
        return of(null); 
      })
    );
  }

  getCurrentWeather(query: string): Observable<CurrentWeather | null> {
    return this.http.get<CurrentWeather>(`${environment.WEATHER_API_URL}/${API_CONSTANTS.CURRENT_WEATHER}`, {
      params: { q: query, days: '3' }
    }).pipe(
      catchError(error => {
        this.CommonService.showToaster('Error fetching current weather:', 'Error', false)
        return of(null);
      })
    );
  }
}
