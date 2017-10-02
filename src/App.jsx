import React from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './containers/HomePage';
import Heros from './containers/Heros';
import './styles/index.css'

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">/</Link></li>
                    <li><Link to="/heros">/heros</Link></li>
                </ul>

                <Route exact path="/" component={HomePage}></Route>
                <Route path="/heros" component={Heros}></Route>
            </div>
        </Router>
    </Provider>
);

export default App;
