import './ErrorAlert.css';

const ErrorAlert = {
    isPresent: false,
    toggleView: function toggleView() {
        const alertBox = document.querySelector('div.alert');
        alertBox.classList.toggle('hidden');

        this.isPresent = !this.isPresent;
    },

    message: (msg) => {
        const alertMessage = document.querySelector('.message__text');
        alertMessage.textContent = msg;
    },
};

export default ErrorAlert;
