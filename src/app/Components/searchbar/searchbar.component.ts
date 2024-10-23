import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { Location } from '../../models/weather.model';
import { WeatherService } from '../../services/weather.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgIf, NgFor, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, ReactiveFormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  @Output() locationSelected = new EventEmitter<Location>();

  searchControl = new FormControl();
  locations: Location[] | null = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    // On location field input calls search place API and has 5 seconds debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(value => {
        if (typeof value === 'string' && value.length > 2) {
          this.isLoading = true;
          return this.weatherService.searchLocations(value);
        }
        return [];
      })
    ).subscribe({
      next: (locations) => {
        this.locations = locations;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.locations = [];
      }
    });
  }

/**
 * @name onLocationSelected
 * @description
 * on location selected emit the selected place data
 */
  onLocationSelected(event: any) {
    this.locationSelected.emit(event.option.value);
  }

/**
 * @name displayLocation
 * @description
 * displays the location in a format
 */
  displayLocation(location: Location): string {
    return location ? `${location.name}, ${location.country}` : '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
