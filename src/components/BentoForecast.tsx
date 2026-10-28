import React from 'react';
import type { WeatherData } from '../types';
import { getWeatherInfo, convertCtoF, formatDate } from '../utils';

interface BentoForecastProps {
  weather: WeatherData;
  unit: 'C' | 'F';
}

export const BentoForecast: React.FC<BentoForecastProps> = ({ weather, unit }) => {
  const { forecast } = weather;

  return (
    <div className="glass-panel p-8 bento-forecast">
      <h3 className="text-2xl font-bold mb-6">Dự báo 7 ngày tới</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast.time.slice(0, 7).map((time, index) => {
          const minTemp = unit === 'C' ? forecast.temperatureMin[index] : convertCtoF(forecast.temperatureMin[index]);
          const maxTemp = unit === 'C' ? forecast.temperatureMax[index] : convertCtoF(forecast.temperatureMax[index]);
          const { icon: Icon } = getWeatherInfo(forecast.weatherCode[index]);

          return (
            <div key={time} className="flex flex-col items-center p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10">
              <p className="text-base font-semibold mb-3">{formatDate(time)}</p>
              <Icon className="w-10 h-10 mb-4 opacity-90" />
              <div className="flex gap-3 text-lg font-bold">
                <span>{Math.round(maxTemp)}°</span>
                <span className="opacity-60">{Math.round(minTemp)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};