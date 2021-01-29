import ErrorAlert from './components/ErrorAlert/ErrorAlert';
import './styles.css';
import WeatherData from './WeatherData';

const findCurrentLocationWeather = () => {
    const userLocationButton = document.querySelector('#geolocation');

    const useLocation = (position) => {
        const { coords } = position;

        const userLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };

        const forecast = new WeatherData(userLocation);
        forecast.showWeather();
    };

    const handleLocationError = (browserHasGeolocation) => {
        const errorMessage = browserHasGeolocation
            ? 'The Geolocation service failed. Enable it by clicking the marker symbol in the address bar.'
            : 'Your browser does not support geolocation.';

        ErrorAlert.message(errorMessage);
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
