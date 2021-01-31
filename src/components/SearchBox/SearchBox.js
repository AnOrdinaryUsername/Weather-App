import WeatherData from '../../apis/WeatherData';
import './SearchBox.css';

const findSearchQueryWeather = () => {
    const searchBox = document.querySelector('#search-city');
    const searchBoxButton = document.querySelector('.search__button');

    const displayWeather = () => {
        const requestedLocation = searchBox.value;
        const forecast = new WeatherData();
        forecast.showWeather(requestedLocation);
    };

    searchBoxButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        displayWeather();
    });

    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            displayWeather();
        }
    });
};

export default findSearchQueryWeather;
