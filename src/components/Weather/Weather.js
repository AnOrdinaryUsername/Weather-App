import './Weather.css';

const selectElement = (query) => document.querySelector(query);

const Weather = {
    editDisplay: ({ image, location, phrase, misc }) => {
        const weatherImage = selectElement('.weather__image');
        weatherImage.src = `http://openweathermap.org/img/wn/${image.name}@4x.png`;
        weatherImage.alt = image.alt;

        selectElement('.weather__city').firstChild.textContent = `${location.city}`;
        selectElement('.weather__country').textContent = `, ${location.country}`;

        selectElement('.weather__temp').firstChild.textContent = `${phrase.temp}°F `;
        const properCase = phrase.desc[0].toUpperCase() + phrase.desc.slice(1);
        selectElement('.weather__phrase').textContent = `/ ${properCase}`;
    },
};

export default Weather;
