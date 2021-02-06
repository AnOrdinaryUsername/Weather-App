import '@fortawesome/fontawesome-free/js/all';
import WeatherData from '../apis/WeatherData';
import changeColorTheme from '../components/ColorThemeButton';
import findCurrentLocationWeather from '../components/Geolocation';
import findSearchQueryWeather from '../components/SearchBox';
import switchMeasurementSystem from '../components/SystemButton';

const pageInit = () => {
    const changeToSunIcon = () => {
        const theme = document.querySelector('button.theme');
        const moon = document.querySelector('.fa-moon');
        const sun = document.querySelector('.fa-sun');

        // Removes dark class in button.
        theme.classList.toggle('dark');

        moon.classList.add('remove-svg');
        sun.classList.remove('remove-svg');
    };

    const detectColorTheme = () => {
        // Initial color theme.
        let theme = 'dark';
        const root = document.documentElement;
        const storedTheme = localStorage.getItem('theme');
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

        if (storedTheme) {
            root.setAttribute('data-theme', 'dark');
            if (storedTheme === 'light') {
                theme = 'light';
            }
        } else if (mediaQuery.matches) {
            theme = 'light';
        }

        if (theme === 'light') {
            changeToSunIcon();
            root.setAttribute('data-theme', 'light');
        }
    };

    window.addEventListener('DOMContentLoaded', () => {
        detectColorTheme();

        const forecast = new WeatherData();
        forecast.showWeather('Bat Cave');
    });
};

const App = () => {
    pageInit();
    changeColorTheme();
    findCurrentLocationWeather();
    findSearchQueryWeather();
    switchMeasurementSystem();
};

export default App;
