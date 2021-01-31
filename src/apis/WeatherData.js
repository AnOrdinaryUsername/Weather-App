import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ErrorAlert from '../components/ErrorAlert';
import Weather from '../components/Weather';

export default class WeatherData {
    constructor() {
        this.data = null;
    }

    /*  Note: Never put API keys in a git repository. This is a free one for testing so it's
     *   okay in this case.
     */
    grabWeatherData = async (searchQuery, units = 'imperial') => {
        let weatherData = null;

        try {
            if (ErrorAlert.isPresent) {
                ErrorAlert.toggleView();
            }

            if (typeof searchQuery === 'object') {
                const { latitude, longitude } = { ...searchQuery };
                weatherData = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=9d958a66e735735b56e66b55bba5ada5`,
                    { mode: 'cors' }
                );
            } else {
                weatherData = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=${units}&appid=9d958a66e735735b56e66b55bba5ada5`,
                    { mode: 'cors' }
                );
            }
        } catch (e) {
            console.error(e);
            ErrorAlert.message('The Geolocation service failed.');
            ErrorAlert.toggleView();

            return;
        }

        // async functions always return a promise (https://stackoverflow.com/a/35302535).
        return weatherData.json();
    };

    showWeather = async (location) => {
        let data = null;

        try {
            if (ErrorAlert.isPresent) {
                ErrorAlert.toggleView();
            }

            data = await this.grabWeatherData(location);
            this.data = data;

            if (data.cod !== 200) {
                const { message } = data;

                // OpenWeather messages are all lower case and have no period.
                // Convert the first letter to uppercase and append a . at the end.
                let errorMessage = message[0].toUpperCase() + message.slice(1);
                errorMessage += '.';

                throw new Error(errorMessage);
            }
        } catch (e) {
            ErrorAlert.message(e.message);
            ErrorAlert.toggleView();
            return;
        }

        const forecast = {
            image: {
                name: data.weather[0].icon,
                alt: data.weather[0].description,
            },
            location: {
                city: data.name,
                country: data.sys.country,
            },
            phrase: {
                temp: Math.round(data.main.temp),
                desc: data.weather[0].description,
            },
            misc: {
                feelsLike: data.main.feels_like,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                cloudiness: data.clouds.all,
            },
        };

        Weather.editDisplay(forecast);
    };
}
