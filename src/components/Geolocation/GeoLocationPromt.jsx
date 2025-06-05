import { useEffect, useState } from 'react';
import axios from "../../services/axiosInstance";

const GEO_KEY = 'cachedGeolocation';

export default function useGeolocationPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
 

  useEffect(() => {
    const cached = localStorage.getItem(GEO_KEY);
    if (!cached) {
      setShowPrompt(true);
    } else {
      try {
        setLocation(JSON.parse(cached));
      } catch {
        localStorage.removeItem(GEO_KEY);
        setShowPrompt(true);
      }
    }
  }, []);

  const requestGeolocation = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert("Спочатку потрібно авторизуватись!");
      setLoading(false);
      return;
    }
    setLoading(true);
    if (!navigator.geolocation) {
      alert('Геолокація не підтримується вашим браузером.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const geoData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
  
        try {
          // Відправляємо координати на сервер
          const response = await axios.post('/geo/geolocation', geoData);
          console.log("Response GEO server answer ", response );
          const address = response.data.data.address || '';
  
          const fullData = { ...geoData, address };
  
          localStorage.setItem(GEO_KEY, JSON.stringify(fullData));
          setLocation(fullData);
          setShowPrompt(false);
          window.dispatchEvent(new Event("geolocationUpdated")); //Самостворена подія для оновлення в футері локації
        } catch (error) {
          console.error('Помилка отримання адреси від сервера:', error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Помилка геолокації:', error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const resetLocation = () => {
    localStorage.removeItem(GEO_KEY);
    setLocation(null);
    setShowPrompt(true);
  };

  return {
    showPrompt,
    loading,
    location,
    requestGeolocation,
    resetLocation,
    hidePrompt: () => setShowPrompt(false),
  };
}
