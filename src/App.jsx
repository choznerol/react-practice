import React from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import './styles/index.css'

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">/</Link></li>
                    <li><Link to="/about">/about</Link></li>
                </ul>

                <Route exact path="/" component={HomePage}></Route>
                <Route path="/about" component={About}></Route>
            </div>
        </Router>
    </Provider>
);

export default App;
