import '@fortawesome/fontawesome-free/js/all';
import WeatherData from './apis/WeatherData';
import ErrorAlert from './components/ErrorAlert';
import findSearchLocationWeather from './components/SearchBox';
import './components/SearchBox/SearchBox.css';
import './index.css';

const findCurrentLocationWeather = () => {
    const userLocationButton = document.querySelector('#geolocation');

    const useLocation = (position) => {
        const { coords } = position;

        const userLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };

        const forecast = new WeatherData();
        forecast.showWeather(userLocation);
    };

    const handleLocationError = (browserHasGeolocation) => {
        const error = browserHasGeolocation
            ? 'The Geolocation service failed. Enable it by clicking the marker symbol in the address bar.'
            : 'Your browser does not support geolocation.';

        ErrorAlert.message(error);
        ErrorAlert.toggleView();
    };

    userLocationButton.addEventListener('click', () => {
        if (ErrorAlert.isPresent) {
            ErrorAlert.toggleView();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(useLocation, () => {
                handleLocationError(true);
            });
        } else {
            handleLocationError(false);
        }
    });
};

// For hot reloading in webpack-dev-server.
if (module.hot) {
    module.hot.accept();
}

findCurrentLocationWeather();
findSearchLocationWeather();
