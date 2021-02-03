// Convert first letter in string to uppercase
const convertToProperCase = (string) => string[0].toUpperCase() + string.slice(1);

const Conversion = {
    metric: {
        convertToCelsius: (Fahrenheit) => {
            if (typeof Fahrenheit === 'string') {
                const stop = Fahrenheit.indexOf('°F');

                let F = '';
                for (let i = 0; i < stop; ++i) {
                    F += Fahrenheit[i];
                }

                return `${Math.round(((Number(F) - 32) * (5 / 9)).toFixed(2))}°C`;
            }

            return `${Math.round(((Number(Fahrenheit) - 32) * (5 / 9)).toFixed(2))}°C`;
        },

        convertToKPH: (mile) => {
            if (typeof mile === 'string') {
                const stop = mile.indexOf(' ');

                let mi = '';
                for (let i = 0; i < stop; ++i) {
                    mi += mile[i];
                }

                return `${Math.round((Number(mi) * 1.609).toFixed(2))} kph`;
            }

            return `${Math.round((Number(mile) * 1.609).toFixed(2))} kph`;
        },

        convertToMillimeter: (inch) => {
            if (typeof inch === 'string') {
                const stop = inch.indexOf(' ');

                // in is a reserved keyword so no abbreviation.
                let inches = '';
                for (let i = 0; i < stop; ++i) {
                    inches += inch[i];
                }

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
        convertToFahrenheit: (C) => {
            if (typeof C === 'string') {
                const stop = C.indexOf('°C');

                let celsius = '';
                for (let i = 0; i < stop; ++i) {
                    celsius += C[i];
                }

                return `${Math.round((celsius * (9 / 5) + 32).toFixed(2))}°F`;
            }
            return `${Math.round((C * (9 / 5) + 32).toFixed(2))}°F`;
        },

        convertToMPH: (km) => {
            if (typeof km === 'string') {
                const stop = km.indexOf(' ');

                let kilometer = '';
                for (let i = 0; i < stop; ++i) {
                    kilometer += km[i];
                }

                return `${Math.round((Number(kilometer) / 1.609).toFixed(2))} mph`;
            }

            return `${Math.round((Number(km) / 1.609).toFixed(2))} mph`;
        },

        convertToInch: (mm) => {
            if (typeof mm === 'string') {
                const stop = mm.indexOf(' ');

                let millimeter = '';
                for (let i = 0; i < stop; ++i) {
                    millimeter += mm[i];
                }

                return `${Number(millimeter / 25.4).toFixed(2)} in`;
            }

            return `${Number(mm / 25.4).toFixed(2)} in`;
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
