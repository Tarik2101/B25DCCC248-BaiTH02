export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  current: {
    time: string;
    temperature: number;
    weatherCode: number;
    humidity: number;
    windSpeed: number;
  };
  forecast: {
    time: string[];
    temperatureMin: number[];
    temperatureMax: number[];
    weatherCode: number[];
  };
}