import './Weather.css';

const selectElement = (query) => document.querySelector(query);

const Weather = {
    editDisplay: ({ image, location, phrase, misc }) => {
        const weatherImage = selectElement('.weather__image');
        weatherImage.src = `https://openweathermap.org/img/wn/${image.name}@4x.png`;
        weatherImage.alt = image.alt;

        selectElement('.weather__city').firstChild.textContent = location.city;
        selectElement('.weather__country').textContent = location.country;

        selectElement('.weather__temp').textContent = phrase.temp;
        selectElement('.weather__phrase').textContent = phrase.desc;

        const miscColumn = document.getElementsByClassName('row__col--2');
        const miscData = Object.values(misc);
        miscColumn.forEach((element, index) => {
            element.textContent = miscData[index];
        });
    },
};

export default Weather;
