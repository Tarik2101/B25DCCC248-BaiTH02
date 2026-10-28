import { useState, useEffect } from 'react';
import type { City, WeatherData } from './types';
import { CITIES, getWeatherInfo } from './utils';
import { Sidebar } from './components/Sidebar';
import { BentoCurrent } from './components/BentoCurrent';
import { BentoForecast } from './components/BentoForecast';
import { AlertCircle, Loader2, CloudSun } from 'lucide-react';

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [favoriteCityId, setFavoriteCityId] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [bgClass, setBgClass] = useState('bg-default');
  const [retryCount, setRetryCount] = useState(0);

  // Khởi tạo thành phố yêu thích từ LocalStorage
  useEffect(() => {
    const savedFav = localStorage.getItem('favoriteCityId');
    if (savedFav) {
      setFavoriteCityId(savedFav);
      const city = CITIES.find(c => c.id === savedFav);
      if (city) setSelectedCity(city);
    }
  }, []);

  // Fetch API Open-Meteo
  useEffect(() => {
    if (!selectedCity) return;
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Không thể tải dữ liệu thời tiết');
        
        const data = await response.json();

        setWeatherData({
          current: {
            time: data.current.time,
            temperature: data.current.temperature_2m,
            weatherCode: data.current.weather_code,
            humidity: data.current.relative_humidity_2m,
            windSpeed: data.current.wind_speed_10m,
          },
          forecast: {
            time: data.daily.time,
            temperatureMin: data.daily.temperature_2m_min,
            temperatureMax: data.daily.temperature_2m_max,
            weatherCode: data.daily.weather_code,
          }
        });

        // Thay đổi Nền Động
        const { bgClass } = getWeatherInfo(data.current.weather_code);
        setBgClass(bgClass);
      } catch (err: any) {
        setError(err.message || 'Lỗi mạng khi tải dữ liệu');
        setBgClass('bg-default');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [selectedCity, retryCount]);

  const handleToggleFavorite = (cityId: string) => {
    if (favoriteCityId === cityId) {
      setFavoriteCityId(null);
      localStorage.removeItem('favoriteCityId');
    } else {
      setFavoriteCityId(cityId);
      localStorage.setItem('favoriteCityId', cityId);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-all duration-1000 ease-in-out ${bgClass} p-4 md:p-8 font-sans`}>
      <div className="max-w-7xl mx-auto h-full grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <div className="lg:col-span-4 h-[500px] lg:h-auto">
          <Sidebar
            onSelectCity={setSelectedCity}
            selectedCityId={selectedCity?.id}
            favoriteCityId={favoriteCityId}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* Content Area (Bento Grid) */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          
          {/* Empty State */}
          {!selectedCity && !isLoading && !error && (
            <div className="glass-panel p-16 text-center flex flex-col items-center justify-center h-full">
              <CloudSun className="w-32 h-32 mb-8 opacity-80 animate-pulse" />
              <h2 className="text-3xl font-bold mb-3">Xin chào!</h2>
              <p className="text-lg opacity-80">Hãy chọn một thành phố bên trái để xem thời tiết hiện tại.</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="glass-panel p-16 text-center flex flex-col items-center justify-center h-full">
              <Loader2 className="w-20 h-20 mb-6 animate-spin opacity-90" />
              <p className="text-xl font-bold opacity-90">Đang cập nhật thời tiết...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="glass-panel p-16 text-center flex flex-col items-center justify-center h-full">
              <AlertCircle className="w-20 h-20 mb-6 text-red-200 opacity-90" />
              <h2 className="text-2xl font-bold mb-3">Lỗi kết nối</h2>
              <p className="text-lg opacity-80 mb-8">{error}</p>
              <button
              onClick={() => setRetryCount(count => count + 1)}
              className="px-8 py-3 bg-white/20 hover:bg-white/40 rounded-full font-bold transition-all border border-white/40"
              >
                Thử lại ngay
              </button>
            </div>
          )}

          {/* Main Weather Content */}
          {selectedCity && weatherData && !isLoading && !error && (
            <div className="bento-grid w-full h-full animate-in fade-in zoom-in duration-500">
              <BentoCurrent
                city={selectedCity}
                weather={weatherData}
                unit={unit}
                onToggleUnit={() => setUnit(u => u === 'C' ? 'F' : 'C')}
              />
              <BentoForecast
                weather={weatherData}
                unit={unit}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;