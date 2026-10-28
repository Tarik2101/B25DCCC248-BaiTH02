import type { City } from './types';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

export const CITIES: City[] = [
  { id: '1', name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { id: '2', name: 'Hải Phòng', lat: 20.8449, lon: 106.6881 },
  { id: '3', name: 'Huế', lat: 16.4637, lon: 107.5909 },
  { id: '4', name: 'Đà Nẵng', lat: 16.0678, lon: 108.2208 },
  { id: '5', name: 'Nha Trang', lat: 12.2388, lon: 109.1967 },
  { id: '6', name: 'Đà Lạt', lat: 11.9404, lon: 108.4383 },
  { id: '7', name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
  { id: '8', name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 },
];

export const removeAccents = (str: string): string => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export const convertCtoF = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('vi-VN', { 
    weekday: 'short', 
    day: '2-digit', 
    month: '2-digit' 
  }).format(date);
};

export const getWeatherInfo = (code: number) => {
  // WMO Weather interpretation codes
  if (code === 0 || code === 1) return { label: 'Trời quang', bgClass: 'bg-sunny', icon: Sun };
  if (code === 2 || code === 3) return { label: 'Có mây', bgClass: 'bg-cloudy', icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Sương mù', bgClass: 'bg-foggy', icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: 'Mưa phùn', bgClass: 'bg-rainy', icon: CloudDrizzle };
  if (code >= 61 && code <= 67) return { label: 'Mưa', bgClass: 'bg-rainy', icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Tuyết', bgClass: 'bg-snowy', icon: CloudSnow };
  if (code >= 80 && code <= 82) return { label: 'Mưa rào', bgClass: 'bg-rainy', icon: CloudRain };
  if (code >= 95 && code <= 99) return { label: 'Giông bão', bgClass: 'bg-stormy', icon: CloudLightning };
  return { label: 'Không rõ', bgClass: 'bg-default', icon: Sun };
};