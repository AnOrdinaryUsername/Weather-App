import './index.css';
import App from './root/App';

// For hot reloading in webpack-dev-server.
if (module.hot) {
    module.hot.accept();
}

App();
