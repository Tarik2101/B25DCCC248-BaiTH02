import React from 'react';
import type { WeatherData, City } from '../types';
import { getWeatherInfo, convertCtoF } from '../utils';
import { Droplets, Wind } from 'lucide-react';

interface BentoCurrentProps {
  city: City;
  weather: WeatherData;
  unit: 'C' | 'F';
  onToggleUnit: () => void;
}

export const BentoCurrent: React.FC<BentoCurrentProps> = ({ city, weather, unit, onToggleUnit }) => {
  const { current } = weather;
  console.log('Thời gian cập nhật:', current.time);
  const { label, icon: WeatherIcon } = getWeatherInfo(current.weatherCode);
  const temp = unit === 'C' ? current.temperature : convertCtoF(current.temperature);

  return (
    <>
      <div className="glass-panel p-8 bento-main flex flex-col justify-between relative overflow-hidden">
        <button
          onClick={onToggleUnit}
          className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 transition-colors px-4 py-2 rounded-full text-sm font-bold border border-white/40 shadow-sm"
        >
          °{unit === 'C' ? 'F' : 'C'}
        </button>
        <div>
          <h2 className="text-4xl font-bold mb-2">{city.name}</h2>
          <p className="text-2xl font-medium opacity-90">{label}</p>
          <p className="text-sm opacity-75 mt-2">Cập nhật lúc: {current.time?.replace('T', ' ')}</p>
        </div>
        <div className="flex items-end justify-between mt-8">
          <div className="text-8xl font-black tracking-tighter">
            {Math.round(temp)}°
          </div>
          <WeatherIcon className="w-32 h-32 opacity-90 drop-shadow-lg" strokeWidth={1.5} />
        </div>
      </div>

      <div className="glass-panel p-6 bento-small-1 flex flex-col justify-center items-center text-center">
        <Droplets className="w-10 h-10 mb-3 opacity-90" />
        <p className="text-lg font-medium opacity-80 mb-1">Độ ẩm</p>
        <p className="text-3xl font-bold">{current.humidity}%</p>
      </div>

      <div className="glass-panel p-6 bento-small-2 flex flex-col justify-center items-center text-center">
        <Wind className="w-10 h-10 mb-3 opacity-90" />
        <p className="text-lg font-medium opacity-80 mb-1">Sức gió</p>
        <p className="text-3xl font-bold">
          {current.windSpeed} <span className="text-xl font-medium">km/h</span>
        </p>
      </div>
    </>
  );
};