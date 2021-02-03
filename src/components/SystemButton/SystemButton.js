import { Conversion } from '../../utils/utility';
import './SystemButton.css';

const switchMeasurementSystem = () => {
    const switchButton = document.querySelector('button.switch');

    const performSwitch = (event) => {
        const { target } = event;
        const isImperial = target.getAttribute('aria-checked') === 'true';

        if (isImperial) {
            target.setAttribute('aria-checked', 'false');
            Conversion.metric.updateWeatherDisplay();
        } else {
            target.setAttribute('aria-checked', 'true');
            Conversion.imperial.updateWeatherDisplay();
        }
    };

    switchButton.addEventListener('click', performSwitch, false);
};

export default switchMeasurementSystem;
