import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './statics/App.css';
import './statics/Pokedex.css';
import './statics/Statistics.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
