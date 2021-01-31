import WeatherData from '../../apis/WeatherData';
import ErrorAlert from '../ErrorAlert';
import './Geolocation.css';

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
            ? 'The Geolocation service failed. Please enable it in your browser.'
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

export default findCurrentLocationWeather;
