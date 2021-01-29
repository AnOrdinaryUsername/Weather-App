import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ErrorAlert from './components/ErrorAlert/ErrorAlert';

export default class WeatherData {
    constructor(location) {
        this.data = this.grabWeatherData(location);
    }

    /*  Note: Never put API keys in a git repository. This is a free one for testing so it's
     *   okay in this case.
     */
    grabWeatherData = async (searchQuery, units = 'imperial') => {
        let weatherData = null;

        try {
            if (typeof searchQuery === 'object') {
                const { latitude, longitude } = { ...searchQuery };
                weatherData = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=9d958a66e735735b56e66b55bba5ada5`
                );
            } else {
                weatherData = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=${units}&appid=9d958a66e735735b56e66b55bba5ada5`
                );
            }
        } catch (e) {
            console.error(e);
            ErrorAlert.message('The Geolocation service failed.');
            ErrorAlert.toggleView();
        }

        const weatherInfo = await weatherData.json();
        // async functions always return a promise (https://stackoverflow.com/a/35302535).
        return weatherInfo;
    };

    showWeather = async () => {
        const data = await this.data;

        const forecast = {
            location: {
                name: data.name,
                country: data.sys.country,
            },
            temperature: data.main.temp,
            cloudiness: data.weather[0].main,
        };

        document.querySelector('.result').textContent = forecast.cloudiness;
    };
}
