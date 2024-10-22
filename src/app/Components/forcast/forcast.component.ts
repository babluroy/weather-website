import { Component, Input } from '@angular/core';
import { ForecastDay } from '../../models/weather.model';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-forcast',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './forcast.component.html',
  styleUrl: './forcast.component.scss'
})
export class ForcastComponent {
  @Input() forecastDays: ForecastDay[] | undefined = [];
}
