import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import {AppContainer} from 'react-hot-loader'
import './style.global.css';

const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root'));

render(App);

if (module.hot)
  module.hot.accept('./components/app/App', () => { render(App) });
