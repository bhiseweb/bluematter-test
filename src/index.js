import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';

render(
  <Router history={history} >
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker();
