// Convert first letter in string to uppercase
const convertToProperCase = (string) => string[0].toUpperCase() + string.slice(1);

const Conversion = {
    grabNumberOfUnits: (property, system, unit) => {
        if (typeof property !== 'string') {
            return;
        }

        let systemUnits = [];
        switch (system) {
            case 'imperial':
                systemUnits = ['°F', ' in', ' mph'];
                break;
            case 'metric':
                systemUnits = ['°C', ' mm', ' kph'];
                break;
            default:
                throw new Error('Measurement system not found.');
        }

        const unitIndex = systemUnits.indexOf(unit);
        const stop = property.indexOf(systemUnits[unitIndex]);

        let amount = '';
        for (let i = 0; i < stop; ++i) {
            amount += property[i];
        }

        return amount;
    },

    metric: {
        convertToCelsius: (Fahrenheit) => {
            if (typeof Fahrenheit === 'string') {
                const F = Conversion.grabNumberOfUnits(Fahrenheit, 'imperial', '°F');

                return `${Math.round(((Number(F) - 32) * (5 / 9)).toFixed(2))}°C`;
            }

            return `${Math.round(((Number(Fahrenheit) - 32) * (5 / 9)).toFixed(2))}°C`;
        },

        convertToKPH: (mile) => {
            if (typeof mile === 'string') {
                const mi = Conversion.grabNumberOfUnits(mile, 'imperial', ' mph');

                return `${Math.round((Number(mi) * 1.609).toFixed(2))} kph`;
            }

            return `${Math.round((Number(mile) * 1.609).toFixed(2))} kph`;
        },

        convertToMillimeter: (inch) => {
            if (typeof inch === 'string') {
                // in is a reserved keyword so no abbreviation.
                const inches = Conversion.grabNumberOfUnits(inch, 'imperial', ' in');

                return `${Number(inches * 25.4).toFixed(2)} mm`;
            }

            return `${Number(inch * 25.4).toFixed(2)} mm`;
        },

        updateWeatherDisplay: function updateWeatherDisplay() {
            const temperature = document.querySelector('.weather__temp');
            const temperatureValue = temperature.textContent;
            temperature.textContent = this.convertToCelsius(temperatureValue);

            const miscColumn = document.getElementsByClassName('row__col--2');

            miscColumn.forEach((element) => {
                if (element.textContent.includes('in')) {
                    const precipitation = element.textContent;
                    element.textContent = this.convertToMillimeter(precipitation);
                } else if (element.textContent.includes('°F')) {
                    const feelsLike = element.textContent;
                    element.textContent = this.convertToCelsius(feelsLike);
                } else if (element.textContent.includes('mph')) {
                    const windSpeed = element.textContent;
                    element.textContent = this.convertToKPH(windSpeed);
                }
            });
        },
    },
    imperial: {
        convertToFahrenheit: (Celsius) => {
            if (typeof Celsius === 'string') {
                const C = Conversion.grabNumberOfUnits(Celsius, 'metric', '°C');

                return `${Math.round((C * (9 / 5) + 32).toFixed(2))}°F`;
            }
            return `${Math.round((Celsius * (9 / 5) + 32).toFixed(2))}°F`;
        },

        convertToMPH: (kilometer) => {
            if (typeof kilometer === 'string') {
                const km = Conversion.grabNumberOfUnits(kilometer, 'metric', ' kph');

                return `${Math.round((Number(km) / 1.609).toFixed(2))} mph`;
            }

            return `${Math.round((Number(kilometer) / 1.609).toFixed(2))} mph`;
        },

        convertToInch: (milimeter) => {
            if (typeof milimeter === 'string') {
                const mm = Conversion.grabNumberOfUnits(milimeter, 'metric', ' mm');

                return `${Number(mm / 25.4).toFixed(2)} in`;
            }

            return `${Number(milimeter / 25.4).toFixed(2)} in`;
        },

        updateWeatherDisplay: function updateWeatherDisplay() {
            const temperature = document.querySelector('.weather__temp');
            const temperatureValue = temperature.textContent;
            temperature.textContent = this.convertToFahrenheit(temperatureValue);

            const miscColumn = document.getElementsByClassName('row__col--2');

            miscColumn.forEach((element) => {
                if (element.textContent.includes('mm')) {
                    const precipitation = element.textContent;
                    element.textContent = this.convertToInch(precipitation);
                } else if (element.textContent.includes('°C')) {
                    const feelsLike = element.textContent;
                    element.textContent = this.convertToFahrenheit(feelsLike);
                } else if (element.textContent.includes('kph')) {
                    const windSpeed = element.textContent;
                    element.textContent = this.convertToMPH(windSpeed);
                }
            });
        },
    },
};

export { convertToProperCase, Conversion };
