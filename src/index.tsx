import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import * as _ from 'lodash';
import * as serviceWorker from './serviceWorker';
//import data from './data.js';
import App from './components/App';


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
