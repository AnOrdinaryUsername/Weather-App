import './ColorThemeButton.css';

const changeColorTheme = () => {
    const toggleThemeButton = document.querySelector('button.theme');

    const switchTheme = ({ currentTarget }) => {
        const root = document.documentElement;
        const moon = document.querySelector('.fa-moon');
        const sun = document.querySelector('.fa-sun');

        // Check if button has dark class in it and change page to light theme if it does.
        if (currentTarget.classList.contains('dark')) {
            localStorage.setItem('theme', 'light');
            root.setAttribute('data-theme', 'light');

            currentTarget.classList.toggle('dark');

            moon.classList.add('remove-svg');
            sun.classList.remove('remove-svg');
        } else {
            localStorage.setItem('theme', 'dark');
            root.setAttribute('data-theme', 'dark');

            currentTarget.classList.toggle('dark');

            sun.classList.add('remove-svg');
            moon.classList.remove('remove-svg');
        }
    };

    toggleThemeButton.addEventListener('click', switchTheme);
};

export default changeColorTheme;
