import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ErrorAlert from '../components/ErrorAlert';
import Weather from '../components/Weather';
import { Conversion, convertToProperCase } from '../utils/utility';

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
                const { latitude, longitude } = searchQuery;
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
        const measurement = document.querySelector('button.switch');
        const inImperialMode = measurement.getAttribute('aria-checked') === 'true';

        const measurementUnit = {
            temp: null,
            speed: null,
            volume: null,
        };

        try {
            if (ErrorAlert.isPresent) {
                ErrorAlert.toggleView();
            }

            if (inImperialMode) {
                data = await this.grabWeatherData(location);
                measurementUnit.temp = '°F';
                measurementUnit.speed = 'mph';
                measurementUnit.volume = 'in';
            } else {
                data = await this.grabWeatherData(location, 'metric');
                measurementUnit.temp = '°C';
                measurementUnit.speed = 'kph';
                measurementUnit.volume = 'mm';
            }

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
            grabData: function grabData() {
                let [rainVolume, snowVolume] = [null, null];
                const { volume } = measurementUnit;

                if (inImperialMode) {
                    if (this.type === 'mixed') {
                        rainVolume = Conversion.imperial.convertToInch(data.rain['1h']);
                        snowVolume = Conversion.imperial.convertToInch(data.snow['1h']);
                    } else if (this.type === 'rain') {
                        rainVolume = Conversion.imperial.convertToInch(data.rain['1h']);
                    } else if (this.type === 'snow') {
                        snowVolume = Conversion.imperial.convertToInch(data.snow['1h']);
                    }
                } else {
                    // eslint-disable-next-line no-lonely-if
                    if (this.type === 'mixed') {
                        rainVolume = `${data.rain['1h']}${volume}`;
                        snowVolume = `${data.snow['1h']}${volume}`;
                    } else if (this.type === 'rain') {
                        rainVolume = `${data.rain['1h']}${volume}`;
                    } else if (this.type === 'snow') {
                        snowVolume = `${data.snow['1h']}${volume}`;
                    }
                }

                // Em dash to represent no data for rain or snow.
                switch (this.type) {
                    case 'rain':
                        return {
                            rain: rainVolume,
                            snow: '—',
                        };
                    case 'snow':
                        return {
                            rain: '—',
                            snow: snowVolume,
                        };
                    case 'mixed':
                        return {
                            rain: rainVolume,
                            snow: snowVolume,
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

        if (dataHasProperty('rain') && dataHasProperty('snow')) {
            precipitation.type = 'mixed';
        } else if (dataHasProperty('rain')) {
            precipitation.type = 'rain';
        } else if (dataHasProperty('snow')) {
            precipitation.type = 'snow';
        }

        const desc = data.weather[0].description;
        const properCase = convertToProperCase(desc);
        const { temp, speed } = measurementUnit;

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
                temp: `${Math.round(data.main.temp)}${temp}`, // F / C
                desc: ` / ${properCase}`,
            },
            misc: {
                feelsLike: `${Math.round(data.main.feels_like)}${temp}`, // F / C
                humidity: `${data.main.humidity}%`, // %
                cloudiness: `${data.clouds.all}%`, // %
                windSpeed: `${Math.round(data.wind.speed)} ${speed}`, // mph / kph
                ...precipitation.grabData(), // mm / in
            },
        };

        Weather.editDisplay(forecast);
    };
}
