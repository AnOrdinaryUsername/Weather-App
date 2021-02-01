import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ErrorAlert from '../components/ErrorAlert';
import Weather from '../components/Weather';
import { convertToProperCase } from '../utils/utility';

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

            // Throw an error if the server response is not 200 OK.
            if (data.cod !== 200) {
                const { message } = data;

                let errorMessage = convertToProperCase(message);
                errorMessage += '.';

                throw new Error(errorMessage);
            }
        } catch (e) {
            ErrorAlert.message(e.message);
            ErrorAlert.toggleView();
            return;
        }

        const precipitation = {
            type: null,
            grabPrecipitationData: function grabPrecipitationData() {
                // Em dash to represent no data for rain or snow.
                switch (this.type) {
                    case 'rain':
                        return {
                            rain: `${data.rain['1h']} mm`,
                            snow: '—',
                        };
                    case 'snow':
                        return {
                            rain: '—',
                            snow: `${data.snow['1h']} mm`,
                        };
                    case 'mixed':
                        return {
                            rain: `${data.rain['1h']} mm`,
                            snow: `${data.snow['1h']} mm`,
                        };
                    default:
                        return {
                            rain: '—',
                            snow: '—',
                        };
                }
            },
        };

        const dataHasProperty = (prop) => ({}.propertyIsEnumerable.call(data, prop));

        if (dataHasProperty('rain')) {
            precipitation.type = 'rain';
        } else if (dataHasProperty('snow')) {
            precipitation.type = 'snow';
        } else if (dataHasProperty('rain') && dataHasProperty('snow')) {
            precipitation.type = 'mixed';
        }

        const desc = data.weather[0].description;
        const properCase = convertToProperCase(desc);

        const forecast = {
            image: {
                name: data.weather[0].icon,
                alt: data.weather[0].description,
            },
            location: {
                city: data.name,
                country: `, ${data.sys.country}`,
            },
            phrase: {
                temp: `${Math.round(data.main.temp)}°F`, // F / C
                desc: ` / ${properCase}`,
            },
            misc: {
                feelsLike: `${Math.round(data.main.feels_like)}°F`, // F / C
                humidity: `${data.main.humidity}%`, // %
                cloudiness: `${data.clouds.all}%`, // %
                windSpeed: `${Math.round(data.wind.speed)} mph`, // mph / kph
                ...precipitation.grabPrecipitationData(), // mm / in
            },
        };

        Weather.editDisplay(forecast);
    };
}
