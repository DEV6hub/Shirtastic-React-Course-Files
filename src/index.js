import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';








render(
    <div>
        <App />
    </div>,
    document.getElementById('root')
)
registerServiceWorker();
