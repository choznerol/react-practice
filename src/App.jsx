import React, {Component} from 'react';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import HeroPage from './components/HeroPage';
import './styles/index.css'

const store = configureStore();

class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">/</Link></li>
                            <li><Link to="/heros">/heros</Link></li>
                        </ul>

                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/heros" component={HeroPage}></Route>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
