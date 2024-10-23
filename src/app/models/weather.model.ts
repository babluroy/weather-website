export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface Condition {
  text: string;
  icon: string;
}

export interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;  
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: Condition; 
  };
}

export interface WeatherForecast {
  location: Location;
  current: CurrentWeather; 
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface Cordinates {
  lat: number,
  lon: number
}
