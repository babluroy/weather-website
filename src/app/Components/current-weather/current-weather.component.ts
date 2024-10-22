import { Component, Input } from '@angular/core';
import { CurrentWeather, Location } from '../../models/weather.model';
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [MatCardModule, NgIf],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent {
  @Input() currentWeather?: CurrentWeather;
  @Input() location?: Location;
}
