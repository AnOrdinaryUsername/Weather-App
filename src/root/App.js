import '@fortawesome/fontawesome-free/js/all';
import WeatherData from '../apis/WeatherData';
import findCurrentLocationWeather from '../components/Geolocation';
import findSearchQueryWeather from '../components/SearchBox';
import switchMeasurementSystem from '../components/SystemButton';

const pageInit = () => {
    window.addEventListener('DOMContentLoaded', () => {
        const forecast = new WeatherData();
        forecast.showWeather('Bat Cave');
    });
};

const App = () => {
    pageInit();
    findCurrentLocationWeather();
    findSearchQueryWeather();
    switchMeasurementSystem();
};

export default App;
