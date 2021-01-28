import './styles.css';

// bat cave is a valid city name
// More silly names here: https://en.wikipedia.org/wiki/Wikipedia:Unusual_place_names
const grabWeatherData = async (searchQuery) => {
  let weatherData = '';

  if (typeof searchQuery === 'object') {
    const { latitude, longitude } = { ...searchQuery };
    weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9d958a66e735735b56e66b55bba5ada5`
    );
  } else {
    weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=9d958a66e735735b56e66b55bba5ada5`
    );
  }

  const result = await weatherData.json();
  document.querySelector('.result').textContent = result.name;
  return result;
};

const findCurrentLocationWeather = () => {
  const userLocationButton = document.querySelector('#geolocation');

  const useLocation = (position) => {
    const { coords } = position;

    const userLocation = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    grabWeatherData(userLocation);
  };

  const handleLocationError = (browserHasGeolocation) => {
    document.querySelector('#result').textContent = browserHasGeolocation
      ? 'Error: The Geolocation service failed'
      : 'Error: Your browser does not support eolocation.';
  };

  userLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(useLocation, () => {
        handleLocationError(true);
      });
    } else {
      handleLocationError(false);
    }
  });
};

findCurrentLocationWeather();
