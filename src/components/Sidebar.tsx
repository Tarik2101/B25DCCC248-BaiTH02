import React, { useState } from 'react';
import { Search, Star, MapPin } from 'lucide-react';
import type { City } from '../types';
import { CITIES, removeAccents } from '../utils';

interface SidebarProps {
  onSelectCity: (city: City) => void;
  selectedCityId?: string;
  favoriteCityId?: string | null;
  onToggleFavorite: (cityId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onSelectCity, selectedCityId, favoriteCityId, onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = CITIES.filter(city =>
    removeAccents(city.name).includes(removeAccents(searchTerm))
  );

  return (
    <div className="glass-panel p-5 h-full flex flex-col w-full">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CloudSun className="w-6 h-6" /> WeatherApp
      </h2>
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm thành phố..."
          className="w-full bg-white/20 border border-white/30 placeholder-white/70 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3.5 w-5 h-5 text-white/70" />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {filteredCities.map(city => (
          <div
            key={city.id}
            className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedCityId === city.id ? 'bg-white/40 shadow-md scale-[1.02]' : 'hover:bg-white/20'
            }`}
            onClick={() => onSelectCity(city)}
          >
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/90" />
              <span className="font-medium text-lg">{city.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(city.id);
              }}
              className="p-2 hover:bg-white/30 rounded-full transition-colors"
            >
              <Star
                className="w-5 h-5 transition-colors"
                fill={favoriteCityId === city.id ? '#fbbf24' : 'transparent'}
                color={favoriteCityId === city.id ? '#fbbf24' : 'currentColor'}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Cần import thêm ở đầu file
import { CloudSun } from 'lucide-react';